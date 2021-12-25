using System.Threading.Tasks;
using ChatApp.AppData.Models;
using ChatApp.ChatAppServices.Repositories.Models;

namespace ChatApp.ChatAppServices.Repositories.Interfaces
{
    public interface IChatRoomRepository
    {
        public Task<QueryResult<Room>> GetChatRoomById(int id);
        public Task<bool> TryCreateChatRoomAsync(User chatRoom);
        public Task<QueryResult<Room>> CreateChatRoom(User chatRoom);
        public Task<bool> TryAddUserInRoomAsync(Room chatRoom, int userId);
        public Task<QueryResult<Room[]>> GetRoomsThatHasUser(int userId);

    }
}