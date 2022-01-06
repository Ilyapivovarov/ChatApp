using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;
using ChatApp.AppData.Dto;
using ChatApp.AppData.Models;

namespace ChatApp.ChatAppServices.Repositories.Interfaces
{
    public interface IUserRepository
    {
        public Task<User?> SignUpAsync(SignUpDto signOn);
        
        public Task<User?> SignInAsync(SignInDto signIn);
        
        public User? SignInUser(SignInDto signIn);

        public Task<User[]?> GetUsersAsync();

        public User? GetUserById(int userId);

        /// <summary>
        /// Get users by ids 
        /// </summary>
        /// <param name="userIds">User ids</param>
        /// <returns></returns>
        public Task<User?[]> GetUsersByIds(IEnumerable<int> userIds);
        
        public Task<User?> GetUserByIdAsync(int accountId);

        public Task<bool> IsUsernameUnused(string userName);

        /// <summary>
        /// Добавить друзей пользователю
        /// </summary>
        /// <param name="user">Пользователь</param>
        /// <param name="friendIds">Идентификаторы пользователей, которых нужно добавить в друзья</param>
        /// <returns>True - если метод правильно отработал, False - если произошло исключение</returns>
        public Task<bool> TryUpdateFriendList(User user, params int[] friendIds);
    }
}