using System.Linq;
using System.Net;
using System.Security.Claims;
using ChatApp.AppData;
using System.Threading.Tasks;
using ChatApp.AppData.Dto;
using ChatApp.AppData.Models;
using ChatApp.ChatAppServices;
using ChatApp.ChatAppServices.AuthService;
using ChatApp.ChatAppServices.Repositories.Interfaces;
using ChatApp.Common.ActionResults;
using ChatApp.Common.CustomClaims;
using ChatApp.Controllers.Base;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;

namespace ChatApp.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ChatAppControllerBase
    {
        [HttpGet]
        [Route("test")]
        public ActionResult<User[]> RunTest()
        {
            return Ok(Services.Locator.GetRequiredService<AppDbContext>().Users);
        }

        [HttpGet]
        [Authorize]
        [Route("test-auth-protections")]
        public ActionResult<int> TestProtection()
        {
            return Ok(UserId);
        }

        [HttpPost]
        [Route("sign-up")]
        public async Task<ActionResult> SignUpUser([FromBody] SignUp signUp)
        {
            var userRepository = Services.Locator.GetRequiredService<IUserRepository>();
            if (await userRepository.IsUsernameUnused(signUp.UserName))
            {
                return RequestResultError("Username already exist");
            }

            if (await userRepository.TrySignUpUserAsync(signUp))
            {
                Services.Locator.GetRequiredService<IAuthService>()
                    .TryAuthUser(new SignIn {UserName = signUp.UserName, Password = signUp.Password},
                        out var token);

                return RequestResultSuccess(new {access_token = token});
            }

            return BadRequest("Error while creating user");
        }

        [HttpPost]
        [Route("sign-in")]
        public ActionResult SignInUser([FromBody] SignIn signIn)
        {
            if (Services.Locator.GetRequiredService<IAuthService>()
                .TryAuthUser(signIn, out var token))
            {
                return RequestResultSuccess(new {access_token = token});
            }

            return Unauthorized();
        }
    }
}