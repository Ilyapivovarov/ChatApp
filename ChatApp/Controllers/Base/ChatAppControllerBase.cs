using System.Linq;
using System.Security.Claims;
using ChatApp.Common.ActionResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Infrastructure;

namespace ChatApp.Controllers.Base
{
    public class ChatAppControllerBase : ControllerBase
    {
        private int _userId;
        
        protected int UserId
        {
            get
            {
                if (_userId == 0)
                    _userId = int.Parse(User.Claims.Single(c => c.Type == ClaimTypes.NameIdentifier).Value);
                
                return _userId;
            }
        }

        [NonAction]
        protected RequestResult Success([ActionResultObjectValue] object value = null)
            => new(new {isSuccess = true, value});

        [NonAction]
        protected RequestResult Error([ActionResultObjectValue] string errorMessage)
            => new(new {isSuccess = false, errorMessage});
    }
}