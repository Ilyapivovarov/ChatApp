namespace ChatApp.ChatAppServices.Repositories.Models
{
    public readonly struct QueryResult<TValue>
    {
        public QueryResult(TValue value)
        {
            Value = value;
            HasValue = true;
            ErrorMessage = null;
        }

        public QueryResult(string error)
        {
            ErrorMessage = error;
            Value = default;
            HasValue = false;
        }

        public TValue Value { get; }

        public bool HasValue { get; }

        public string ErrorMessage { get; }
        
        
    }
}