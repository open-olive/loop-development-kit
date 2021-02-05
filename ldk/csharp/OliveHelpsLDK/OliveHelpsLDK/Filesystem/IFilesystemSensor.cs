using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace OliveHelpsLDK.Filesystem
{
    public interface IFilesystemSensor
    {
        Task<IList<FileInfo>> QueryDirectory(string directoryPath, CancellationToken cancellationToken = default);
        IStreamingCall<FileEvent> StreamDirectory(string directoryPath, CancellationToken cancellationToken = default);
        IStreamingCall<FileEvent> StreamFileInfo(string filePath, CancellationToken cancellationToken = default);

        Task MakeDirectory(MakeDirectoryParameters parameters, CancellationToken cancellationToken = default);

        Task Copy(MoveOrCopyFileParameters parameters, CancellationToken cancellationToken = default);

        Task Move(MoveOrCopyFileParameters parameters, CancellationToken cancellationToken = default);

        Task Remove(RemoveParameters parameters, CancellationToken cancellationToken = default);

        Task<IFile> OpenFile(string path, CancellationToken cancellationToken = default);

        Task<IFile> CreateFile(string path, CancellationToken cancellationToken = default);
    }

    public interface IFile
    {
        Task<int> Write(byte[] data);

        Task<byte[]> Read();

        Task Close();

        Task ChangePermissions(int permission);

        Task ChangeOwnership(int userId, int groupId);

        Task<FileInfo> FileInfo();

        /// <summary>
        /// The CompletionTask completes when the stream is closed by the user. It set to faulted if the Stream encounters an error. 
        /// </summary>
        Task CompletionTask { get; }
    }

    public struct MakeDirectoryParameters
    {
        public string Path;
        public uint Permissions;
    }

    public struct MoveOrCopyFileParameters
    {
        public string Source;
        public string Destination;
    }

    public struct RemoveParameters
    {
        public string Path;
        public bool Recursive;
    }

    public struct FileInfo
    {
        public string Name { get; set; }
        public long Size { get; set; }
        public uint Mode { get; set; }
        public DateTime Updated { get; set; }
        public bool IsDirectory { get; set; }
    }

    public enum FileAction
    {
        Unknown,
        Create,
        Write,
        Remove,
        Rename,
        Chmod,
    }

    public struct FileEvent
    {
        public FileInfo FileInfo;
        public FileAction FileAction;
    }
}