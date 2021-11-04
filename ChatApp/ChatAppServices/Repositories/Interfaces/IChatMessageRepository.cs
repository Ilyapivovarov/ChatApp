using System.Threading.Tasks;
using ChatApp.AppData.Models;

namespace ChatApp.ChatAppServices.Repositories.Interfaces
{
    public interface IChatMessageRepository
    {
        public Task<bool> TrySaveMessageAsync(ChatMessage message);
    }
}