using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using ChatApp.AppData.Models.Base;

namespace ChatApp.AppData.Models
{
    public class User : DbModelBase
    {
        [Required]
        public string UserName { get; set; }
        
        [Required]
        public string Password { get; set; }
        
        public List<ChatRoom> ChatRooms { get; set; } = new();
    }
}