using System.Linq;
using System.Threading.Tasks;
using ChatApp.AppData.Models;
using ChatApp.ChatAppServices.Repositories.Base;
using ChatApp.ChatAppServices.Repositories.Interfaces;
using Microsoft.Extensions.Logging;

namespace ChatApp.ChatAppServices.Repositories
{
    public class ChatRoomRepository : RepositoryBase, IChatRoomRepository
    {
        public async Task<ChatRoom> GetChatRoomById(int id)
        {
            return await Task.Run(() =>
            {
                return LoadData(db => db.ChatRooms.FirstOrDefault(x => x.Id == id),
                    $"Error while founding chatroom with id {id}");
            });
        }

        public async Task<bool> TrySaveChatRoomAsync(ChatRoom chatRoom)
        {
            return await Task.Run(() =>
            {
                return WriteData(db => db.ChatRooms.Add(chatRoom),
                    "Error while creating chat room");
            });
        }

        public async Task<bool> TryAddUserInRoomAsync(ChatRoom chatRoom, int userId)
        {
            return await Task.Run(() =>
            {
                return WriteData(db =>
                {
                    var user = db.Users.FirstOrDefault(x => x.Id == userId);
                    chatRoom.Users.Add(user);
                    db.Update(chatRoom);
                }, "Error while adding user in chat room");
            });
        }
    }
}