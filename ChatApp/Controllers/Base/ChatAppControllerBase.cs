using System.Linq;
using ChatApp.AppData.Models;
using ChatApp.ChatAppServices;
using ChatApp.ChatAppServices.Repositories.Interfaces;
using ChatApp.Common.CustomClaims;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;

namespace ChatApp.Controllers.Base
{
    public class ChatAppControllerBase : ControllerBase
    {
        private int _userId;
        private User? _currentUser;
        
        protected int UserId
        {
            get
            {
                if (_userId == 0)
                    _userId = int.Parse(User.Claims.Single(c => c.Type == CustomClaimTypes.Id).Value);
                
                return _userId;
            }
        }

        protected User? CurrentUser
        {
            get
            {
                if (_currentUser == null)
                {
                    var queryResult = Services.Locator.GetRequiredService<IUserRepository>()
                        .GetUserById(UserId);
                    _currentUser = queryResult ?? null;
                }
                    
                return _currentUser;
            }
        }
    }
}