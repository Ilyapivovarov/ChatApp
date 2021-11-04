using ChatApp.AppData.Dto;

namespace ChatApp.ChatAppServices.AuthService
{
    public interface IAuthService
    {
        public bool TryAuthUser(SignIn signIn, out string token);
    }
}