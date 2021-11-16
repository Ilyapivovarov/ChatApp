using Microsoft.AspNetCore.Mvc;

namespace ChatApp.Common.ActionResults
{
    public class RequestResult : OkObjectResult
    {
        private const int DefaultStatusCode = ResponseStatusCodes.RequestResult51;
        
        public RequestResult(object value) : base(value)
        {
           // StatusCode = DefaultStatusCode;
            IsSuccess = true;
        }
        
        public RequestResult(string errorMessage) 
            : base(null)
        {
            //StatusCode = DefaultStatusCode;
            IsSuccess = false;
            ErrorMessage = errorMessage;
        }

        public bool IsSuccess { get; }
        
        public string ErrorMessage { get; set; }
    }
}