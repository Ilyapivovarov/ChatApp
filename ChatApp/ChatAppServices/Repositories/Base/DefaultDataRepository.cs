using System.Collections.Generic;
using System.Linq;
using ChatApp.AppData.ModelBuilders.Interfaces;
using ChatApp.AppData.Models;
using ChatApp.ChatAppServices.Repositories.Interfaces;
using Microsoft.Extensions.DependencyInjection;

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
                    var userBuilder = Services.Locator.GetRequiredService<IUserBuilder>();

                    var adminUser = userBuilder.SetUserName("admin")
                        .SetPassword("admin")
                        .SetFirstName("Admin")
                        .SetLastName("Admin")
                        .SetUserRole(UserRole.Admin)
                        .SetUserStatus(UserStatus.Active)
                        .Build();

                    var simpleUser = userBuilder
                        .Reset()
                        .SetUserName("ilya_pivovarov")
                        .SetPassword("pivo")
                        .SetFirstName("Ilya")
                        .SetLastName("Pivovarov")
                        .SetUserRole(UserRole.Member)
                        .SetUserStatus(UserStatus.Active)
                        .Build();
                    
                    db.Users.AddRange(adminUser, simpleUser);
                }
            }, "Error while initializing default data");
        }
    }
}