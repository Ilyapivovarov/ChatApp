using System.Collections.Generic;
using ChatApp.AppData.Dto;
using ChatApp.AppData.Models;
using ChatApp.ChatAppServices.AutoMapperService;
using Microsoft.Extensions.DependencyInjection;
using NUnit.Framework;

namespace ChatApp.Tests.MapperTests
{
    public class AutoMapperTests : ChatAppTestBase
    {
        [SetUp]
        public void Setup()
        {
            InitServices(services => { services.AddTransient<IMapperService, MapperService>(); });
        }

        [Test]
        public void UserMapAccount_Test()
        {
            var user = new User
            {
                Password = "admin",
                UserName = "admin"
            };

            var account = Services.GetRequiredService<IMapperService>().Map<User, Account>(user);

            Assert.True(account.Id == user.Id && account.UserName == user.UserName);
        }

        [Test]
        public void ChatRoomMapRoom_Test()
        {
            var admin = new User
            {
                Id = 1,
                Password = "admin",
                UserName = "admin"
            };
            var chatRoom = new ChatRoom
            {
                RoomAdmin = admin,
                Users = new List<User>
                {
                    new()
                    {
                        Id = 1,
                        Password = "guest1",
                        UserName = "guest1"
                    },
                    new()
                    {
                        Id = 2,
                        Password = "guest2",
                        UserName = "guest2"
                    },
                    new()
                    {
                        Id = 3,
                        Password = "guest2",
                        UserName = "guest2"
                    },
                },
                ChatMessages = new List<ChatMessage>
                {
                    new ChatMessage
                    {
                        Id = 1,
                        Message = "message",
                        Author = admin
                    }
                }
            };

            var room = Services.GetRequiredService<IMapperService>().Map<ChatRoom, Room>(chatRoom);
            
            Assert.True(room.RoomAdmin.UserName == chatRoom.RoomAdmin.UserName);
        }
    }
}