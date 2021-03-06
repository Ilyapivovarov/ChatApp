using System;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using ChatApp.AppData.Dto;
using ChatApp.AppData.ModelBuilders.Interfaces;
using ChatApp.AppData.Models;
using ChatApp.ChatAppServices.Repositories.Base;
using ChatApp.ChatAppServices.Repositories.Interfaces;
using Microsoft.Extensions.DependencyInjection;

namespace ChatApp.ChatAppServices.Repositories
{
    public class ChatRepository : RepositoryBase, IChatRepository
    {
        public async Task<Chat?> GetChatById(int id)
        {
            return await Task.Run(() =>
            {
                return LoadData(db => db.Chats.FirstOrDefault(x => x.Id == id),
                    $"Error while founding chatroom with id {id}");
            });
        }

        public async Task<bool> TryCreateChatAsync(User creator)
        {
            return await Task.Run(() =>
            {
                var chatRoom = new Chat()
                {
                    CreatorId = creator.Id
                };

                return WriteData(db => db.Chats.Add(chatRoom),
                    "Error while creating chat room");
            });
        }
        public async Task<bool> TryAddUserInChatAsync(Chat chat, int userId)
        {
            return await Task.Run(() =>
            {
                return WriteData(db =>
                {
                    var user = db.Users.FirstOrDefault(x => x.Id == userId);
                    if (user != null)
                    {
                        chat.IdMembers.Add(user.Id);
                        db.Update(chat);
                    }
                }, "Error while adding user in chat room");
            });
        }

        public async Task<Chat[]?> GetChatsThatHasUser(User user, int chatId = 0)
        {
            return await Task.Run(() =>
            {
                return LoadData(db =>
                {
                    var query = db.Chats.Where(chat => chat.IdMembers
                            .Contains(user.Id) || chat.IdAdmins.Contains(user.Id)
                                            || chat.CreatorId == user.Id);

                    if (chatId != 0)
                        query = query.Where(x => x.Id == chatId);

                    return query.ToArray();
                }, $"Error while getting room that has user with id {user.Id}");
            });
        }

        public async Task<Chat?> CreateAndReturnNewChatAsync(User creator, params User[] users)
        {
            return await Task.Run(() =>
            {
                return WriteAndReturnData(db =>
                {
                    var chatBuilder = Services.Locator.GetRequiredService<IChatBuilder>();

                    var chat = chatBuilder.SetCreator(creator)
                        .SetName("??????")
                        .SetType(ChatType.Dialog)
                        .AddMembers(users)
                        .SetGuid(Guid.NewGuid())
                        .Build();

                    db.Chats.Add(chat);
                    return chat;
                }, "Error while creating chat");
            });
        }

        public async Task<Chat?> GetChatByExistingMembers(params User[] members)
        {
            return await Task.Run(
                () =>
                {
                    return LoadData(db => db.Chats
                            .ToList()
                            .FirstOrDefault(chat => chat.IdMembers
                            .SequenceEqual(members.Select(user => user.Id)
                                .OrderBy(x => x))),
                        "Error while searching chat");
                });
        }

        public async Task<Chat?> GetChatByGuidAsync(Guid? guid)
        {
            return await Task.Run(() =>
            {
                return LoadData(db => db.Chats.FirstOrDefault(x => x.Guid == guid),
                    $"Error while searching chat by guid {guid}");
            });
        }
    }
}