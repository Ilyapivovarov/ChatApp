using System.Threading.Tasks;
using ChatApp.AppData.Dto;
using ChatApp.AppData.Models;

namespace ChatApp.Services.Repositories.Interfaces
{
    public interface IUserRepository
    {
        public Task<bool> TrySignOnUserAsync(SignOn signOn);

        public Task<User> SignInUserAsync(SignIn signIn);
        
        public Task<User> GetUserByIdAsync(int userId);
    }
}