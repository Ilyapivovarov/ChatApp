using System.Threading.Tasks;
using ChatApp.AppData.Models;
using ChatApp.ChatAppServices;
using ChatApp.ChatAppServices.Repositories.Interfaces;
using ChatApp.Controllers.Base;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;

namespace ChatApp.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class ChatController : ChatAppControllerBase
    {
        [HttpGet]
        public async Task<ActionResult> GetChats()
        {
            if (CurrentUser == null)
                return BadRequest("");
            
            var chats = await Services.Locator.GetRequiredService<IChatRepository>()
                .GetChatsThatHasUser(CurrentUser);

            if (chats == null)
                return BadRequest("");
            
            return Ok(chats);
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult> GetChat(int id)
        {
            if (CurrentUser == null)
                return BadRequest("");

            var chat = await Services.Locator.GetRequiredService<IChatRepository>()
                .GetChatById(id);

            if (chat == null)
                return BadRequest("");
            
            return Ok(chat);
        }

        /// <summary>
        /// Создать новый чат
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        [Route("create-chat")]
        public async Task<ActionResult> GetOrCreateChat(User[] members)
        {
            if (CurrentUser == null)
                return Unauthorized();

            var newChat = await Services.Locator.GetRequiredService<IChatRepository>()
                .CreateAndReturnNewChatAsync(CurrentUser, members);

            if (newChat == null)
                return BadRequest("Ошибка при создании чата");
            
            return Ok(newChat);
        }
    }
}