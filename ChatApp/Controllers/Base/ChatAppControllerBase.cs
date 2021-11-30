using System.Linq;
using System.Security.Claims;
using ChatApp.AppData.Models;
using ChatApp.ChatAppServices;
using ChatApp.ChatAppServices.Repositories.Interfaces;
using ChatApp.Common.ActionResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Microsoft.Extensions.DependencyInjection;

namespace ChatApp.Controllers.Base
{
    public class ChatAppControllerBase : ControllerBase
    {
        private int _userId;
        private User _currentUser;
        
        protected int UserId
        {
            get
            {
                if (_userId == 0)
                    _userId = int.Parse(User.Claims.Single(c => c.Type == ClaimTypes.NameIdentifier).Value);
                
                return _userId;
            }
        }

        protected User CurrentUser
        {
            get
            {
                if (_currentUser == null)
                {
                    var queryResult = Services.Locator.GetRequiredService<IUserRepository>()
                        .GetUserById(_userId);
                    _currentUser = queryResult.Value;
                }
                    

                return _currentUser;
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