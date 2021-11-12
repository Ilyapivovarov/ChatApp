using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using ChatApp.AppData.Dto;
using ChatApp.AppData.Models;
using ChatApp.ChatAppServices;
using ChatApp.ChatAppServices.MapperService;
using ChatApp.ChatAppServices.Repositories;
using ChatApp.ChatAppServices.Repositories.Interfaces;
using ChatApp.SignalRHubs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.DependencyInjection;

namespace ChatApp.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [Authorize]
    public class RoomController : ControllerBase
    {
        private readonly IHubContext<ChatHub, IChatClient> _chatHub;
        private int _userId = 0;
        
        public RoomController(IHubContext<ChatHub, IChatClient> chatHub)
        {
            _chatHub = chatHub;
        }

        private int UserId
        {
            get
            {
                if (_userId == 0)
                    _userId = int.Parse(User.Claims.Single(c => c.Type == ClaimTypes.NameIdentifier).Value);
                
                return _userId;
            }
        }

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

        [HttpPost]
        [Route("send-message/{id:int}")]
        public async Task<ActionResult> SendMessage(int id, [FromBody] Message message)
        {
            await _chatHub.Clients.All
                .ReceiveMessage(message);

            // await Services.Locator.GetRequiredService<IChatMessageRepository>()
            //     .TrySaveMessageAsync(id, message);
            
            return Ok();
        }
    }
}