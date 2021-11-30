using ChatApp.AppData.Dto;
using ChatApp.ChatAppServices.Repositories.Models;

namespace ChatApp.ChatAppServices.AuthService
{
    public interface IAuthService
    {
        public bool TryAuthUser(SignIn signIn, out string token);
    }
}