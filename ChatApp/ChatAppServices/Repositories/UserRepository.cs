using System;
using System.Linq;
using System.Threading.Tasks;
using ChatApp.AppData.Dto;
using ChatApp.AppData.Models;
using ChatApp.ChatAppServices.Repositories.Base;
using ChatApp.ChatAppServices.Repositories.Interfaces;

namespace ChatApp.ChatAppServices.Repositories
{
    public sealed class UserRepository : RepositoryBase, IUserRepository
    {
        public async Task<bool> TrySignUpUserAsync(SignUp signUp)
        {
            return await Task.Run(() =>
            {
                return WriteData(db =>
                {
                    if (db.Users.Any(x => x.UserName == signUp.UserName))
                        return false;
                    
                    var user = new User
                    {
                        UserName = signUp.UserName,
                        Password = signUp.Password,
                    };
                    db.Users.Add(user);
                    
                    return true;
                }, "Error while writing user in database");
            });
        }

        public async Task<User> SignInUserAsync(SignIn signIn)
        {
            return await Task.Run(() =>
            {
                return LoadData(db =>
                {
                    return db.Users
                        .FirstOrDefault(x => x.Password.Equals(signIn.Password, StringComparison.Ordinal)
                                             && x.UserName.Equals(signIn.UserName, StringComparison.Ordinal));
                }, "Error while loading user from database");
            });
        }

        public User SignInUser(SignIn signIn)
        {
            return LoadData(db =>
            {
                return db.Users
                    .FirstOrDefault(x => x.Password == signIn.Password
                                         && x.UserName == signIn.UserName);
            }, "Error while loading user from database");
        }

        public async Task<User> GetUserByIdAsync(int userId)
        {
            return await Task.Run(() =>
            {
                return LoadData(db => db.Users.FirstOrDefault(x => x.Id == userId),
                    $"Error while searching user with {userId}");
            });
        }
    }
}