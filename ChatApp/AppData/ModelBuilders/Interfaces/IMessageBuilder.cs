using ChatApp.AppData.Models;

namespace ChatApp.AppData.ModelBuilders.Interfaces;

public interface IMessageBuilder
{
    /// <summary>
    /// Reset builder
    /// </summary>
    /// <returns>New message builder</returns>
    public IMessageBuilder Reset();

    /// <summary>
    /// Sets author for message
    /// </summary>
    /// <param name="user">Author</param>
    /// <returns>Message builder</returns>
    public IMessageBuilder SetAuthor(User user);

    /// <summary>
    /// Set message body
    /// </summary>
    /// <param name="body">Message builder</param>
    /// <returns>Message builder</returns>
    public IMessageBuilder SetBody(string body);

    /// <summary>
    /// Build
    /// </summary>
    /// <returns>Message model</returns>
    public Message Build();
}