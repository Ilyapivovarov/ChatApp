using System.Threading.Tasks;
using ChatApp.AppData.Dto;
using ChatApp.AppData.Models;

namespace ChatApp.ChatAppServices.Repositories.Interfaces
{
    public interface IUserRepository
    {
        public Task<bool> TrySignUpAsync(SignUp signOn);
        
        public Task<User> SignInAsync(SignIn signIn);
        
        public User SignInUser(SignIn signIn);

        public Task<User[]> GetUsersAsync();

        public User GetUserById(int userId);
        
        public Task<User> GetUserByIdAsync(int accountId);

        public Task<bool> IsUsernameUnused(string userName);
    }
}