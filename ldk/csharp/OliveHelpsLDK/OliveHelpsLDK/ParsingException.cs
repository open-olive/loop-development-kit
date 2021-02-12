using System;

namespace OliveHelpsLDK
{
    /// <summary>
    /// An exception generated if parsing a response has failed.
    /// </summary>
    public class ParsingException : Exception
    {
        /// <inheritdoc />
        public ParsingException()
        {
        }

        /// <inheritdoc />
        public ParsingException(string message) : base(message)
        {
        }

        /// <inheritdoc />
        public ParsingException(string message, Exception inner) : base(message, inner)
        {
        }
    }
}