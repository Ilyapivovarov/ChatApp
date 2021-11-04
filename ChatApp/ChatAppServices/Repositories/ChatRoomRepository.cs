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
        public async Task<bool> TrySaveChatRoomAsync(ChatRoom chatRoom)
        {
            return await Task.Run(() =>
            {
                return WriteData(db => db.ChatRooms.Add(chatRoom),
                    "Error while creating chat room");
            });
        }

        public async Task<bool> TryAddUserInRoomAsync(int chatRoomId, int userId)
        {
            return await Task.Run(() =>
            {
                return WriteData(db =>
                {
                    var user = db.Users.FirstOrDefault(x => x.Id == userId);
                    var chatRoom = db.ChatRooms.FirstOrDefault(x => x.Id == chatRoomId);

                    if (user == null || chatRoom == null)
                    {
                        ChatAppServices.Services.Logger.LogInformation("Not found user or chat room");
                        return;
                    }

                    chatRoom.Users.Add(user);
                    db.Update(chatRoom);
                }, "Error while adding user in chat room");
            });
        }
    }
}