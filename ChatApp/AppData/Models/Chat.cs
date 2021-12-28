using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using ChatApp.AppData.Models.Base;
#pragma warning disable CS8618

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

    [Required] 
    public string Name => string.Join(", ", Members.Select(x => x.UserName));
}