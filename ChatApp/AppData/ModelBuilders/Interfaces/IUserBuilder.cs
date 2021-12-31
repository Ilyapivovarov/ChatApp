using ChatApp.AppData.Models;

namespace ChatApp.AppData.ModelBuilders.Interfaces;

public interface IUserBuilder
{
    /// <summary>
    /// Reset builder
    /// </summary>
    /// <returns></returns>
    public IUserBuilder Rest();

    /// <summary>
    /// Set username 
    /// </summary>
    /// <param name="userName"></param>
    /// <returns></returns>
    public IUserBuilder SetUserName(string userName);

    /// <summary>
    /// Set password
    /// </summary>
    /// <param name="password"></param>
    /// <returns></returns>
    public IUserBuilder SetPassword(string password);

    /// <summary>
    /// Build 
    /// </summary>
    /// <returns></returns>
    public User Build();
}
