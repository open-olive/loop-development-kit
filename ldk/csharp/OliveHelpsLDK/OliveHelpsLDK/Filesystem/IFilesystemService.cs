using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace OliveHelpsLDK.Filesystem
{
    public interface IFilesystemService
    {
        Task<IList<FileInfo>> QueryDirectory(string directoryPath, CancellationToken cancellationToken = default);
        IStreamingCall<FileEvent> StreamDirectory(string directoryPath, CancellationToken cancellationToken = default);
        IStreamingCall<FileEvent> StreamFileInfo(string filePath, CancellationToken cancellationToken = default);
    }

    public struct FileInfo
    {
        public string Name;
        public long Size;
        public uint Mode;
        public DateTime Updated;
        public bool IsDirectory;
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