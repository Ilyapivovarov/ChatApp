using System.Threading.Tasks;
using ChatApp.AppData.Models;
using ChatApp.Services.Repositories.Base;
using ChatApp.Services.Repositories.Interfaces;

namespace ChatApp.Services.Repositories
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