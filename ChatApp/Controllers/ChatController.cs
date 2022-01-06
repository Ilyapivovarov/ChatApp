using System.Linq;
using System.Threading.Tasks;
using ChatApp.AppData.Dto;
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
        /// Get chat by existing members
        /// </summary>
        /// <param name="userDtos"></param>
        /// <returns>Chat</returns>
        [HttpGet]
        [Route("get/chat-by-members")]
        public async Task<ActionResult> GetChatByMembers(UserDto[] userDtos)
        {
            if (CurrentUser == null)
                return Unauthorized();

            var users = await Services.Locator.GetRequiredService<IUserRepository>()
                .GetUsersByIds(userDtos.Select(x => x.Id));

            var chat = await Services.Locator.GetRequiredService<IChatRepository>()
                .GetChatByExistingMembers(users);

            if (chat == null)
                return BadRequest("Error while searching chat");

            return Ok(chat);
        }

        /// <summary>
        /// Создать новый чат
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        [Route("create-chat")]
        public async Task<ActionResult> GetOrCreateChat(UserDto[] members)
        {
            if (CurrentUser == null)
                return Unauthorized();

            var users = await Services.Locator.GetRequiredService<IUserRepository>()
                .GetUsersByIds(members.Select(x => x.Id));

            if (users.Contains(null))
                return BadRequest("Error while searching user");
            
            var newChat = await Services.Locator.GetRequiredService<IChatRepository>()
                .CreateAndReturnNewChatAsync(CurrentUser, users);

            var chat = await Services.Locator.GetRequiredService<IChatRepository>()
                .GetChatByGuidAsync(newChat?.Guid);
            
            if (chat == null)
                return BadRequest("Error while creating chat");
            
            return Ok(newChat);
        }
    }
}