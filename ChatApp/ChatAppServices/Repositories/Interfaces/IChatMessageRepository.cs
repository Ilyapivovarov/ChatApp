using System.Threading.Tasks;
using ChatApp.AppData.Dto;
using ChatApp.AppData.Models;

namespace ChatApp.ChatAppServices.Repositories.Interfaces
{
    public interface IMessageRepository
    {
        public Task<bool> TrySaveMessageAsync(MessageDto message);
    }
}