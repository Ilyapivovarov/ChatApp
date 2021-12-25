using System.Linq;
using System.Threading.Tasks;
using ChatApp.AppData.Models;
using ChatApp.ChatAppServices.Repositories.Base;
using ChatApp.ChatAppServices.Repositories.Interfaces;

namespace ChatApp.ChatAppServices.Repositories
{
    public class ChatRepository : RepositoryBase, IChatRepository
    {
        public async Task<Chat?> GetChatById(int id)
        {
            return await Task.Run(() =>
            {
                return LoadData(db => db.Chats.FirstOrDefault(x => x.Id == id),
                    $"Error while founding chatroom with id {id}");
            });
        }

        public async Task<bool> TryCreateChatAsync(User creator)
        {
            return await Task.Run(() =>
            {
                var chatRoom = new Chat()
                {
                    Creator = creator
                };

                return WriteData(db => db.Chats.Add(chatRoom),
                    "Error while creating chat room");
            });
        }

        public async Task<Chat?> CreateChat(User creator)
        {
            return await Task.Run(() =>
            {
                return WriteAndReturnData(db =>
                {
                    var chatRoom = new Chat()
                    {
                        Creator = creator
                    };

                    db.Chats.Add(chatRoom);

                    return chatRoom;
                }, "Error while creating chat room");
            });
        }

        public async Task<bool> TryAddUserInChatAsync(Chat chat, int userId)
        {
            return await Task.Run(() =>
            {
                return WriteData(db =>
                {
                    var user = db.Users.FirstOrDefault(x => x.Id == userId);
                    if (user != null)
                    {
                        chat.Members.Add(user);
                        db.Update(chat);
                    }
                }, "Error while adding user in chat room");
            });
        }

        public async Task<Chat[]?> GetChatsThatHasUser(User user, int chatId = 0)
        {
            return await Task.Run(() =>
            {
                return LoadData(db =>
                {
                    var query = db.Chats.Where(chat => chat.Members
                        .Contains(user));

                    if (chatId != 0)
                        query = query.Where(x => x.Id == chatId);

                    return query.ToArray();
                    
                }, $"Error while getting room that has user with id {user.Id}");
            });
        }
    }
}