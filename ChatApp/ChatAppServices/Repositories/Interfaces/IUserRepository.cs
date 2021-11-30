using System.Threading.Tasks;
using ChatApp.AppData.Dto;
using ChatApp.AppData.Models;
using ChatApp.ChatAppServices.Repositories.Models;

namespace ChatApp.ChatAppServices.Repositories.Interfaces
{
    public interface IUserRepository
    {
        public Task<QueryResult<User>> SignUpAsync(SignUp signOn);
        
        public Task<QueryResult<User>> SignInAsync(SignIn signIn);
        
        public QueryResult<User> SignInUser(SignIn signIn);

        public Task<QueryResult<User[]>> GetUsersAsync();

        public QueryResult<User> GetUserById(int userId);
        
        public Task<QueryResult<User>> GetUserByIdAsync(int accountId);

        public Task<QueryResult<bool>> IsUsernameUnused(string userName);
    }
}