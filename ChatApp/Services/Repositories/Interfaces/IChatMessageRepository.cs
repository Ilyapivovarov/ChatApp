using System.Threading.Tasks;
using ChatApp.AppData.Dto;
using ChatApp.AppData.Models;

namespace ChatApp.Services.Repositories.Interfaces
{
    public interface IChatMessageRepository
    {
        public Task<bool> TrySaveMessageAsync(ChatMessage message);
    }
}