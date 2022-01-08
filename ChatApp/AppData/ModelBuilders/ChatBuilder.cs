using System;
using System.Linq;
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
    
    public IChatBuilder SetName(string name)
    {
        _chat.Name = name;

        return this;
    }

    public IChatBuilder AddMembers(params User[] users)
    {
        _chat.Members = _chat.Members.Union(users).ToList();
        return this;
    }

    public IChatBuilder SetType(ChatType type)
    {
        _chat.Type = type;
        return this;
    }

    public IChatBuilder SetGuid(Guid guid)
    {
        _chat.Guid = guid;
        return this;
    }

    public Chat Build()
    {
        return _chat;
    }
}