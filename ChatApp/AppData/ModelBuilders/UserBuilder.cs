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
    
    public IUserBuilder Rest()
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

    public User Build()
    {
        return _newUser;
    }
}