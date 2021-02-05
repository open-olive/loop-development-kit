using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using System.Threading.Tasks;
using Google.Protobuf;
using Grpc.Core;
using OliveHelpsLDK.Logging;
using Proto;

namespace OliveHelpsLDK.Filesystem
{
    internal enum FileStatus
    {
        Pending,
        Initialized,
        Closed,
        Errored
    }

    /// <summary>
    /// Implementation of <see cref="IFile"/>.
    /// </summary>
    /// <remarks>
    /// We only know if there's a failure when a request is attempted and fails.
    /// https://github.com/grpc/grpc/issues/25101 has been opened to add this capability in a more intuitive fashion.
    /// </remarks>
    internal class File : IFile
    {
        internal AsyncDuplexStreamingCall<FilesystemFileStreamRequest, FilesystemFileStreamResponse> Stream { get; }
        private Session Session { get; }

        private ILogger Logger { get; set; }

        private string Path { get; set; }

        private FileStatus Status { get; set; }

        private TaskCompletionSource<bool> CompletionSource { get; }

        internal File(AsyncDuplexStreamingCall<FilesystemFileStreamRequest, FilesystemFileStreamResponse> stream,
            ILogger logger, Session session)
        {
            Stream = stream ?? throw new ArgumentNullException(nameof(stream));
            Logger = logger.WithFields(new Dictionary<string, object>() {{"sensor", "filesystem.file"}});
            Session = session;
            Status = FileStatus.Pending;
            CompletionSource = new TaskCompletionSource<bool>();
        }

        internal Task Open(string path)
        {
            Path = path;
            Logger = Logger.WithFields(new Dictionary<string, object>() {{"path", path}});
            var request = new FilesystemFileStreamRequest
            {
                Open = new FilesystemFileStreamRequest.Types.Open()
                {
                    Path = path,
                    Session = CreateSession()
                }
            };
            CheckStatus(true);
            Status = FileStatus.Initialized;
            Logger.Debug("File Stream Opening");
            return WriteToStream(request);
        }

        internal Task Create(string path)
        {
            Path = path;
            Logger = Logger.WithFields(new Dictionary<string, object>() {{"path", path}});
            var request = new FilesystemFileStreamRequest
            {
                Create = new FilesystemFileStreamRequest.Types.Create()
                {
                    Path = path,
                    Session = CreateSession()
                }
            };
            CheckStatus(true);
            Logger.Debug("File Stream Creating");
            Status = FileStatus.Initialized;
            return WriteToStream(request);
        }

        public Task<int> Write(byte[] data)
        {
            var message = new FilesystemFileStreamRequest()
            {
                Write = new FilesystemFileStreamRequest.Types.Write()
                {
                    Data = ByteString.CopyFrom(data)
                },
            };
            return WriteAndReceive(message,
                response => response.Write,
                read => read.NumOfBytes);
        }

        public Task<byte[]> Read()
        {
            var message = new FilesystemFileStreamRequest()
            {
                Read = new FilesystemFileStreamRequest.Types.Read() { },
            };
            return WriteAndReceive(message,
                response => response.Read,
                read => read.Data.ToByteArray());
        }

        public Task Close()
        {
            var message = new FilesystemFileStreamRequest()
            {
                Close = new FilesystemFileStreamRequest.Types.Close() { },
            };
            CheckStatus();
            var writeTask = WriteToStream(message);
            Status = FileStatus.Closed;
            Logger.Debug("File Stream Closed");
            CompletionSource.SetResult(true);
            return writeTask;
        }

        public Task ChangePermissions(int permission)
        {
            var message = new FilesystemFileStreamRequest()
            {
                Chmod = new FilesystemFileStreamRequest.Types.Chmod()
                {
                    Mode = (uint) permission
                },
            };
            return WriteAndReceive(message,
                response => response.Chmod,
                (_) => true);
        }

        public Task ChangeOwnership(int userId, int groupId)
        {
            var message = new FilesystemFileStreamRequest()
            {
                Chown = new FilesystemFileStreamRequest.Types.Chown()
                {
                    Uid = userId,
                    Gid = groupId
                },
            };
            return WriteAndReceive(message,
                response => response.Chown,
                (_) => true);
        }

        public Task<FileInfo> FileInfo()
        {
            var message = new FilesystemFileStreamRequest()
            {
                Stat = new FilesystemFileStreamRequest.Types.Stat() { },
            };
            return WriteAndReceive(message,
                response => response.Stat,
                ConvertProtoFileInfo
            );
        }

        public Task CompletionTask => CompletionSource.Task;


        protected Proto.Session CreateSession()
        {
            return new Proto.Session
            {
                LoopID = Session.LoopId,
                Token = Session.Token,
            };
        }

        protected async Task<TOutput> WriteAndReceive<TResponse, TOutput>(Proto.FilesystemFileStreamRequest request,
            Func<Proto.FilesystemFileStreamResponse, TResponse> responseReader,
            Func<TResponse, TOutput> transformer,
            [CallerMemberName] string caller = ""
        )
        {
            CheckStatus();
            await WriteToStream(request);
            bool moveNext = false;
            try
            {
                moveNext = await Stream.ResponseStream.MoveNext();
            }
            catch (Exception e)
            {
                Logger.Error("Duplex Response - Error on Move Next", e);
                SetErrorState(e);
                throw e;
            }

            if (!moveNext)
            {
                throw new Exception("Could Not Move Next");
            }

            try
            {
                Logger.Trace($"Duplex Response - {caller} - Receiving");
                var message = Stream.ResponseStream.Current;
                var response = responseReader(message);
                Logger.Trace($"Duplex Response - {caller} -Transforming");
                var output = transformer(response);
                Logger.Trace($"Duplex Response - {caller} - Completing",
                    new Dictionary<string, object>() {{"output", output.ToString()}});
                return output;
            }
            catch (Exception e)
            {
                Logger.Error($"Duplex Response - {caller} - Throwing, Error Received", e);
                throw e;
            }
        }

        private void CheckStatus(bool expectPending = false)
        {
            if (expectPending && Status != FileStatus.Pending)
            {
                Logger.Error("File Stream is expecting to be pending, but isn't");
                throw new Exception("File is not pending");
            }

            if (expectPending)
            {
                return;
            }

            if (Status == FileStatus.Initialized) return;
            Logger.Error("Message sent to closed file stream");
            throw new Exception("File Stream has been closed, cannot send additional messages");
        }

        private async Task WriteToStream(FilesystemFileStreamRequest request)
        {
            try
            {
                Logger.Trace("Duplex Request - Sending");
                await Stream.RequestStream.WriteAsync(request);
                Logger.Trace("Duplex Request - Sent");
            }
            catch (Exception e)
            {
                Logger.Error("Duplex Request - Error Thrown", e);
                SetErrorState(e);
                throw e;
            }
        }

        private void SetErrorState(Exception exception)
        {
            Logger.Debug("File Stream - Setting Error State");
            Status = FileStatus.Errored;
            try
            {
                CompletionSource.TrySetException(exception);
            }
            catch (Exception e)
            {
                Logger.Warn("Received Exception when setting Error State", new Dictionary<string, object>()
                {
                    ["error"] = e.ToString()
                });
            }
        }

        private FileInfo ConvertProtoFileInfo(Proto.FilesystemFileStreamResponse.Types.Stat stat)
        {
            var info = stat.Info;
            Logger.Trace(info.ToString());
            return new FileInfo
            {
                IsDirectory = info.IsDir,
                Name = info.Name,
                Mode = info.Mode,
                Size = info.Size,
                Updated = info.Updated.ToDateTime(),
            };
        }
    }
}