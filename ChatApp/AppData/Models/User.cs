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
            UserName = default!;
            Password = default!;
            Friends = new List<User>();
            FirstName = default!;
            LastName = default!;
            Status = default!;
            Role = default!;
        }

        /// <summary>
        /// Имя пользователя
        /// </summary>
        [Required]
        public string UserName { get; set; }

        /// <summary>
        /// Пароль
        /// </summary>
        [Required]
        public string Password { get; set; }
        
        /// <summary>
        /// Список друзей 
        /// </summary>
        [Required]
        [ForeignKey("FriendId")]
        public List<User> Friends { get; set; }
        
        /// <summary>
        /// Имя
        /// </summary>
        [Required]
        public string FirstName { get; set; }
        
        /// <summary>
        /// Фамилия 
        /// </summary>
        [Required]
        public string LastName { get; set; }
        
        /// <summary>
        /// Роль
        /// </summary>
        [Required]
        public UserRole Role { get; set; }
        
        /// <summary>
        /// Статус
        /// </summary>
        public UserStatus Status { get; set; }
    }
}