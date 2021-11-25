using System;
using System.Threading.Tasks;
using ChatApp.ChatAppServices;
using ChatApp.ChatAppServices.Repositories.Interfaces;
using ChatApp.Controllers.Base;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

namespace ChatApp.Controllers
{
    [ApiController]
    [Route("[controller]/account/account")]
    public class AccountController : ChatAppControllerBase
    {
        [HttpGet]
        [Route("")]
        public async Task<ActionResult> GetAccounts()
        {
            try
            {
                var accounts = await Services.Locator.GetRequiredService<IUserRepository>()
                    .GetUsersAsync();
                return Success(accounts);
            }
            catch (Exception e)
            {
                Services.Logger.LogError(e, e.Message);
                return Error(e.Message);
            }
        }
        
        
        [HttpGet]
        [Route("{id:int}")]
        public async Task<ActionResult> GetAccounts(int id)
        {
            try
            {
                var account = await Services.Locator.GetRequiredService<IUserRepository>()
                    .GetUserByIdAsync(id);
                return Success(account);
            }
            catch (Exception e)
            {
                Services.Logger.LogError(e, e.Message);
                return Error(e.Message);
            }
        }
    }
}