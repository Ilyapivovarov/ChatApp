using System.ComponentModel.DataAnnotations;
using ChatApp.AppData.Models.Base;

namespace ChatApp.AppData.Models
{
    public class Message : DbModelBase
    {
        public Message()
        {
            Body = string.Empty;
            Author = default!;
            ChatId = default!;
        }

        /// <summary>
        /// Message body
        /// </summary>
        [Required]
        public string Body { get; set; } 

        /// <summary>
        /// Message author
        /// </summary>
        [Required]
        public User Author { get; set; }

        /// <summary>
        /// Chat id
        /// </summary>
        [Required]
        public int ChatId { get; set; } 
    }
}