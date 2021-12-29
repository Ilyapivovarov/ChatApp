using System.Collections.Generic;
using System.Linq;
using ChatApp.AppData.ModelBuilders.Interfaces;
using ChatApp.AppData.Models;
using ChatApp.ChatAppServices;
using Microsoft.Extensions.Logging;

namespace ChatApp.AppData.ModelBuilders;

public class ChatBuilder : IChatBuilder
{
    private readonly Chat _chat;

    public ChatBuilder()
    {
        _chat = new Chat();
    }

    public IChatBuilder Reset()
    {
        return new ChatBuilder();
    }

    /// <summary>
    /// Sets creator for chat. And add creator to members and admins lists 
    /// </summary>
    /// <param name="user"></param>
    /// <returns></returns>
    public IChatBuilder SetCreator(User user)
    {
        _chat.Creator = user;
        _chat.Admins.Add(user);
        _chat.Members.Add(user);
        
        return this;
    }

    public IChatBuilder SetName(string name)
    {
        _chat.Name = name;

        return this;
    }

    public Chat Build()
    {
        return _chat;
    }
}