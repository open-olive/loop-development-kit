using System;
using System.Threading;
using System.Threading.Tasks;
using Grpc.Core;
using Grpc.Core.Interceptors;
using NUnit.Framework;
using OliveHelpsLDK.Logging;

namespace OliveHelpsLDK.Test.Logging
{
    [TestFixture]
    public class ExceptionLoggingInterceptorTests
    {
        [SetUp]
        public void NewSubject()
        {
            ILogger logger = new Logger("test-logger");
            _subject = new ExceptionLoggingInterceptor(logger);
        }

        private ExceptionLoggingInterceptor _subject;
        private const string Host = "localhost";
        private const string SensorName = "MySensor";
        private const string Name = "FunctionName";

        private static readonly Marshaller<string> Marshaller =
            new Marshaller<string>(stuff => new byte[0], stuff => "");

        private static readonly Method<string, string> Method =
            new Method<string, string>(MethodType.Unary, SensorName, Name, Marshaller, Marshaller);

        private static readonly CallOptions CallOptions = new CallOptions();

        private readonly ClientInterceptorContext<string, string> _context =
            new ClientInterceptorContext<string, string>(Method, Host, CallOptions);

        [Test]
        public async Task TestPassesThroughUnarySuccess()
        {
            const string resultInResponse = "whatever";
            var response = BuildUnaryCall(() => resultInResponse);

            var result = await _subject.AsyncUnaryCall("hello", _context, (request, con) => response)
                .ResponseAsync;

            Assert.AreEqual(result, resultInResponse);
        }

        [Test]
        public void TestPassesThroughUnaryException()
        {
            var response = BuildUnaryCall(() => throw new Exception("bad stuff"));

            Assert.Throws<AggregateException>(() =>
                _subject.AsyncUnaryCall("hello", _context, (request, con) => response).ResponseAsync.Wait());
        }

        [Test]
        public async Task TestPassesThroughStreamSuccess()
        {
            const string resultInResponse = "whatever";
            var reader = new FakeReader(resultInResponse, () => true);
            var response = BuildStreamingCall(reader);

            var result = _subject.AsyncServerStreamingCall("hello", _context, (request, con) => response);

            await result.ResponseStream.MoveNext();

            Assert.AreEqual(result.ResponseStream.Current, resultInResponse);
        }

        [Test]
        public void TestPassesThroughStreamFailure()
        {
            var reader = new FakeReader("YOU LOSE", () => throw new Exception("Bad THING"));
            var response = BuildStreamingCall(reader);

            var result = _subject.AsyncServerStreamingCall("hello", _context, (request, con) => response);

            Assert.Throws<AggregateException>(() => result.ResponseStream.MoveNext().Wait());
        }

        [Test]
        public async Task TestPassesThroughDuplexSuccess()
        {
            const string resultInResponse = "whatever";
            var reader = new FakeReader(resultInResponse, () => true);
            var writer = new FakeWriter(() => { });
            var response = BuildDuplexCall(reader, writer);

            var result = _subject.AsyncDuplexStreamingCall(_context, con => response);

            await result.RequestStream.WriteAsync("success");
            await result.ResponseStream.MoveNext();
            await result.RequestStream.CompleteAsync();

            Assert.AreEqual(result.ResponseStream.Current, resultInResponse);
        }

        [Test]
        public void TestPassesThroughDuplexFailure()
        {
            const string resultInResponse = "whatever";
            var reader = new FakeReader(resultInResponse, () => throw new Exception("BAD"));
            var writer = new FakeWriter(() => throw new Exception("oh no!"));
            var response = BuildDuplexCall(reader, writer);

            var result = _subject.AsyncDuplexStreamingCall(_context, con => response);

            Assert.Throws<AggregateException>(() => result.RequestStream.WriteAsync("stuff").Wait());
            Assert.Throws<AggregateException>(() => result.ResponseStream.MoveNext().Wait());
            Assert.Throws<AggregateException>(() => result.RequestStream.CompleteAsync().Wait());
        }

        private static AsyncUnaryCall<string> BuildUnaryCall(Func<string> func)
        {
            var actualTask = Task.Run(func);
            var metadataTask = Task.Run(() => new Metadata());
            return new AsyncUnaryCall<string>(actualTask, metadataTask, () => new Status(),
                () => new Metadata(),
                () => { });
        }

        private static AsyncServerStreamingCall<string> BuildStreamingCall(IAsyncStreamReader<string> reader)
        {
            var metadataTask = Task.Run(() => new Metadata());
            return new AsyncServerStreamingCall<string>(reader, metadataTask, () => new Status(), () => new Metadata(),
                () => { });
        }

        private static AsyncDuplexStreamingCall<string, string> BuildDuplexCall(IAsyncStreamReader<string> reader,
            IClientStreamWriter<string> writer)
        {
            var metadataTask = Task.Run(() => new Metadata());
            return new AsyncDuplexStreamingCall<string, string>(writer, reader, metadataTask, () => new Status(),
                () => new Metadata(),
                () => { });
        }
    }

    public class FakeWriter : IClientStreamWriter<string>
    {
        private readonly Action _action;

        public FakeWriter(Action action)
        {
            _action = action;
        }

        public Task WriteAsync(string message)
        {
            return Task.Run(_action);
        }

        public WriteOptions WriteOptions { get; set; }

        public Task CompleteAsync()
        {
            return Task.Run(_action);
        }
    }

    public class FakeReader : IAsyncStreamReader<string>
    {
        private readonly Func<bool> _action;

        public FakeReader(string response, Func<bool> action)
        {
            Current = response;
            _action = action;
        }

        public Task<bool> MoveNext(CancellationToken cancellationToken)
        {
            return Task.Run(_action, cancellationToken);
        }

        public string Current { get; }
    }
}