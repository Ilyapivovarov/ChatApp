using System.Threading.Tasks;
using ChatApp.AppData.Dto;
using ChatApp.AppData.Models;
using ChatApp.ChatAppServices;
using ChatApp.ChatAppServices.MapperService;
using ChatApp.ChatAppServices.Repositories.Interfaces;
using ChatApp.Controllers.Base;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;

namespace ChatApp.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/[controller]")]
    public class UserController : ChatAppControllerBase
    {
        private readonly IMapperService _mapper;

        public UserController(IMapperService mapper)
        {
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult> GetUsers()
        {
            var users = await Services.Locator.GetRequiredService<IUserRepository>()
                .GetUsersAsync();
            if (users == null)
                return BadRequest("Error");

            return Ok(_mapper.Map<User, UserDto>(users));
        }


        [HttpGet]
        [Route("{id:int}")]
        public async Task<ActionResult> GetUserById(int id)
        {
            var user = await Services.Locator.GetRequiredService<IUserRepository>()
                .GetUserByIdAsync(id);
            
            if (user == null)
                return BadRequest($"Not found user with {id}");
            
            return Ok(_mapper.Map<User, UserDto>(user));
        }

        [HttpPut]
        [Route("update-friends")]
        public async Task<ActionResult> UpdateFriends(int addedFriendId)
        {
            if (CurrentUser == null)
                return Unauthorized();

            var result = await Services.Locator.GetRequiredService<IUserRepository>()
                .TryUpdateFriendList(CurrentUser, addedFriendId);

            if (!result)
                return BadRequest("Error while adding new friends");

            return Ok();
        }
    }
}