using System.Threading.Tasks;
using ChatApp.AppData.Models;

namespace ChatApp.ChatAppServices.Repositories.Interfaces
{
    public interface IChatRoomRepository
    {
        public Task<ChatRoom> GetChatRoomById(int id);
        public Task<bool> TrySaveChatRoomAsync(ChatRoom chatRoom);
        public Task<bool> TryAddUserInRoomAsync(ChatRoom chatRoom, int userId);
    }
}