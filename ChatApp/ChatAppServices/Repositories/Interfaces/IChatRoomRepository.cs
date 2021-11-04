using System.Threading.Tasks;
using ChatApp.AppData.Models;

namespace ChatApp.ChatAppServices.Repositories.Interfaces
{
    public interface IChatRoomRepository
    {
        public Task<bool> TrySaveChatRoomAsync(ChatRoom chatRoom);
        public Task<bool> TryAddUserInRoomAsync(int chatRoomId, int userId);
    }
}