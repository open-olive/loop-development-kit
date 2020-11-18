using System.Collections.Generic;

// ReSharper disable once CheckNamespace
namespace OliveHelpsLDK.Whispers.Forms
{
    
    public interface IWhisperFormResponse {}

    public struct WhisperUpdate : IWhisperFormResponse
    {
        public string Key;
        public Outputs.IBase Output;
    }

    public struct WhisperResult : IWhisperFormResponse
    {
        public bool Result;

        public bool IsSubmitted => Result;
        public bool IsRejected => !Result;

        public IDictionary<string, Outputs.IBase> Outputs;
    }
}