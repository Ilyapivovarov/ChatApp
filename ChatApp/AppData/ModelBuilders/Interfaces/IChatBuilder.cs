using System;
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
    /// <param name="user">Chat creator</param>
    /// <returns>Chat builder</returns>
    public IChatBuilder SetCreator(User user);
    
    /// <summary>
    /// Set chat name
    /// </summary>
    /// <param name="name">Chat name</param>
    /// <returns>Chat builder</returns>
    public IChatBuilder SetName(string name);

    /// <summary>
    /// Add members
    /// </summary>
    /// <param name="users">Chat members</param>
    /// <returns>Chat builder</returns>
    public IChatBuilder AddMembers(params User[] users);

    /// <summary>
    /// Set chat type
    /// </summary>
    /// <param name="type">Chat type</param>
    /// <returns>Chat builder</returns>
    public IChatBuilder SetType(ChatType type);

    /// <summary>
    /// Set guid
    /// </summary>
    /// <param name="guid">Guid</param>
    /// <returns>Chat builder</returns>
    public IChatBuilder SetGuid(Guid guid);

    /// <summary>
    /// Build chat model
    /// </summary>
    /// <returns>Chat builder</returns>
    public Chat Build();
}