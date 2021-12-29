using System.Collections.Generic;
using System.Linq;
using ChatApp.AppData.Models;
using ChatApp.ChatAppServices.Repositories.Interfaces;

namespace ChatApp.ChatAppServices.Repositories.Base
{
    public class DefaultDataRepository : RepositoryBase, IDefaultDataRepository
    {
        public bool InitDefaultDataAsync()
        {
            return WriteData(db =>
            {
                if (!db.Users.Any() && !db.Chats.Any())
                {
                    var defaultUser = new User
                    {
                        UserName = "admin",
                        Password = "admin"
                    };
                    db.Users.Add(defaultUser);
                    db.SaveChanges();
                    var chat = new Chat
                    {
                        Creator = defaultUser,
                    };

                    chat.Admins = new List<User>()
                    {
                        defaultUser
                    };
                    chat.Members = new List<User>()
                    {
                        defaultUser
                    };
                    db.Chats.Add(chat);
                }
            }, "Error while initializing default data");
        }
    }
}