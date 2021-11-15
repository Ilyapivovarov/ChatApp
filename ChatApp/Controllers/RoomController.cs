using System.Threading.Tasks;
using ChatApp.AppData.Dto;
using ChatApp.AppData.Models;
using ChatApp.ChatAppServices;
using ChatApp.ChatAppServices.MapperService;
using ChatApp.ChatAppServices.Repositories.Interfaces;
using ChatApp.Controllers.Base;
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
    public class RoomController : ChatAppControllerBase
    {
        private readonly IHubContext<ChatHub, IChatClient> _chatHub;

        public RoomController(IHubContext<ChatHub, IChatClient> chatHub)
        {
            _chatHub = chatHub;
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
        
        [HttpGet()]
        [Route("join-to-room/{chatRoomId:int}")]
        public async Task<ActionResult> JoinUserToChatRoom(int chatRoomId)
        {
            var chatRoomRepository = Services.Locator.GetRequiredService<IChatRoomRepository>();
            var chatRoom = await chatRoomRepository.GetChatRoomById(chatRoomId);

            if (chatRoom != null)
            {
                if (await chatRoomRepository.TryAddUserInRoomAsync(chatRoom, UserId))
                {
                    return Ok();
                }
            }

            return BadRequest();
        }

        [HttpPost("{chatRoomName}")]
        [Route("create-chat-room/{chatRoomName}")]
        public async Task<ActionResult> CreateChatRoom(string chatRoomName)
        {
            var user = await Services.Locator.GetRequiredService<IUserRepository>()
                .GetUserByIdAsync(UserId);
            if (user != null)
            {
                var chatRoom = await Services.Locator.GetRequiredService<IChatRoomRepository>()
                    .CreateChatRoom(user);
                if (chatRoom != null)
                {
                    return Ok(chatRoom);
                }
            }
            
            return BadRequest();
        }
    }
}