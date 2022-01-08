using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using ChatApp.AppData.Models.Base;

namespace ChatApp.AppData.Models;

public class Chat : DbModelBase
{
    public Chat()
    {
        CreatorId = default!;
        IdAdmins = new List<int>();
        Messages = new List<Message>();
        IdMembers = new List<int>();
        Name = string.Empty;
        Type = default!;
        Guid = Guid.Empty;
    }
    
    [Required]
    public Guid Guid { get; set; }
    
    [ForeignKey("CreatorId")]
    public int CreatorId { get; set; }
    
    [ForeignKey("AdminId")]
    public List<int> IdAdmins { get; set; }
    
    [Required]
    public List<Message> Messages { get; set; }
    
    [ForeignKey("MemberId")]
    public List<int> IdMembers { get; set; }
    
    public string Name { get; set; }
    
    public ChatType Type { get; set; }
}