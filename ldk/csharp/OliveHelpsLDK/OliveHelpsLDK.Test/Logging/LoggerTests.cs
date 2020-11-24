using System.Collections.Generic;
using NUnit.Framework;
using OliveHelpsLDK.Logging;

namespace OliveHelpsLDK.Test.Logging
{
    [TestFixture]
    public class LoggerTests
    {
        [Test]
        public void TestCombineDictionaries()
        {
            IDictionary<string, object> d1 = new Dictionary<string, object>() {{"a", 1}, {"b", 1}};
            IDictionary<string, object> d2 = new Dictionary<string, object>() {{"a", 2}, {"b", 2}, {"c", 2}};
            IDictionary<string, object> d3 = new Dictionary<string, object>() {{"a", 3}, {"c", 3}, {"d", 3}};
            IDictionary<string, object> expected = new Dictionary<string, object>()
                {{"a", 3}, {"b", 2}, {"c", 3}, {"d", 3}};

            var result = Logger.CombineDictionaries(new[] {d1, d2, d3});
            Assert.That(result, Is.EquivalentTo(expected));
        }
    }
}