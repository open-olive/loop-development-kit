using System.Collections.Generic;
using OliveHelpsLDK.Whispers.Forms.Outputs;

// ReSharper disable once CheckNamespace
namespace OliveHelpsLDK.Whispers.Forms
{
    /// <summary>
    /// Base class for Whisper Form responses. Implementations will either be <see cref="WhisperUpdate"/> if
    /// the user has updated a value, or <see cref="WhisperResult"/> when the form has been submitted.
    /// </summary>
    public interface IWhisperFormResponse
    {
    }

    /// <summary>
    /// Represents an incremental field update. 
    /// </summary>
    public struct WhisperUpdate : IWhisperFormResponse
    {
        /// <summary>
        /// The key of the field updated.
        /// </summary>
        public string Key;

        /// <summary>
        /// The output value of the field updated.
        /// </summary>
        public IBase Output;
    }

    /// <summary>
    /// Represents the final submission of the form.
    /// </summary>
    public struct WhisperResult : IWhisperFormResponse
    {
        /// <summary>
        /// Whether the form was submitted (<c>true</c>), or rejected (<c>false</c>).
        /// </summary>
        public bool Result;

        /// <summary>
        /// If the form was submitted.
        /// </summary>
        public bool IsSubmitted => Result;

        /// <summary>
        /// If the form was rejected.
        /// </summary>
        public bool IsRejected => !Result;

        /// <summary>
        /// A dictionary of the form keys and their outputs.
        /// </summary>
        public IDictionary<string, IBase> Outputs;
    }
}