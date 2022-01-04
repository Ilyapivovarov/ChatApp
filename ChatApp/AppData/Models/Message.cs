using System;
using System.ComponentModel.DataAnnotations;
using ChatApp.AppData.Models.Base;

namespace ChatApp.AppData.Models
{
    public class Message : DbModelBase
    {
        public Message()
        {
            Body = string.Empty;
            Author = new User();
            ChatId = default;
        }

        [Required]
        public string Body { get; set; } 

        [Required]
        public User Author { get; set; }

        [Required]
        public int ChatId { get; set; } 
    }
}