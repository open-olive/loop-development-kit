using System;
using System.Collections.Generic;

namespace OliveHelpsLDK.Logging
{
    /// <summary>
    /// The ILogger interface provides access to logging events.
    /// </summary>
    public interface ILogger
    {
        /// <summary>
        /// The DefaultFields set for this logger.
        /// </summary>        
        IDictionary<string, object> DefaultFields { get; }

        /// <summary>
        /// Logs an event at the Trace level.
        /// </summary>
        /// <param name="message">The specific message to log.</param>
        /// <param name="fields">Any fields to be logged with it. The value should be serializeable to JSON.</param>
        void Trace(string message, IDictionary<string, object> fields = null);

        /// <summary>
        /// Logs an event at the Debug level
        /// </summary>
        /// <inheritdoc cref="Trace"/>
        void Debug(string message, IDictionary<string, object> fields = null);

        /// <summary>
        /// Logs an event at the Info level
        /// </summary>
        /// <inheritdoc cref="Trace"/>
        void Info(string message, IDictionary<string, object> fields = null);

        /// <summary>
        /// Logs an event at the Warn level
        /// </summary>
        /// <inheritdoc cref="Trace"/>
        void Warn(string message, IDictionary<string, object> fields = null);

        /// <summary>
        /// Logs an event at the Error level
        /// </summary>
        /// <inheritdoc cref="Trace"/>
        void Error(string message, IDictionary<string, object> fields = null);

        /// <summary>
        /// Logs an event and Exception at the Error level.
        /// </summary>
        /// <param name="message"></param>
        /// <param name="exception"></param>
        void Error(string message, Exception exception);

        /// <summary>
        /// Generates a new logger containing the existing default fields and attaches new fields.
        /// </summary>
        /// <param name="fields"></param>
        /// <returns></returns>
        ILogger WithFields(IDictionary<string, object> fields);
    }
}