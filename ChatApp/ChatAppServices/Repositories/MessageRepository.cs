using System.Linq;
using System.Threading.Tasks;
using ChatApp.AppData.Dto;
using ChatApp.AppData.Models;
using ChatApp.ChatAppServices.Repositories.Base;
using ChatApp.ChatAppServices.Repositories.Interfaces;

namespace ChatApp.ChatAppServices.Repositories
{
    public class MessageRepository : RepositoryBase, IMessageRepository
    {
        public async Task<bool> TrySaveMessageAsync(MessageDto message)
        {
            return await Task.Run(() =>
            {
                return WriteData(db =>
                    {
                        var chat = db.Chats.FirstOrDefault(x => x.Id == message.ChatId);
                        var author = db.Users.FirstOrDefault(x => x.Id == message.Author.Id);
                        if (author != null)
                        {
                            var chatMessage = new Message
                            {
                                Body = message.Body,
                                Author = author
                            };

                            chat?.Messages.Add(chatMessage);
                        }
                    },
                    "Error while saving message");
            });
        }
    }
}