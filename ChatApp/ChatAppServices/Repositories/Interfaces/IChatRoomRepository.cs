using System.Threading.Tasks;
using ChatApp.AppData.Models;

namespace ChatApp.ChatAppServices.Repositories.Interfaces
{
    public interface IChatRepository
    {
        public Task<Chat?> GetChatRoomById(int id);
        public Task<bool> TryCreateChatRoomAsync(User chatRoom);
        public Task<Chat?> CreateChatRoom(User chatRoom);
        public Task<bool> TryAddUserInRoomAsync(Chat chatRoom, int userId);
        public Task<Chat[]?> GetRoomsThatHasUser(int userId, int chatId = 0);

    }
}