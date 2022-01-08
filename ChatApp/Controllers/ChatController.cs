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
        /// <param name="userDto"></param>
        /// <returns>Chat</returns>
        [HttpGet]
        [Route("get/chat-by-members")]
        public async Task<ActionResult> GetChatByMembers(UserDto[] userDto)
        {
            if (CurrentUser == null)
                return Unauthorized();

            var users = await Services.Locator.GetRequiredService<IUserRepository>()
                .GetUsersByIds(userDto.Select(x => x.Id));

            var chat = await Services.Locator.GetRequiredService<IChatRepository>()
                .GetChatByExistingMembers(users);

            if (chat == null)
                return BadRequest("Error while searching chat");

            return Ok(chat);
        }

        /// <summary>
        /// Get or create chat
        /// </summary>
        /// <returns></returns>
        [HttpPut]
        [Route("get-or-create-chat")]
        public async Task<ActionResult> GetOrCreateChat(UserDto[] members)
        {
            if (CurrentUser == null)
                return Unauthorized();

            var a = members.Select(x => x.Id).ToList();
            a.Add(CurrentUser.Id);
            var users = await Services.Locator.GetRequiredService<IUserRepository>()
                .GetUsersByIds(a);

            if (users.Contains(null))
                return BadRequest("Error while searching user");

            var notNullUsers = (User[]) users;
            var existingChat = await Services.Locator.GetRequiredService<IChatRepository>()
                .GetChatByExistingMembers(notNullUsers);

            if (existingChat != null)
                return Ok(existingChat);
            
            var newChat = await Services.Locator.GetRequiredService<IChatRepository>()
                .CreateAndReturnNewChatAsync(CurrentUser, notNullUsers);

            var chat = await Services.Locator.GetRequiredService<IChatRepository>()
                .GetChatByGuidAsync(newChat?.Guid);

            if (chat == null)
                return BadRequest("Error while creating chat");

            return Ok(newChat);
        }
    }
}