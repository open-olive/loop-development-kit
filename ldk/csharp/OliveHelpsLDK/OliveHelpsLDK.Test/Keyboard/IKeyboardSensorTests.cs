using NUnit.Framework;
using OliveHelpsLDK.Keyboard;

namespace OliveHelpsLDK.Test.Keyboard
{
    [TestFixture]
    public class HotKeyTests
    {
        [SetUp]
        public void Setup()
        {
        }

        [Test]
        public void TestAltL()
        {
            var key = new HotKey
            {
                AltL = true
            };
            Assert.That(key.Modifiers(), Is.EqualTo(1));
        }

        [Test]
        public void TestCombination()
        {
            var key = new HotKey
            {
                AltL = true,
                Meta = true,
            };
            var expected = (1 << 0) + (1 << 8);
            Assert.That(key.Modifiers(), Is.EqualTo(expected));
        }
    }
}