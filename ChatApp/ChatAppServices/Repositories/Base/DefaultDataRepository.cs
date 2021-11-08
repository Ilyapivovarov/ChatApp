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
                if (!db.Users.Any() && !db.ChatRooms.Any())
                {
                    var defaultUser = new User
                    {
                        Password = "admin",
                        UserName = "admin"
                    };

                    db.Users.Add(defaultUser);
                    
                    var room = new ChatRoom()
                    {
                        Admin = defaultUser
                    };

                    db.ChatRooms.Add(room);
                }
            }, "Error while initializing default data");
        }
    }
}