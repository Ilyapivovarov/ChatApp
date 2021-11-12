using System.ComponentModel.DataAnnotations;

namespace ChatApp.AppData.Dto
{
    public record SignUp
    {
        [Required]
        public string UserName { get; set; }

        [Required]
        public string Password { get; set; }
        
        [Required]
        public string ConfirmPassword { get; set; }
    }
}