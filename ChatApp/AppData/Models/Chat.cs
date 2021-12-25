using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using ChatApp.AppData.Models.Base;

namespace ChatApp.AppData.Models;

public class Chat : DbModelBase
{
    public virtual User Creator { get; set; } = default!;

    [ForeignKey("AdminId")]
    public virtual List<User> Admins { get; set; } = default!;

    [ForeignKey("MessageId")]
    public virtual List<Message> Messages { get; set; } =  default!;
    
    public virtual List<User> Members { get; set; } =  default!;
}