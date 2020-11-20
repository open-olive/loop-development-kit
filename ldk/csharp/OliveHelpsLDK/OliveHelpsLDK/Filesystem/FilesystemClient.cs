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
        internal FilesystemClient(ChannelBase channel, Session session, ILogger logger) : base(
            new Proto.Filesystem.FilesystemClient(channel), session, logger, "filesystem")
        {
        }

        public Task<IList<FileInfo>> QueryDirectory(string directoryPath,
            CancellationToken cancellationToken = default)
        {
            var request = new FilesystemDirRequest()
            {
                Session = CreateSession(),
                Directory = directoryPath,
            };
            var continuationFunction =
                LoggedParser<Task<FilesystemDirResponse>, IList<FileInfo>>(task => ConvertFileList(task.Result.Files));
            return Client.FilesystemDirAsync(request, CreateOptions(cancellationToken))
                .ResponseAsync
                .ContinueWith(continuationFunction, cancellationToken);
        }

        public Task<FileInfo> QueryFile(string filePath, CancellationToken cancellationToken = default)
        {
            var request = new FilesystemFileRequest()
            {
                Session = CreateSession(),
                Path = filePath,
            };
            var continuationFunction =
                LoggedParser<Task<FilesystemFileResponse>, FileInfo>(task => ConvertProtoFileInfo(task.Result.File));
            return Client.FilesystemFileAsync(request, CreateOptions(cancellationToken))
                .ResponseAsync
                .ContinueWith(continuationFunction, cancellationToken);
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
            return new StreamingCall<FilesystemDirStreamResponse, FileEvent>(call,
                LoggedParser<FilesystemDirStreamResponse, FileEvent>(ConvertFileEvent));
        }

        public IStreamingCall<FileEvent> StreamFile(string filePath, CancellationToken cancellationToken = default)
        {
            var request = new FilesystemFileStreamRequest()
            {
                Session = CreateSession(),
                Path = filePath
            };
            var call = Client.FilesystemFileStream(request, CreateOptions(cancellationToken));
            return new StreamingCall<FilesystemFileStreamResponse, FileEvent>(call,
                LoggedParser<FilesystemFileStreamResponse, FileEvent>(ConvertFileEvent));
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

        private static FileEvent ConvertFileEvent(FilesystemFileStreamResponse fileStreamResponse)
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