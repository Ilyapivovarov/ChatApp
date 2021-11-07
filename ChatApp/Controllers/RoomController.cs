using System.Threading.Tasks;
using ChatApp.AppData.Dto;
using ChatApp.AppData.Models;
using ChatApp.ChatAppServices;
using ChatApp.ChatAppServices.MapperService;
using ChatApp.ChatAppServices.Repositories.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;

namespace ChatApp.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class RoomController : ControllerBase
    {
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