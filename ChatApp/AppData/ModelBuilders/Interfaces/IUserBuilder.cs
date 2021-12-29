using ChatApp.AppData.Models;

namespace ChatApp.AppData.ModelBuilders.Interfaces;

public interface IUserBuilder
{
    public IUserBuilder Rest();

    public IUserBuilder SetUserName(string userName);

    public IUserBuilder SetPassword(string password);

    public User Build();
}
