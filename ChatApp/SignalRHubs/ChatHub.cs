using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using ChatApp.AppData.Models;
using Microsoft.AspNetCore.SignalR;

namespace ChatApp.SignalRHubs
{
    public interface IChatClient
    {
        Task ReceiveMessage(ChatMessage message);
    }

    
    public class ChatHub : Hub<IChatClient>
    {
        public async Task Send(ChatMessage message)
        {
            
            await Clients.All.ReceiveMessage(message);
        }
    }
}