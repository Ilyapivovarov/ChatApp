using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using ChatApp.AppData.Models.Base;

namespace ChatApp.AppData.Models
{
    public class ChatRoom : DbModelBase
    {
        [Required]
        public User RoomAdmin { get; set; }
        
        public List<User> Users { get; set; } = new();
        
        public List<ChatMessage> ChatMessages { get; set; } = new();
    }
}