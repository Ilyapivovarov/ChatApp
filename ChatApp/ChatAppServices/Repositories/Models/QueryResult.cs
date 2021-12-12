namespace ChatApp.ChatAppServices.Repositories.Models
{
    public readonly struct QueryResult<TValue>
    {
        public QueryResult(TValue value)
        { 
            Value = value;
            ErrorMessage = null;
        }

        public QueryResult(string error)
        {
            ErrorMessage = error;
            Value = default;
        }

        public TValue Value { get; }

        public bool HasValue => Value != null;

        public string ErrorMessage { get; }
        
        
    }
}