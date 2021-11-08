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
                if (!db.Users.Any())
                {
                    var defaultUser = new User
                    {
                        Password = "admin",
                        UserName = "admin"
                    };

                    db.Users.Add(defaultUser);
                }

                if (!db.ChatRooms.Any())
                {
                    var room = new ChatRoom()
                    {
                        Admin = db.Users.First(x => x.Id == 1),
                    };

                    db.ChatRooms.Add(room);
                }
            }, "Error while initializing default data");
        }
    }
}