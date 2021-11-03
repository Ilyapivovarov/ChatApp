using System.Threading.Tasks;
using ChatApp.AppData.Dto;

namespace ChatApp.Services.Repositories.Interfaces
{
    public interface IChatMessageRepository
    {
        public Task<bool> TrySaveMessage(Message message);
    }
}