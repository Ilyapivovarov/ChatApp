using System.Threading.Tasks;
using ChatApp.AppData.Models;
using ChatApp.ChatAppServices.Repositories.Models;

namespace ChatApp.ChatAppServices.Repositories.Interfaces
{
    public interface IChatRoomRepository
    {
        public Task<QueryResult<ChatRoom>> GetChatRoomById(int id);
        public Task<bool> TryCreateChatRoomAsync(User chatRoom);
        public Task<QueryResult<ChatRoom>> CreateChatRoom(User chatRoom);
        public Task<bool> TryAddUserInRoomAsync(ChatRoom chatRoom, int userId);
        public Task<QueryResult<ChatRoom[]>> GetRoomsThatHasUser(int userId);

    }
}