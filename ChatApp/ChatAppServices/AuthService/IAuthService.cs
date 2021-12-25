using ChatApp.AppData.Dto;
using ChatApp.ChatAppServices.Repositories.Models;

namespace ChatApp.ChatAppServices.AuthService
{
    public interface IAuthService
    {
        public bool TryAuthUser(SignInDto signIn, out string token);
    }
}