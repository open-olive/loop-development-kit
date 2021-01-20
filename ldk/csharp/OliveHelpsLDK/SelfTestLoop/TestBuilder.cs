using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text.Json;
using OliveHelpsLDK;
using OliveHelpsLDK.Logging;
using SelfTestLoop.Tests;

namespace SelfTestLoop
{
    public class TestBuilder
    {
        public ILogger Logger { get; set; }

        public TestBuilder(ILogger logger)
        {
            Logger = logger;
        }

        public ITest[] BuildTests(ILoopServices services)
        {
            var testClass = new WhisperTests() {Services = services};
            return GetAttributes(new[] {testClass}).Select(x => x as ITest).ToArray();
        }

        private IList<TestInstance> GetAttributes(object[] testClasses)
        {
            var attributes = testClasses.SelectMany(testFixture =>
                {
                    var methods = testFixture.GetType().GetMethods();
                    return methods.Select(memberInfo =>
                    {
                        var attribute = memberInfo.GetCustomAttribute(typeof(TestAttribute));
                        var testAttribute = attribute as TestAttribute;
                        if (testAttribute != null)
                            return new TestInstance()
                            {
                                Attribute = testAttribute,
                                MethodInfo = memberInfo,
                                ID = testAttribute.Name,
                                Name = testAttribute.Name,
                                TestFixture = testFixture
                            };
                        return null;
                    });
                })
                .Where(x => !(x is null)).ToList();
            Logger.Info($"Retrieved Attributes {attributes.Count}");
            Logger.Info(JsonSerializer.Serialize(attributes.Select(x => x.Name)));
            return attributes;
        }
    }
}