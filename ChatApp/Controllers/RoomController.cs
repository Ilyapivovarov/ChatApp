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
            var rooms = await Services.Locator.GetRequiredService<IChatRoomRepository>()
                .GetRoomsThatHasUser(UserId);

            if (rooms.HasValue)
            {
                var roomsDto = Services.Locator.GetRequiredService<IMapperService>()
                    .Map<ChatRoom[], Room[]>(rooms.Value);

                return Ok(roomsDto);
            }

            return BadRequest(rooms.ErrorMessage);
        }

        [HttpGet("{id:int}")]
        [Route("{id:int}")]
        public async Task<ActionResult> GetRoomById(int id)
        {
            var result = await Services.Locator.GetRequiredService<IChatRoomRepository>().GetChatRoomById(id);

            if (result.HasValue)
            {
                var room = Services.Locator.GetRequiredService<IMapperService>()
                    .Map<ChatRoom, Room>(result.Value);
                return Ok(room);
            }
            
            return BadRequest(result.ErrorMessage);

        }

        [HttpPost]
        [Route("send-message/{id:int}")]
        public async Task<ActionResult> SendMessage(int id, [FromBody] Message message)
        {
            await _chatHub.Clients.All
                .ReceiveMessage(message);

            await Services.Locator.GetRequiredService<IChatMessageRepository>()
                .TrySaveMessageAsync(id, message);

            return Ok();
        }

        [HttpPost]
        [Route("join-to-room/{chatRoomId:int}")]
        public async Task<ActionResult> JoinUserToChatRoom(int chatRoomId, [FromBody] Account account)
        {
            var chatRoomRepository = Services.Locator.GetRequiredService<IChatRoomRepository>();
            var chatRoom = await chatRoomRepository.GetChatRoomById(chatRoomId);

            if (chatRoom.HasValue)
            {
                if (await chatRoomRepository.TryAddUserInRoomAsync(chatRoom.Value, account.Id))
                {
                    return Ok();
                }
            }

            return BadRequest(chatRoom.ErrorMessage);
        }

        [HttpPost("{chatRoomName}")]
        [Route("create-chat-room/{chatRoomName}")]
        public async Task<ActionResult> CreateChatRoom(string chatRoomName)
        {
            var chatRoom = await Services.Locator.GetRequiredService<IChatRoomRepository>()
                .CreateChatRoom(CurrentUser);
            if (chatRoom.HasValue)
            {
                return Ok(chatRoom.Value);
            }
            
            return BadRequest(chatRoom.ErrorMessage);
        }
    }
}