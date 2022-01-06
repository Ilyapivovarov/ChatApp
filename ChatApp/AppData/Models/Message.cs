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
        /// Тело сообщения
        /// </summary>
        [Required]
        public string Body { get; set; } 

        /// <summary>
        /// Автор
        /// </summary>
        [Required]
        public User Author { get; set; }

        /// <summary>
        /// Индентификатор чата
        /// </summary>
        [Required]
        public int ChatId { get; set; } 
    }
}