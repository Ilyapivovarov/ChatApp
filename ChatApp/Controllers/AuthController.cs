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
        public async Task<ActionResult> SignUpUser([FromBody] SignUpDto signUpDto)
        {
            var userRepository = Services.Locator.GetRequiredService<IUserRepository>();
            var result = await userRepository.IsUsernameUnused(signUpDto.UserName);
            
            if (result.Value)
            {
                return BadRequest("User already exist");
            }

            var signUpResult = await userRepository.SignUpAsync(signUpDto);
            if (signUpResult.HasValue)
            {
                Services.Locator.GetRequiredService<IAuthService>()
                    .TryAuthUser(new SignInDto {UserName = signUpDto.UserName, Password = signUpDto.Password}, out var token);

                return Ok(new {access_token = token});
            }

            return BadRequest(signUpResult.ErrorMessage);
        }

        [HttpPost]
        [Route("sign-in")]
        public ActionResult SignInUser([FromBody] SignInDto signIn)
        {
            if (Services.Locator.GetRequiredService<IAuthService>()
                .TryAuthUser(signIn, out var token))
            {
                return Ok(new {access_token = token});
            }

            return BadRequest("Not found user with this username");
        }
    }
}