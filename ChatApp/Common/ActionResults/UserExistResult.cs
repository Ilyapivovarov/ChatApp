using Microsoft.AspNetCore.Mvc;

namespace ChatApp.Common.ActionResults
{
    public class UserExistResult : ObjectResult
    {
        private const int DefaultStatusCode = ResponseStatusCodes.UserNameAlreadyExist50;
        
        public UserExistResult(object value) : base(value)
        {
            StatusCode = DefaultStatusCode;
        }
    }
}