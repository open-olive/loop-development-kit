using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.IO;
using System.Linq;
using System.Text.Json;

namespace OliveHelpsLDK.Logging
{
    public class Logger : ILogger
    {
        private readonly string _name;

        private TextWriter Writer { get; }

        public IDictionary<string, object> DefaultFields { get; set; }


        private static readonly JsonSerializerOptions Options = new JsonSerializerOptions
        {
            WriteIndented = false
        };

        public Logger(string name, TextWriter writer = null) : this(name, new Dictionary<string, object>(), writer)
        {
        }

        public Logger(string name, IDictionary<string, object> defaultFields, TextWriter writer = null)
        {
            Writer = writer ?? Console.Error;
            _name = name;
            DefaultFields = defaultFields;
        }

        public void Trace(string message, IDictionary<string, object> fields = null)
        {
            Log(LogLevel.Trace, message, fields);
        }

        public void Debug(string message, IDictionary<string, object> fields = null)
        {
            Log(LogLevel.Debug, message, fields);
        }

        public void Info(string message, IDictionary<string, object> fields = null)
        {
            Log(LogLevel.Info, message, fields);
        }

        public void Warn(string message, IDictionary<string, object> fields = null)
        {
            Log(LogLevel.Warn, message, fields);
        }

        public void Error(string message, IDictionary<string, object> fields = null)
        {
            Log(LogLevel.Error, message, fields);
        }

        public ILogger WithFields(IDictionary<string, object> fields)
        {
            return new Logger(_name, CombineDictionaries(new[] {DefaultFields, fields}));
        }

        private void Log(LogLevel level, string msg, IDictionary<string, object> fields)
        {
            // var keys = string.Concat(fields.Keys, ",");
            // Console.Error.WriteLine("[TRACE] " + keys);
            IDictionary<string, object> newFields = new Dictionary<string, object>();
            if (fields != null)
            {
                newFields = fields;
            }

            var dictionary = AddDefaultValues(level, msg, newFields);
            dictionary.Add("FIELDSRAW", JsonSerializer.Serialize(fields, Options));
            dictionary.Add("NEWFIELDS", JsonSerializer.Serialize(newFields, Options));
            if (DefaultFields != null)
            {
                dictionary.Add("DEFAULTFIELDS", JsonSerializer.Serialize(DefaultFields, Options));
            }
            else
            {
                dictionary.Add("DEFAULTFIELDS", "NOT PRESENT");
            }

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
                {"@module", _name},
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
            Console.Error.WriteLine(msg);
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