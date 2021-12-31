using ChatApp.AppData.Models;

namespace ChatApp.AppData.ModelBuilders.Interfaces;

public interface IChatBuilder
{
    /// <summary>
    /// Reset builder
    /// </summary>
    /// <returns>Return new builder</returns>
    public IChatBuilder Reset();
    
    /// <summary>
    /// Sets creator for chat. And add creator to members and admins lists 
    /// </summary>
    /// <param name="user"></param>
    /// <returns></returns>
    public IChatBuilder SetCreator(User user);
    
    /// <summary>
    /// Set chat name
    /// </summary>
    /// <param name="name"></param>
    /// <returns></returns>
    public IChatBuilder SetName(string name);

    /// <summary>
    /// Build chat model
    /// </summary>
    /// <returns></returns>
    public Chat Build();
}