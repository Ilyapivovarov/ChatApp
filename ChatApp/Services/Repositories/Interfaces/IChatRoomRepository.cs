using System.Threading.Tasks;

namespace ChatApp.Services.Repositories.Interfaces
{
    public interface IChatRoomRepository
    {
        public Task<bool> TryAddUserInRoom(int userId);
    }
}