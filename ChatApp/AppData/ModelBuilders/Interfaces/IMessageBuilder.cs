using ChatApp.AppData.Models;

namespace ChatApp.AppData.ModelBuilders.Interfaces;

public interface IMessageBuilder
{
    /// <summary>
    /// Reset builder
    /// </summary>
    /// <returns></returns>
    public IMessageBuilder Reset();

    /// <summary>
    /// Sets author for message
    /// </summary>
    /// <param name="user"></param>
    /// <returns></returns>
    public IMessageBuilder SetAuthor(User user);

    /// <summary>
    /// Set message body
    /// </summary>
    /// <param name="body"></param>
    /// <returns></returns>
    public IMessageBuilder SetBody(string body);

    /// <summary>
    /// Sets chat id
    /// </summary>
    /// <param name="id"></param>
    /// <returns></returns>
    public IMessageBuilder SetChatId(int id);

    /// <summary>
    /// Build
    /// </summary>
    /// <returns></returns>
    public Message Build();
}