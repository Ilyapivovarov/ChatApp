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
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class ChatController : ChatAppControllerBase
    {
        [HttpGet]
        public async Task<ActionResult> GetChats()
        {
            if (CurrentUser == null)
                return BadRequest("");
            
            var chats = await Services.Locator.GetRequiredService<IChatRepository>()
                .GetChatsThatHasUser(CurrentUser);

            if (chats != null)
                return BadRequest("");
            
            return Ok(chats);
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult> GetChat(int id)
        {
            if (CurrentUser == null)
                return BadRequest("");

            var chats = await Services.Locator.GetRequiredService<IChatRepository>()
                .GetChatsThatHasUser(CurrentUser);

            if (chats == null)
                return BadRequest("");
            
            return Ok(chats);
        }
    }
}