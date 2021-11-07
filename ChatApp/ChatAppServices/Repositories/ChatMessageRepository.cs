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
        public async Task<bool> TrySaveMessageAsync(int id, Message message)
        {
            return await Task.Run(() =>
            {
                return WriteData(db =>
                    {
                        var room = db.ChatRooms.FirstOrDefault(x => x.Id == id);
                        var author = db.Users.FirstOrDefault(x => x.Id == message.AuthorId);
                        if (author != null)
                        {
                            var chatMessage = new ChatMessage
                            {
                                Message = message.MessageBody,
                                Author = author
                            };

                            room?.ChatMessages.Add(chatMessage);
                        }
                    },
                    "Error while saving message");
            });
        }
    }
}