using System;

namespace OliveHelpsLDK
{
    /// <summary>
    /// An exception generated if parsing a response has failed.
    /// </summary>
    public class ParsingException : Exception
    {
        public ParsingException()
        {
        }

        public ParsingException(string message) : base(message)
        {
        }

        public ParsingException(string message, Exception inner) : base(message, inner)
        {
        }
    }
}