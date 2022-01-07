using System;
using System.Threading.Tasks;
using ChatApp.AppData.Models;

namespace ChatApp.ChatAppServices.Repositories.Interfaces
{
    public interface IChatRepository
    {
        public Task<Chat?> GetChatById(int id);
        public Task<bool> TryCreateChatAsync(User creator);
        public Task<bool> TryAddUserInChatAsync(Chat chatRoom, int userId);
        public Task<Chat[]?> GetChatsThatHasUser(User user, int chatId = 0);

        /// <summary>
        /// Create and return chat 
        /// </summary>
        /// <param name="creator">Chat creator</param>
        /// <param name="users">Chat members</param>
        /// <returns>Created chat</returns>
        public Task<Chat?> CreateAndReturnNewChatAsync(User creator, params User[] users);

        /// <summary>
        /// Get chat by existing members
        /// </summary>
        /// <param name="members">Existing members</param>
        /// <returns>Chat</returns>
        public Task<Chat?> GetChatByExistingMembers(params User[] members);

        /// <summary>
        /// Getting chat by guid
        /// </summary>
        /// <param name="guid">Chat guid</param>
        /// <returns></returns>
        public Task<Chat?> GetChatByGuidAsync(Guid? guid);
    }
}