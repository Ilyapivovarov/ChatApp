using System.Linq;
using System.Threading.Tasks;
using ChatApp.AppData.Models;
using ChatApp.ChatAppServices.Repositories.Base;
using ChatApp.ChatAppServices.Repositories.Interfaces;
using ChatApp.ChatAppServices.Repositories.Models;

namespace ChatApp.ChatAppServices.Repositories
{
    public class ChatRoomRepository : RepositoryBase, IChatRoomRepository
    {
        public async Task<QueryResult<ChatRoom>> GetChatRoomById(int id)
        {
            return await Task.Run(() =>
            {
                return LoadData(db => db.ChatRooms.FirstOrDefault(x => x.Id == id),
                    $"Error while founding chatroom with id {id}");
            });
        }

        public async Task<bool> TryCreateChatRoomAsync(User creator)
        {
            return await Task.Run(() =>
            {
                var chatRoom = new ChatRoom()
                {
                    Admin = creator
                };
                
                return WriteData(db => db.ChatRooms.Add(chatRoom),
                    "Error while creating chat room");
            });
        }

        public async Task<QueryResult<ChatRoom>> CreateChatRoom(User creator)
        {
            return await Task.Run(() =>
            {
                return WriteAndReturnData(db =>
                {
                    var chatRoom = new ChatRoom
                    {
                        Admin = creator
                    };

                    db.ChatRooms.Add(chatRoom);

                    return chatRoom;
                }, "Error while creating chat room");
            });
        }

        public async Task<bool> TryAddUserInRoomAsync(ChatRoom chatRoom, int userId)
        {
            return await Task.Run(() =>
            {
                return WriteData(db =>
                {
                    var user = db.Users.FirstOrDefault(x => x.Id == userId);
                    if (user != null)
                    {
                        chatRoom.Members.Add(user);
                        db.Update(chatRoom);
                    }
                    
                }, "Error while adding user in chat room");
            });
        }

        public async Task<QueryResult<ChatRoom[]>> GetRoomsThatHasUser(int userId)
        {
            return await Task.Run(() =>
            {
                return LoadData(db =>
                {
                    return db.ChatRooms.Where(x => x.Members.Select(x => x.Id).Contains(userId))
                        .ToArray();
                }, $"Error while getting room that has user with id {userId}");
            });
        }
    }
}