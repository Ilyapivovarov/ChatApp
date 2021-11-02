using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using ChatApp.AppData.Models.Base;

namespace ChatApp.AppData.Models
{
    public class ChatRoom : DbModelBase
    {
        [Required]
        public List<User> Users { get; set; } = new List<User>();
        
        [Required]
        public List<ChatMessage> ChatMessages { get; set; } = new List<ChatMessage>();
    }
}