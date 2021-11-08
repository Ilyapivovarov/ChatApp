using System.Threading.Tasks;

namespace ChatApp.ChatAppServices.Repositories.Interfaces
{
    public interface IDefaultDataRepository
    {
        bool InitDefaultDataAsync();
    }
}