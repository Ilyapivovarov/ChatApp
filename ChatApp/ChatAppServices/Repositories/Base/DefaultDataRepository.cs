using System.Linq;
using System.Threading.Tasks;
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
                    
                    var chat = new Chat()
                    {
                        Creator = defaultUser,
                    };

                    chat.Admins.Add(defaultUser);

                    db.Chats.Add(chat);
                }
            }, "Error while initializing default data");
        }
    }
}