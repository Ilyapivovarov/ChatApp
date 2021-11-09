using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using ChatApp.AppData.Dto;
using ChatApp.AppData.Models;
using ChatApp.ChatAppServices;
using ChatApp.ChatAppServices.MapperService;
using ChatApp.ChatAppServices.Repositories;
using ChatApp.ChatAppServices.Repositories.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;

namespace ChatApp.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [Authorize]
    public class RoomController : ControllerBase
    {
        private int UserId => int.Parse(User.Claims.Single(c => c.Type == ClaimTypes.NameIdentifier).Value);
        
        [HttpGet]
        public async Task<ActionResult> GetUserRooms()
        {
            var room = await Services.Locator.GetRequiredService<IChatRoomRepository>()
                .GetRoomThatHasUser(UserId);

            if (room != null)
            {
                 var roomDto = Services.Locator.GetRequiredService<IMapperService>()
                                .Map<ChatRoom, Room>(room);

                 return Ok(roomDto);
            }

            return BadRequest();
        }
        
        [HttpGet("{id:int}")]
        [Route("{id:int}")]
        public async Task<ActionResult> GetRoomById(int id)
        {
            var result = await Services.Locator.GetRequiredService<IChatRoomRepository>().GetChatRoomById(id);
            var room = Services.Locator.GetRequiredService<IMapperService>()
                .Map<ChatRoom, Room>(result);
            
            
            return Ok(room);
        }
    }
}