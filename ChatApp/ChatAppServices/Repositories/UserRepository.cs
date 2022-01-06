using System;
using System.Collections.Generic;
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
        public async Task<User?> SignUpAsync(SignUpDto signUpDto)
        {
            return await Task.Run(() =>
            {
                return WriteAndReturnData(db =>
                {
                    var user = new User
                    {
                        UserName = signUpDto.UserName,
                        Password = signUpDto.Password
                    };
                    db.Users.Add(user);

                    return user;
                    
                }, "Error while writing user in database");
            });
        }

        public async Task<User?> SignInAsync(SignInDto signIn)
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

        public User? SignInUser(SignInDto signIn)
        {
            return LoadData(db =>
            {
                return db.Users
                    .FirstOrDefault(x => x.Password == signIn.Password
                                         && x.UserName == signIn.UserName);
            }, "Error while loading user from database");
        }

        public async Task<User[]?> GetUsersAsync()
        {
            return await Task.Run(() =>
            {
                return LoadData(db => db.Users.ToArray(), 
                    "Error while loading users");
            });
        }

        public User? GetUserById(int userId)
        {
            return LoadData(db => db.Users.First(x => x.Id == userId),
                $"Error while searching user with {userId}");
        }

        public async Task<User?[]> GetUsersByIds(IEnumerable<int> userIds)
        {
            var userList = new List<User?>();
            foreach (var userId in userIds)
            {
                var user = await GetUserByIdAsync(userId);
                userList.Add(user);
            }

            return userList.ToArray();
        }

        public async Task<User?> GetUserByIdAsync(int userId)
        {
            return await Task.Run(() =>
            {
                return LoadData(db => db.Users.FirstOrDefault(x => x.Id == userId),
                    $"Error while searching user with {userId}");
            });
        }

        public async Task<bool> IsUsernameUnused(string? userName)
        {
            return await Task.Run(() =>
            {
                return LoadData(db => db.Users.Any(x => x.UserName == userName),
                    $"Error while founding user with username {userName}");
            });
        }

        public async Task<bool> TryUpdateFriendList(User user, params int[] friendIds)
        {
            return await Task.Run(() =>
            {
                return WriteData(db =>
                {
                    user.Friends.AddRange(db.Users.Where(x => friendIds.Contains(x.Id)));
                }, "Error while adding new friends");
            });
        }
    }
}