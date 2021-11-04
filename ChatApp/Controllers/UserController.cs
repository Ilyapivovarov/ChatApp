using ChatApp.AppData;
using System.Threading.Tasks;
using ChatApp.AppData.Dto;
using ChatApp.AppData.Models;
using Microsoft.AspNetCore.Mvc;

namespace ChatApp.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private readonly AppDbContext _appContext;

        public UserController(AppDbContext appContext)
        {
            _appContext = appContext;
        }

        [HttpGet]
        [Route("test")]
        public ActionResult<User[]> RunTest()
        {
            return Ok(_appContext.Users);
        }
        
        [HttpPost]
        [Route("sign-up")]
        public async Task<IActionResult> SignUpUser([FromBody] SignUp signOn)
        {
            return Ok();
        }
        
        [HttpPost]
        [Route("sign-on")]
        public async Task<IActionResult> SignInUser([FromBody] SignIn signOn)
        {
            // Добавить сохранение в бд

            return Ok();
        }
    }
}