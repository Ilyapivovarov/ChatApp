using System.Threading.Tasks;
using ChatApp.AppData.Dto;
using ChatApp.ChatAppServices;
using ChatApp.ChatAppServices.AuthService;
using ChatApp.ChatAppServices.Repositories.Interfaces;
using ChatApp.Controllers.Base;

using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;

namespace ChatApp.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AuthController : ChatAppControllerBase
    {
        [HttpPost]
        public async Task<ActionResult> SignUpUser([FromBody] SignUp signUp)
        {
            var userRepository = Services.Locator.GetRequiredService<IUserRepository>();
            if (await userRepository.IsUsernameUnused(signUp.UserName))
            {
                return Error("Username already exist");
            }

            if (await userRepository.TrySignUpAsync(signUp))
            {
                Services.Locator.GetRequiredService<IAuthService>()
                    .TryAuthUser(new SignIn {UserName = signUp.UserName, Password = signUp.Password},
                        out var token);

                return Success(new {access_token = token});
            }

            return BadRequest("Error while creating user");
        }

        [HttpPost]
        public ActionResult SignInUser([FromBody] SignIn signIn)
        {
            if (Services.Locator.GetRequiredService<IAuthService>()
                .TryAuthUser(signIn, out var token))
            {
                return Success(new {access_token = token});
            }

            return Error("Not found user with this username");
        }
    }
}