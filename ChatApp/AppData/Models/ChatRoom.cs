using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using ChatApp.AppData.Models.Base;

namespace ChatApp.AppData.Models
{
    public class ChatRoom : DbModelBase
    {
        [Required]
        public User Admin { get; set; }
        
        public virtual  List<User> Members { get; set; } = new();
        
        public virtual  List<ChatMessage> Messages { get; set; } = new();
    }
}