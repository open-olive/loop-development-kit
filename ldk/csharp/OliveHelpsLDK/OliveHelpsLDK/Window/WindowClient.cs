using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Grpc.Core;
using OliveHelpsLDK.Logging;
using Proto;

namespace OliveHelpsLDK.Window
{
    internal class WindowClient : BaseClient<Proto.Window.WindowClient>, IWindowService
    {
        internal WindowClient(Proto.Window.WindowClient client, Session session, ILogger logger) : base(
            client, session, logger, "window")
        {
        }

        internal WindowClient(CallInvoker channelBase, Session session, ILogger logger) : this(
            new Proto.Window.WindowClient(channelBase), session, logger)
        {
        }

        public Task<WindowInfo> QueryActive(CancellationToken cancellationToken = default)
        {
            var req = new WindowActiveWindowRequest
            {
                Session = CreateSession(),
            };
            var loggedParser =
                LoggedParser<Task<WindowActiveWindowResponse>, WindowInfo>(task => FromProto(task.Result.Window));
            return Client.WindowActiveWindowAsync(req, CreateOptions(cancellationToken)).ResponseAsync
                .ContinueWith(loggedParser, cancellationToken, TaskContinuationOptions.OnlyOnRanToCompletion,
                    TaskScheduler.Current);
        }

        public IStreamingCall<WindowInfo> StreamActive(CancellationToken cancellationToken = default)
        {
            var req = new WindowActiveWindowStreamRequest
            {
                Session = CreateSession()
            };
            var call = Client.WindowActiveWindowStream(req, CreateOptions(cancellationToken));
            var loggedParser =
                LoggedParser<WindowActiveWindowStreamResponse, WindowInfo>(task => FromProto(task.Window));
            return new StreamingCall<WindowActiveWindowStreamResponse, WindowInfo>(call, loggedParser);
        }

        public Task<WindowInfo[]> QueryState(CancellationToken cancellationToken = default)
        {
            var req = new WindowStateRequest
            {
                Session = CreateSession(),
            };
            var loggedParser = LoggedParser<Task<WindowStateResponse>, WindowInfo[]>(task => FromProto(task.Result));
            return Client.WindowStateAsync(req, CreateOptions(cancellationToken)).ResponseAsync
                .ContinueWith(loggedParser, cancellationToken, TaskContinuationOptions.OnlyOnRanToCompletion,
                    TaskScheduler.Current);
        }

        public IStreamingCall<WindowEvent> StreamState(CancellationToken cancellationToken = default)
        {
            var req = new WindowStateStreamRequest
            {
                Session = CreateSession()
            };
            var call = Client.WindowStateStream(req, CreateOptions(cancellationToken));
            var loggedParser = LoggedParser<WindowStateStreamResponse, WindowEvent>(FromProto);
            return new StreamingCall<WindowStateStreamResponse, WindowEvent>(call, loggedParser);
        }

        internal static WindowEvent FromProto(WindowStateStreamResponse response)
        {
            return new WindowEvent
            {
                Window = FromProto(response.Window),
                Action = FromProto(response.Action),
            };
        }

        internal static WindowInfo[] FromProto(WindowStateResponse response)
        {
            return response.Window.Select(FromProto).ToArray();
        }

        internal static WindowInfo FromProto(Proto.WindowInfo info)
        {
            return new WindowInfo
            {
                Height = info.Height,
                Path = info.Path,
                Pid = info.Pid,
                Title = info.Title,
                Width = info.Width,
                X = info.X,
                Y = info.Y,
            };
        }

        internal static WindowEventAction FromProto(WindowAction action)
        {
            return action switch
            {
                WindowAction.Unknown => WindowEventAction.Unknown,
                WindowAction.Focused => WindowEventAction.Focused,
                WindowAction.Unfocused => WindowEventAction.Unfocused,
                WindowAction.Opened => WindowEventAction.Opened,
                WindowAction.Closed => WindowEventAction.Closed,
                _ => throw new ArgumentOutOfRangeException(nameof(action), action, null)
            };
        }
    }
}