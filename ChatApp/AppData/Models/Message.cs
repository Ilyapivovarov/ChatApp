using System.ComponentModel.DataAnnotations;
using ChatApp.AppData.Models.Base;
#pragma warning disable CS8618

namespace ChatApp.AppData.Models
{
    public class Message : DbModelBase
    {
        [Required]
        public string Body { get; set; } 

        [Required]
        public User Author { get; set; }

        [Required]
        public int ChatId { get; set; } 
    }
}