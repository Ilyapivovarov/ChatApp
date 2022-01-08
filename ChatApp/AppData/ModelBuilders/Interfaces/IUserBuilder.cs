using ChatApp.AppData.Models;

namespace ChatApp.AppData.ModelBuilders.Interfaces;

public interface IUserBuilder
{
    /// <summary>
    /// Reset builder
    /// </summary>
    /// <returns></returns>
    public IUserBuilder Reset();

    /// <summary>
    /// Set username
    /// </summary>
    /// <param name="userName">Username</param>
    /// <returns></returns>
    public IUserBuilder SetUserName(string userName);

    /// <summary>
    /// Set password
    /// </summary>
    /// <param name="password">Password</param>
    /// <returns>User builder</returns>
    public IUserBuilder SetPassword(string password);

    /// <summary>
    /// Set first name
    /// </summary>
    /// <param name="firstName">Имя</param>
    /// <returns></returns>
    public IUserBuilder SetFirstName(string firstName);
    
    /// <summary>
    /// Set last name
    /// </summary>
    /// <param name="lastName">Фамилия</param>
    /// <returns>User builder</returns>
    public IUserBuilder SetLastName(string lastName);

    /// <summary>
    /// Add users in friends list
    /// </summary>
    /// <param name="users">User</param>
    /// <returns>User builder</returns>
    public IUserBuilder AddUsersInFriendsList(params User[] users);

    /// <summary>
    /// Set user role
    /// </summary>
    /// <param name="role">User role</param>
    /// <returns>AddUsersInFriendsList</returns>
    public IUserBuilder SetUserRole(UserRole role);

    /// <summary>
    /// Set user status
    /// </summary>
    /// <param name="status">User status</param>
    /// <returns>User builder</returns>
    public IUserBuilder SetUserStatus(UserStatus status);

    /// <summary>
    /// Build model 
    /// </summary>
    /// <returns>User</returns>
    public User Build();
}
