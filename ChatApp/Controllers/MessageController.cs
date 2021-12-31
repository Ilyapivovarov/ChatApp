using System.Threading.Tasks;
using ChatApp.AppData.Dto;
using ChatApp.ChatAppServices;
using ChatApp.ChatAppServices.Repositories.Interfaces;
using ChatApp.Controllers.Base;
using ChatApp.SignalRHubs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.DependencyInjection;

namespace ChatApp.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class MessageController : ChatAppControllerBase
{
    private readonly IHubContext<ChatHub, IChatClient> _chatHub;

    public MessageController(IHubContext<ChatHub, IChatClient> chatHub)
    {
        _chatHub = chatHub;
    }

    [HttpPost]
    [Route("send")]
    public async Task<ActionResult> SendMessage(MessageDto messageDto)
    {
        await _chatHub.Clients.All
            .ReceiveMessage(messageDto);

        await Services.Locator.GetRequiredService<IMessageRepository>()
            .TrySaveMessageAsync(messageDto);

        return Ok();
    }
}