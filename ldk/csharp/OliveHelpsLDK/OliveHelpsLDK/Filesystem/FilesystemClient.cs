using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Grpc.Core;
using OliveHelpsLDK.Logging;
using Proto;

namespace OliveHelpsLDK.Filesystem
{
    internal class FilesystemClient : BaseClient<Proto.Filesystem.FilesystemClient>, IFilesystemService
    {
        internal FilesystemClient(Proto.Filesystem.FilesystemClient client, Session session, ILogger logger) : base(
            client, session, logger, "filesystem")
        {
        }

        internal FilesystemClient(CallInvoker channel, Session session, ILogger logger) : this(
            new Proto.Filesystem.FilesystemClient(channel), session, logger)
        {
        }

        public Task<IList<FileInfo>> QueryDirectory(string directoryPath,
            CancellationToken cancellationToken = default)
        {
            var request = new FilesystemDirRequest
            {
                Session = CreateSession(),
                Directory = directoryPath,
            };
            var loggedParser =
                LoggedParser<Task<FilesystemDirResponse>, IList<FileInfo>>(response =>
                    ConvertFileList(response.Result.Files));
            return Client.FilesystemDirAsync(request, CreateOptions(cancellationToken))
                .ResponseAsync
                .ContinueWith(loggedParser, cancellationToken, TaskContinuationOptions.OnlyOnRanToCompletion,
                    TaskScheduler.Current);
        }

        public IStreamingCall<FileEvent> StreamDirectory(string directoryPath,
            CancellationToken cancellationToken = default)
        {
            var request = new FilesystemDirStreamRequest
            {
                Session = CreateSession(),
                Directory = directoryPath
            };
            var call = Client.FilesystemDirStream(request, CreateOptions(cancellationToken));
            var loggedParser = LoggedParser<FilesystemDirStreamResponse, FileEvent>(ConvertFileEvent);
            return new StreamingCall<FilesystemDirStreamResponse, FileEvent>(call, loggedParser);
        }

        public IStreamingCall<FileEvent> StreamFileInfo(string filePath, CancellationToken cancellationToken = default)
        {
            var request = new FilesystemFileInfoStreamRequest
            {
                Session = CreateSession(),
                Path = filePath
            };
            var call = Client.FilesystemFileInfoStream(request, CreateOptions(cancellationToken));
            var loggedParser = LoggedParser<FilesystemFileInfoStreamResponse, FileEvent>(ConvertFileEvent);
            return new StreamingCall<FilesystemFileInfoStreamResponse, FileEvent>(call, loggedParser);
        }

        private static IList<FileInfo> ConvertFileList(IEnumerable<Proto.FileInfo> files)
        {
            return files.Select(ConvertProtoFileInfo).ToList();
        }

        private static FileInfo ConvertProtoFileInfo(Proto.FileInfo info)
        {
            return new FileInfo
            {
                IsDirectory = info.IsDir,
                Name = info.Name,
                Mode = info.Mode,
                Size = info.Size,
                Updated = info.Updated.ToDateTime(),
            };
        }

        private static FileEvent ConvertFileEvent(FilesystemDirStreamResponse dirStreamResponse)
        {
            return new FileEvent
            {
                FileInfo = ConvertProtoFileInfo(dirStreamResponse.File),
                FileAction = ConvertFileAction(dirStreamResponse.Action),
            };
        }

        private static FileEvent ConvertFileEvent(FilesystemFileInfoStreamResponse fileStreamResponse)
        {
            return new FileEvent
            {
                FileInfo = ConvertProtoFileInfo(fileStreamResponse.File),
                FileAction = ConvertFileAction(fileStreamResponse.Action),
            };
        }

        private static FileAction ConvertFileAction(Proto.FileAction action)
        {
            return action switch
            {
                Proto.FileAction.Unknown => FileAction.Unknown,
                Proto.FileAction.Create => FileAction.Create,
                Proto.FileAction.Write => FileAction.Write,
                Proto.FileAction.Remove => FileAction.Remove,
                Proto.FileAction.Rename => FileAction.Rename,
                Proto.FileAction.Chmod => FileAction.Chmod,
                _ => throw new ArgumentOutOfRangeException(nameof(action), action, null)
            };
        }
    }
}