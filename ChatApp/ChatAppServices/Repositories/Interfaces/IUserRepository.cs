using System.Threading.Tasks;
using ChatApp.AppData.Dto;
using ChatApp.AppData.Models;

namespace ChatApp.ChatAppServices.Repositories.Interfaces
{
    public interface IUserRepository
    {
        public Task<bool> TrySignUpUserAsync(SignUp signOn);
        
        public Task<User> SignInUserAsync(SignIn signIn);
        
        public User SignInUser(SignIn signIn);
        
        public Task<User> GetUserByIdAsync(int userId);
    }
}