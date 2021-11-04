using System.Threading.Tasks;
using ChatApp.AppData.Models;
using ChatApp.ChatAppServices.Repositories.Base;
using ChatApp.ChatAppServices.Repositories.Interfaces;

namespace ChatApp.ChatAppServices.Repositories
{
    public class ChatMessageRepository : RepositoryBase, IChatMessageRepository
    {
        public async Task<bool> TrySaveMessageAsync(ChatMessage message)
        {
            return await Task.Run(() =>
            {
                return WriteData(db => db.ChatMessages.Add(message), 
                    "Error while saving message");
            });
        }
    }
}