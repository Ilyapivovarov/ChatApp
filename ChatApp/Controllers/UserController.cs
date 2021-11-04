using ChatApp.AppData;
using System.Threading.Tasks;
using ChatApp.AppData.Dto;
using ChatApp.AppData.Models;
using ChatApp.ChatAppServices;
using ChatApp.ChatAppServices.AuthService;
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
        public async Task<IActionResult> SignUpUser([FromBody] SignUp signOn)
        {
            return Ok();
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