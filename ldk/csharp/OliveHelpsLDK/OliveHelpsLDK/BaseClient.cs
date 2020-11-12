namespace OliveHelpsLDK
{
    public abstract class BaseClient
    {
        protected Session _session;

        protected Proto.Session CreateSession()
        {
            return new Proto.Session
            {
                LoopID = _session.LoopId,
                Token = _session.Token,
            };
        }
    }
}