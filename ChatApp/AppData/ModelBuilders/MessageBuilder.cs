using ChatApp.AppData.ModelBuilders.Interfaces;
using ChatApp.AppData.Models;

namespace ChatApp.AppData.ModelBuilders;

public class MessageBuilder : IMessageBuilder
{
    private readonly Message _message;

    public MessageBuilder()
    {
        _message = new Message();
    }
    
    public IMessageBuilder Reset()
    {
        return new MessageBuilder();
    }

    public IMessageBuilder SetAuthor(User user)
    {
        _message.Author = user;
        return this;
    }

    public IMessageBuilder SetBody(string body)
    {
        _message.Body = body;
        return this;
    }

    public IMessageBuilder SetChatId(int id)
    {
        _message.ChatId = id;
        return this;
    }

    public Message Build()
    {
        return _message;
    }
}