using Microsoft.AspNetCore.Mvc;

namespace ChatApp.Common.ActionResults
{
    public class RequestResult : ObjectResult
    {
        private const int DefaultStatusCode = ResponseStatusCodes.RequestResult51;
        
        public RequestResult(object value) : base(value)
        {
            StatusCode = DefaultStatusCode;
            IsSuccess = true;
        }
        
        public RequestResult(string errorMessage) 
            : base(null)
        {
            StatusCode = DefaultStatusCode;
            IsSuccess = false;
            Message = errorMessage;
        }

        public bool IsSuccess { get; }
        
        public string Message { get; set; }
    }
}