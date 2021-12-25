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
            
            if (result)
            {
                return BadRequest("User already exist");
            }

            var signUpResult = await userRepository.SignUpAsync(signUpDto);
            if (signUpResult != null)
            {
                Services.Locator.GetRequiredService<IAuthService>()
                    .TryAuthUser(new SignInDto( signUpDto.UserName, signUpDto.Password), out var token);

                return Ok(new {access_token = token});
            }

            return BadRequest("Error auth user ");
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