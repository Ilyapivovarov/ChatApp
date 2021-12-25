using System.Linq;
using System.Threading.Tasks;
using ChatApp.AppData.Dto;
using ChatApp.AppData.Models;
using ChatApp.ChatAppServices.Repositories.Base;
using ChatApp.ChatAppServices.Repositories.Interfaces;

namespace ChatApp.ChatAppServices.Repositories
{
    public class ChatMessageRepository : RepositoryBase, IChatMessageRepository
    {
        public async Task<bool> TrySaveMessageAsync(MessageDto message)
        {
            return await Task.Run(() =>
            {
                return WriteData(db =>
                    {
                        var room = db.Chats.FirstOrDefault(x => x.Id == message.Id);
                        var author = db.Users.FirstOrDefault(x => x.Id == message.Author.Id);
                        if (author != null)
                        {
                            var chatMessage = new Message
                            {
                                Body = message.Body,
                                Author = author
                            };

                            room?.Messages.Add(chatMessage);
                        }
                    },
                    "Error while saving message");
            });
        }
    }
}