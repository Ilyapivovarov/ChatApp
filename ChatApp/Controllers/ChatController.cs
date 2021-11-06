using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using ChatApp.AppData.Models;
using ChatApp.ChatAppServices;
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
    public class ChatController : ControllerBase
    {
        private readonly IHubContext<ChatHub, IChatClient> _chatHub;

        public ChatController(IHubContext<ChatHub, IChatClient> chatHub)
        {
            _chatHub = chatHub;
        }
        
        private int UserId => int.Parse(User.Claims.Single(c => c.Type == ClaimTypes.NameIdentifier).Value);

        [HttpGet("{chatRoomId:int}")]
        [Authorize]
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

        [HttpPost]
        [Route("send-message/{id:int}")]
        public async Task<ActionResult> SendMessage(int id, [FromBody]ChatMessage message)
        {
            await _chatHub.Clients.Group(id.ToString())
                .ReceiveMessage(message);

            await Services.Locator.GetRequiredService<IChatMessageRepository>()
                .TrySaveMessageAsync(id, message);
            
            return Ok();
        }
    }
}