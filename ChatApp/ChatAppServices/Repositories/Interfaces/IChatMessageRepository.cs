using System.Threading.Tasks;
using ChatApp.AppData.Dto;
using ChatApp.AppData.Models;

namespace ChatApp.ChatAppServices.Repositories.Interfaces
{
    public interface IChatMessageRepository
    {
        public Task<bool> TrySaveMessageAsync(int id, MessageDto message);
    }
}