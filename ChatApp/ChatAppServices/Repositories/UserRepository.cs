using System;
using System.Linq;
using System.Threading.Tasks;
using ChatApp.AppData.Dto;
using ChatApp.AppData.Models;
using ChatApp.ChatAppServices.Repositories.Base;
using ChatApp.ChatAppServices.Repositories.Interfaces;
using ChatApp.ChatAppServices.Repositories.Models;

namespace ChatApp.ChatAppServices.Repositories
{
    public sealed class AccountRepository : RepositoryBase, IUserRepository
    {
        public async Task<QueryResult<User>> SignUpAsync(SignUp signUp)
        {
            return await Task.Run(() =>
            {
                return WriteAndReturnData(db =>
                {
                    var user = new User
                    {
                        UserName = signUp.UserName,
                        Password = signUp.Password,
                    };
                    db.Users.Add(user);

                    return user;
                }, "Error while writing user in database");
            });
        }

        public async Task<QueryResult<User>> SignInAsync(SignIn signIn)
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

        public QueryResult<User> SignInUser(SignIn signIn)
        {
            return LoadData(db =>
            {
                return db.Users
                    .FirstOrDefault(x => x.Password == signIn.Password
                                         && x.UserName == signIn.UserName);
            }, "Error while loading user from database");
        }

        public async Task<QueryResult<User[]>> GetUsersAsync()
        {
            return await Task.Run(() =>
            {
                return LoadData(db => db.Users.ToArray(), 
                    "Error while loading users");
            });
        }

        public QueryResult<User> GetUserById(int userId)
        {
            return LoadData(db => db.Users.First(x => x.Id == userId),
                $"Error while searching user with {userId}");
        }

        public async Task<QueryResult<User>> GetUserByIdAsync(int userId)
        {
            return await Task.Run(() =>
            {
                return LoadData(db => db.Users.FirstOrDefault(x => x.Id == userId),
                    $"Error while searching user with {userId}");
            });
        }

        public async Task<QueryResult<bool>> IsUsernameUnused(string userName)
        {
            return await Task.Run(() =>
            {
                return LoadData(db => db.Users.Any(x => x.UserName == userName),
                    $"Error while founding user with username {userName}");
            });
        }
    }
}