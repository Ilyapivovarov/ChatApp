using System.ComponentModel.DataAnnotations;

namespace ChatApp.AppData.Dto
{
    public record SignUpDto(string UserName, string Password, string ConfirmPassword);
}