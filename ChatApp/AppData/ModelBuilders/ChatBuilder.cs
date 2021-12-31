using ChatApp.AppData.ModelBuilders.Interfaces;
using ChatApp.AppData.Models;

namespace ChatApp.AppData.ModelBuilders;

public class ChatBuilder : IChatBuilder
{
    private readonly Chat _chat;

    public ChatBuilder()
    {
        _chat = new Chat();
    }

    /// <summary>
    /// Reset builder
    /// </summary>
    /// <returns></returns>
    public IChatBuilder Reset()
    {
        return new ChatBuilder();
    }

  
    public IChatBuilder SetCreator(User user)
    {
        _chat.Creator = user;
        _chat.Admins.Add(user);
        _chat.Members.Add(user);
        
        return this;
    }

    /// <summary>
    /// Set chat name
    /// </summary>
    /// <param name="name"></param>
    /// <returns></returns>
    public IChatBuilder SetName(string name)
    {
        _chat.Name = name;

        return this;
    }

    /// <summary>
    /// Build class
    /// </summary>
    /// <returns></returns>
    public Chat Build()
    {
        return _chat;
    }
}