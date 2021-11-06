using System.Linq;
using System.Threading.Tasks;
using ChatApp.AppData.Models;
using ChatApp.ChatAppServices.Repositories.Base;
using ChatApp.ChatAppServices.Repositories.Interfaces;

namespace ChatApp.ChatAppServices.Repositories
{
    public class ChatMessageRepository : RepositoryBase, IChatMessageRepository
    {
        public async Task<bool> TrySaveMessageAsync(int id, ChatMessage message)
        {
            return await Task.Run(() =>
            {
                return WriteData(db =>
                    {
                       var room = db.ChatRooms.FirstOrDefault(x => x.Id == id);
                       room?.ChatMessages.Add(message);
                    }, 
                    "Error while saving message");
            });
        }
    }
}