using ChatApp.AppData.Dto;

namespace ChatApp.ChatAppServices.AuthService
{
    public interface IAuthService
    {
        public bool TryAuthUser(SignInDto signIn, out string? token);
    }
}