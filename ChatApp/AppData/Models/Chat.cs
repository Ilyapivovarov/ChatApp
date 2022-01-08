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
        Creator = default!;
        Admins = new List<User>();
        Messages = new List<Message>();
        Members = new List<User>();
        Name = string.Empty;
        Type = default!;
        Guid = Guid.Empty;
    }
    
    [Required]
    public Guid Guid { get; set; }
    
    [ForeignKey("CreatorId")]
    [Required]
    public User Creator { get; set; }
    
    [ForeignKey("AdminId")]
    [Required]
    public List<User> Admins { get; set; }
    
    [Required]
    public List<Message> Messages { get; set; }
    
    [ForeignKey("MemberId")]
    [Required]
    public List<User> Members { get; set; }

    [Required] 
    public string Name { get; set; }
    
    [Required]
    public ChatType Type { get; set; }
}