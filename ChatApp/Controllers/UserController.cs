using ChatApp.AppData;
using System.Threading.Tasks;
using ChatApp.AppData.Dto;
using ChatApp.AppData.Models;
using ChatApp.ChatAppServices;
using ChatApp.ChatAppServices.AuthService;
using ChatApp.ChatAppServices.Repositories;
using ChatApp.ChatAppServices.Repositories.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;

namespace ChatApp.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        [HttpGet]
        [Route("test")]
        public ActionResult<User[]> RunTest()
        {
            return Ok(Services.Locator.GetRequiredService<AppDbContext>().Users);
        }

        [HttpPost]
        [Route("sign-up")]
        public async Task<ActionResult> SignUpUser([FromBody] SignUp signUp)
        {
            var userRepository = Services.Locator.GetRequiredService<IUserRepository>();
            if (await userRepository.IsUsernameUnused(signUp.UserName))
            {
                return BadRequest("Username is used");
            }
            
            if (await userRepository.TrySignUpUserAsync(signUp))
            {
                return Ok();
            }

            return BadRequest("Error while creating user");
        }

        [HttpPost]
        [Route("sign-on")]
        public ActionResult SignInUser([FromBody] SignIn signIn)
        {
            if (Services.Locator.GetRequiredService<IAuthService>()
                .TryAuthUser(signIn, out var token))
            {
                return Ok(new {access_token = token});
            }

            return Unauthorized();
        }
    }
}