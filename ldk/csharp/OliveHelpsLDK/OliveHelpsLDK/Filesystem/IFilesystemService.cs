using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace OliveHelpsLDK.Filesystem
{
    /// <summary>
    /// Provides access to the Filesystem.
    /// </summary>
    public interface IFilesystemService
    {
        /// <summary>
        /// Get a directory's contents.
        /// </summary>
        /// <param name="directoryPath">The absolute path of the directory.</param>
        /// <param name="cancellationToken"></param>
        /// <returns>Task resolving with a list of files in the directory.</returns>
        Task<IList<FileInfo>> QueryDirectory(string directoryPath, CancellationToken cancellationToken = default);

        /// <summary>
        /// Gets file info.
        /// </summary>
        /// <param name="filePath">The absolute path of the file.</param>
        /// <param name="cancellationToken"></param>
        /// <returns>Task resolving with the file information.</returns>
        Task<FileInfo> QueryFile(string filePath, CancellationToken cancellationToken = default);

        /// <summary>
        /// Creates a stream receiving updates to directory contents.
        /// </summary>
        /// <param name="directoryPath">The absolute path of the directory.</param>
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        IStreamingCall<FileEvent> StreamDirectory(string directoryPath, CancellationToken cancellationToken = default);
        /// <summary>
        /// Create a stream receiving updates to a specific file.
        /// </summary>
        /// <param name="filePath">The absolute path of the file.</param>
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        IStreamingCall<FileEvent> StreamFileInfo(string filePath, CancellationToken cancellationToken = default);
        
        IStreamingCall<FileEvent> StreamFile(string filePath, CancellationToken cancellationToken = default);

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

    /// <summary>
    /// Contains File Information.
    /// </summary>
    public struct FileInfo
    {
        /// <summary>
        /// The filename.
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// The size of the file, in bytes.
        /// </summary>
        public long Size { get; set; }

        /// <summary>
        /// The file permissions (if applicable).
        /// TODO: Determine what values are sent for each of MacOS and Windows.
        /// </summary>
        public uint Mode { get; set; }

        /// <summary>
        /// When the file was last updated.
        /// </summary>
        public DateTime Updated { get; set; }

        /// <summary>
        /// Whether the entry represents a (sub)directory.
        /// </summary>
        public bool IsDirectory { get; set; }
    }

    /// <summary>
    /// The Action taken on the file.
    /// </summary>
    public enum FileAction
    {
        /// <summary>
        /// Unknown file actions. Not expected to be encountered.
        /// </summary>
        Unknown,

        /// <summary>
        /// The file was created.
        /// </summary>
        Create,

        /// <summary>
        /// The file was updated.
        /// </summary>
        Write,

        /// <summary>
        /// The file was removed.
        /// </summary>
        Remove,

        /// <summary>
        /// The file was renamed.
        /// </summary>
        Rename,

        /// <summary>
        /// The file's permissions were changed.
        /// </summary>
        Chmod,
    }

    /// <summary>
    /// Captures a file event.
    /// </summary>
    public struct FileEvent
    {
        /// <summary>
        /// The information for that file.
        /// </summary>
        public FileInfo FileInfo;

        /// <summary>
        /// The action taken on that file.
        /// </summary>
        public FileAction FileAction;
    }
}