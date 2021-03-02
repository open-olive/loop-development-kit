namespace SelfTestLoop
{
    [System.AttributeUsage(System.AttributeTargets.Method)]
    public class TestAttribute : System.Attribute
    {
        public string Name { get; set; }

        public TestAttribute(string name)
        {
            Name = name;
        }
    }
}