using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.Json;

namespace OliveHelpsLDK.Logging
{
    /// <summary>
    /// Formats logs for consumption and display by Olive Helps. 
    /// </summary>
    public class Logger : ILogger
    {
        /// <summary>
        /// The name of the Logger.
        /// </summary>
        public string Name { get; }

        private TextWriter Writer { get; }

        /// <summary>
        /// The default values for this logger.
        /// </summary>
        public IDictionary<string, object> DefaultFields { get; set; }


        private static readonly JsonSerializerOptions Options = new JsonSerializerOptions
        {
            WriteIndented = false
        };

        /// <summary>
        /// Creates a logger with a given writer and name.
        /// </summary>
        /// <param name="name"></param>
        /// <param name="writer"></param>
        public Logger(string name, TextWriter writer = null) : this(name, new Dictionary<string, object>(), writer)
        {
        }

        /// <summary>
        /// Constructs a Logger.
        /// </summary>
        /// <param name="name"></param>
        /// <param name="defaultFields"></param>
        /// <param name="writer">The <see cref="TextWriter"/> to write to. Defaults to <see cref="Console.Error"/> if not provided.</param>
        public Logger(string name, IDictionary<string, object> defaultFields, TextWriter writer = null)
        {
            Writer = writer ?? Console.Error;
            Name = name;
            DefaultFields = defaultFields;
        }

        public void Trace(string message, IDictionary<string, object> fields = null)
        {
            Log(LogLevel.Trace, message, fields);
        }

        /// <inheritdoc />
        public void Debug(string message, IDictionary<string, object> fields = null)
        {
            Log(LogLevel.Debug, message, fields);
        }

        /// <inheritdoc />
        public void Info(string message, IDictionary<string, object> fields = null)
        {
            Log(LogLevel.Info, message, fields);
        }

        /// <inheritdoc />
        public void Warn(string message, IDictionary<string, object> fields = null)
        {
            Log(LogLevel.Warn, message, fields);
        }

        /// <inheritdoc />
        public void Error(string message, IDictionary<string, object> fields = null)
        {
            Log(LogLevel.Error, message, fields);
        }

        /// <inheritdoc />
        public void Error(string message, Exception exception)
        {
            Log(LogLevel.Error, message, new Dictionary<string, object>() {{"error", exception.ToString()}});
        }

        /// <inheritdoc />
        public ILogger WithFields(IDictionary<string, object> fields)
        {
            return new Logger(Name, CombineDictionaries(new[] {DefaultFields, fields}));
        }

        private void Log(LogLevel level, string msg, IDictionary<string, object> fields)
        {
            IDictionary<string, object> newFields = new Dictionary<string, object>();
            if (fields != null)
            {
                newFields = fields;
            }

            var dictionary = AddDefaultValues(level, msg, newFields);
            var serializedDict = JsonSerializer.Serialize(dictionary, Options);
            Write(serializedDict);
        }

        public static IDictionary<string, object> CombineDictionaries(
            IEnumerable<IDictionary<string, object>> dictionaries)
        {
            return dictionaries.ToList().SelectMany(dict => dict)
                .ToLookup(pair => pair.Key, pair => pair.Value)
                .ToDictionary(group => group.Key, group => group.Last());
            ;
        }

        private IDictionary<string, object> AddDefaultValues(LogLevel level, string msg,
            IDictionary<string, object> fields)
        {
            var defaultItems = new Dictionary<string, object>
            {
                {"@timestamp", GenerateTimestamp()},
                {"@pid", System.Diagnostics.Process.GetCurrentProcess().Id},
                {"@level", GenerateLevel(level)},
                {"@module", Name},
                {"@message", msg},
            };
            return CombineDictionaries(new[] {fields, DefaultFields, defaultItems});
        }

        private static string GenerateTimestamp()
        {
            return DateTime.UtcNow.ToString("yyyy-MM-ddTHH:mm:ss.ffffffzzz");
        }

        private static string GenerateLevel(LogLevel level)
        {
            return level switch
            {
                LogLevel.Trace => "TRACE",
                LogLevel.Debug => "DEBUG",
                LogLevel.Info => "INFO",
                LogLevel.Warn => "WARN",
                LogLevel.Error => "ERROR",
                _ => throw new ArgumentOutOfRangeException(nameof(level), level, null)
            };
        }

        private void Write(string msg)
        {
            Writer.WriteLine(msg);
        }
    }

    internal enum LogLevel
    {
        Trace,
        Debug,
        Info,
        Warn,
        Error
    }
}