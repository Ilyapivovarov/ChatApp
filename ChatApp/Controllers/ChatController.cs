using System.Threading.Tasks;
using ChatApp.AppData.Dto;
using ChatApp.ChatAppServices;
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
    public class ChatController : ChatAppControllerBase
    {
        private readonly IHubContext<ChatHub, IChatClient> _chatHub;

        public ChatController(IHubContext<ChatHub, IChatClient> chatHub)
        {
            _chatHub = chatHub;
        }

        [HttpGet("{chatRoomId:int}")]
        [Authorize]
        [Route("join-to-room/{chatRoomId:int}")]
        public async Task<ActionResult> JoinUserToChatRoom(int chatRoomId)
        {
            var chatRoomRepository = Services.Locator.GetRequiredService<IChatRoomRepository>();
            var chatRoom = await chatRoomRepository.GetChatRoomById(chatRoomId);

            if (chatRoom.HasValue)
            {
                if (await chatRoomRepository.TryAddUserInRoomAsync(chatRoom.Value, UserId))
                {
                    return Success();
                }
            }

            return BadRequest(chatRoom.ErrorMessage);
        } 

        [HttpPost]
        [Route("send-message/{roomId:int}")]
        [Authorize]
        public async Task<ActionResult> SendMessage(int roomId, [FromBody]Message message)
        {
            await _chatHub.Clients.Group(roomId.ToString())
                .ReceiveMessage(message);

            await Services.Locator.GetRequiredService<IChatMessageRepository>()
                .TrySaveMessageAsync(roomId, message);
            
            return Ok();
        }

        [HttpPost("{chatRoomName}")]
        [Route("create-chat-room/{chatRoomName}")]
        [Authorize]
        public async Task<ActionResult> CreateChatRoom(string chatRoomName)
        {
            var user = await Services.Locator.GetRequiredService<IUserRepository>()
                .GetUserByIdAsync(UserId);
            if (user.HasValue)
            {
                var chatRoom = await Services.Locator.GetRequiredService<IChatRoomRepository>()
                    .CreateChatRoom(user.Value);
                if (chatRoom.HasValue)
                {
                    return Success(chatRoom);
                }
            }
            
            return Error(user.ErrorMessage);
        }
    }
}