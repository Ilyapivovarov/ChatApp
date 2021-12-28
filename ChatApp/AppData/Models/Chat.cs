using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using ChatApp.AppData.Models.Base;

namespace ChatApp.AppData.Models;

public sealed class Chat : DbModelBase
{
    public Chat()
    {
        Admins = new List<User>();
        Messages = new List<Message>();
        Members = new List<User>();
    }
    
    [ForeignKey("CreatorId")]
    public User Creator { get; set; }
    
    [ForeignKey("AdminId")]
    public List<User> Admins { get; set; }
    
    public List<Message> Messages { get; set; }
    
    [ForeignKey("MemberId")]
    public List<User> Members { get; set; }

    [Required] 
    public string Name => string.Join(", ", Members.Select(x => x.UserName));
}