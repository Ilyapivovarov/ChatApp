using ChatApp.AppData.ModelBuilders.Interfaces;
using ChatApp.AppData.Models;

namespace ChatApp.AppData.ModelBuilders;

public class UserBuilder : IUserBuilder
{
    private readonly User _newUser; 

    public UserBuilder()
    {
        _newUser = new User();
    }
    
    public IUserBuilder Reset()
    {
        return new UserBuilder();
    }

    public IUserBuilder SetUserName(string userName)
    {
        _newUser.UserName = userName;
        return this;
    }

    public IUserBuilder SetPassword(string password)
    {
        _newUser.Password = password;
        return this;
    }

    public IUserBuilder SetFirstName(string firstName)
    {
        _newUser.FirstName = firstName;
        return this;
    }

    public IUserBuilder SetLastName(string lastName)
    {
        _newUser.LastName = lastName;
        return this;
    }

    public IUserBuilder AddUsersInFriendsList(params User[] users)
    {
        _newUser.Friends.AddRange(users);
        return this;
    }

    public IUserBuilder SetUserRole(UserRole role)
    {
        _newUser.Role = role;
        return this;
    }

    public IUserBuilder SetUserStatus(UserStatus status)
    {
        _newUser.Status = status;
        return this;
    }

    public User Build()
    {
        return _newUser;
    }
}