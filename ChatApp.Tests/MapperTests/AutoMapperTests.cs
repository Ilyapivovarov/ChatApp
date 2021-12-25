using System.Collections.Generic;
using ChatApp.AppData.Dto;
using ChatApp.AppData.Models;
using ChatApp.ChatAppServices.MapperService;
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

            var account = Services.GetRequiredService<IMapperService>().Map<User, UserDto>(user);

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
            var chatRoom = new Room
            {
                Admin = admin,
                Members = new List<User>
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
                Messages = new List<Message>
                {
                    new Message
                    {
                        Id = 1,
                        Body = "message",
                        Author = admin
                    }
                }
            };

            var room = Services.GetRequiredService<IMapperService>().Map<Room, RoomDto>(chatRoom);
            
            Assert.True(room.Admin.UserName == chatRoom.Admin.UserName);
        }
    }
}