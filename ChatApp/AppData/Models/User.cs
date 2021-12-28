using System.ComponentModel.DataAnnotations;
using ChatApp.AppData.Models.Base;
#pragma warning disable CS8618

namespace ChatApp.AppData.Models
{
    public class User : DbModelBase
    {
        [Required]
        public string UserName { get; set; }

        [Required]
        public string Password { get; set; }
    }
}