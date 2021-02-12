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

        /// <summary>
        /// Creates a directory in the specified location.
        /// </summary>
        /// <param name="parameters">The parameters for the new directory.</param>
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        Task MakeDirectory(MakeDirectoryParameters parameters, CancellationToken cancellationToken = default);

        /// <summary>
        /// Copies a file from one location to another.
        /// </summary>
        /// <param name="parameters"></param>
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        Task Copy(MoveOrCopyFileParameters parameters, CancellationToken cancellationToken = default);

        /// <summary>
        /// Moves a file from one location to another.
        /// </summary>
        /// <param name="parameters"></param>
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        Task Move(MoveOrCopyFileParameters parameters, CancellationToken cancellationToken = default);

        /// <summary>
        /// Removes a file or directory.
        /// </summary>
        /// <param name="parameters"></param>
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        Task Remove(RemoveParameters parameters, CancellationToken cancellationToken = default);

        /// <summary>
        /// Opens a File object for the specified file.
        /// </summary>
        /// <param name="path"></param>
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        Task<IFile> OpenFile(string path, CancellationToken cancellationToken = default);

        /// <summary>
        /// Creates a file at the specified path. Will fail if the file cannot be created.
        /// </summary>
        /// <param name="path"></param>
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        Task<IFile> CreateFile(string path, CancellationToken cancellationToken = default);
    }

    /// <summary>
    /// Provides access to read various properties of and make changes to a given file.
    /// </summary>
    public interface IFile
    {
        /// <summary>
        /// Writes data to a file.
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        Task<int> Write(byte[] data);

        /// <summary>
        /// Reads the file's contents.
        /// </summary>
        /// <returns></returns>
        Task<byte[]> Read();

        /// <summary>
        /// Closes the file. Once this has been called, other methods on this interface will throw.
        /// </summary>
        /// <returns></returns>
        Task Close();

        /// <summary>
        /// Changes the file permissions.
        /// </summary>
        /// <param name="permission"></param>
        /// <returns></returns>
        Task ChangePermissions(int permission);

        /// <summary>
        /// Changes the file ownership.
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="groupId"></param>
        /// <returns></returns>
        Task ChangeOwnership(int userId, int groupId);

        /// <summary>
        /// Gets the current file information.
        /// </summary>
        /// <returns></returns>
        Task<FileInfo> FileInfo();

        /// <summary>
        /// The CompletionTask completes when the stream is closed by the user. It set to faulted if the Stream encounters an error. 
        /// </summary>
        Task CompletionTask { get; }
    }

    /// <summary>
    /// Parameters for constructing a directory.
    /// </summary>
    public struct MakeDirectoryParameters
    {
        /// <summary>
        /// The path of the directory to create.
        /// </summary>
        public string Path;

        /// <summary>
        /// The permissions to grant that directory.
        /// </summary>
        public uint Permissions;
    }

    /// <summary>
    /// The parameters for moving or copying a file.
    /// </summary>
    public struct MoveOrCopyFileParameters
    {
        /// <summary>
        /// The source path of the file to move/copy.
        /// </summary>
        public string Source;

        /// <summary>
        /// The destination path of the file to move/copy.
        /// </summary>
        public string Destination;
    }

    /// <summary>
    /// The parameters for removing a file.
    /// </summary>
    public struct RemoveParameters
    {
        /// <summary>
        /// Path of the file or directory to remove.
        /// </summary>
        public string Path;

        /// <summary>
        /// Whether the removal is recursive or not.
        /// </summary>
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
        /// The values are set according to Go's <see href="https://golang.org/pkg/os/#FileMode">FileMode</see>.
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