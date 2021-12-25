using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using ChatApp.AppData.Models.Base;

namespace ChatApp.AppData.Models;

public class Chat : DbModelBase
{
    [ForeignKey("CreatorId")]
    public virtual User Creator { get; set; }
    
    [ForeignKey("AdminId")]
    public virtual List<User> Admins { get; set; }
    
    public virtual List<Message> Messages { get; set; }
    
    [ForeignKey("MemberId")]
    public virtual List<User> Members { get; set; }
}