using System.Threading.Tasks;
using ChatApp.AppData.Models;

namespace ChatApp.ChatAppServices.Repositories.Interfaces
{
    public interface IChatRepository
    {
        public Task<Chat?> GetChatById(int id);
        public Task<bool> TryCreateChatAsync(User creator);
        public Task<Chat?> CreateChat(User creator);
        public Task<bool> TryAddUserInChatAsync(Chat chatRoom, int userId);
        public Task<Chat[]?> GetChatsThatHasUser(User user, int chatId = 0);
    }
}