using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace ChatApp.SignalRHubs
{
    public class ChatHub : Hub
    {
        public async Task SendConnectionId(string connectionId)
        {
            await Clients.All.SendAsync("setClientMessage", "A connection with ID '" + connectionId + "' has just connected");
        }
    }
}