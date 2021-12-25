using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using ChatApp.AppData.Dto;
using ChatApp.AppData.Models;
using Microsoft.AspNetCore.SignalR;

namespace ChatApp.SignalRHubs
{
    public interface IChatClient
    {
        Task ReceiveMessage(MessageDto message);
    }

    
    public class ChatHub : Hub<IChatClient>
    {
        public async Task Send(MessageDto message)
        {
            await Clients.All.ReceiveMessage(message);
        }
    }
}