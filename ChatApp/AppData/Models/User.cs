using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using ChatApp.AppData.Models.Base;

namespace ChatApp.AppData.Models
{
    public class User : DbModelBase
    {
        public User()
        {
            UserName = string.Empty;
            Password = string.Empty;
            Friends = new List<User>();
            FirstName = string.Empty;
            LastName = string.Empty;
        }

        [Required]
        public string UserName { get; set; }

        [Required]
        public string Password { get; set; }
        
        [Required]
        [ForeignKey("FriendId")]
        public List<User> Friends { get; set; }
        
        [Required]
        public string FirstName { get; set; }
        
        [Required]
        public string LastName { get; set; }
    }
}