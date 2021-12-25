using System.Threading.Tasks;
using ChatApp.AppData.Dto;
using ChatApp.AppData.Models;
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
    [Authorize]
    public class ChatController : ChatAppControllerBase
    {
        [HttpGet]
        public async Task<ActionResult> GetChats()
        {
            var chats = await Services.Locator.GetRequiredService<IChatRepository>()
                .GetRoomsThatHasUser(UserId);

            if (chats != null)
            {
                return Ok(chats);
            }

            return BadRequest("");
        }
        
        [HttpGet("{id:int}")]
        public async Task<ActionResult> GetChat(int id)
        {
            var chats = await Services.Locator.GetRequiredService<IChatRepository>()
                .GetRoomsThatHasUser(UserId);

            if (chats != null)
            {
                return Ok(chats);
            }

            return BadRequest("");
        }
    }
}