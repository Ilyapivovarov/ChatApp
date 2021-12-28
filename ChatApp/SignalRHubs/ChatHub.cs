using System.Threading.Tasks;
using ChatApp.AppData.Dto;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;

namespace ChatApp.SignalRHubs
{
    public interface IChatClient
    {
        Task ReceiveMessage(MessageDto message);
    }
    
    public class ChatHub : Hub<IChatClient>
    {
        public Task JoinRoom(string roomName)
        {
            return Groups.AddToGroupAsync(Context.ConnectionId, roomName);
        }

        public Task LeaveRoom(string roomName)
        {
            return Groups.RemoveFromGroupAsync(Context.ConnectionId, roomName);
        }
        
        public async Task Send(MessageDto message)
        {
            await Clients.All.ReceiveMessage(message);
        }
    }
}