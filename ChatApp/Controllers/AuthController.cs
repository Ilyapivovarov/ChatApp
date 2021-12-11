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
        [Route("sign-up")]
        public async Task<ActionResult> SignUpUser([FromBody] SignUp signUp)
        {
            var userRepository = Services.Locator.GetRequiredService<IUserRepository>();
            var result = await userRepository.IsUsernameUnused(signUp.UserName);
            
            if (result.Value)
            {
                return Error("User already exist");
            }

            var signUpResult = await userRepository.SignUpAsync(signUp);
            if (signUpResult.HasValue)
            {
                Services.Locator.GetRequiredService<IAuthService>()
                    .TryAuthUser(new SignIn {UserName = signUp.UserName, Password = signUp.Password}, out var token);

                return Success(new {access_token = token});
            }

            return Error(signUpResult.ErrorMessage);
        }

        [HttpPost]
        [Route("sign-in")]
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