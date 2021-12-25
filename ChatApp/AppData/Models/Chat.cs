using System.Collections.Generic;
using ChatApp.AppData.Models.Base;

namespace ChatApp.AppData.Models;

public class Chat : DbModelBase
{
    public User Creator { get; set; }

    public List<User> Admins { get; set; }

    public List<Message> Messages { get; set; }
    
    public virtual List<User> Users { get; set; }
}