using ChatApp.ChatAppServices.AuthService;
using ChatApp.ChatAppServices.Repositories;
using ChatApp.ChatAppServices.Repositories.Interfaces;
using ChatApp.Security.AuthModule;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.DependencyInjection;

namespace ChatApp.Extensions
{
    public static class ServiceCollectionExtensions
    {
        public static void UseJwt(this IServiceCollection services, AuthOptions authOpt)
        {
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    options.RequireHttpsMetadata = false;
                    options.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters
                    {
                        ValidateIssuer = true,
                        ValidIssuer = authOpt.Issuer,

                        ValidateAudience = true,
                        ValidAudience = authOpt.Audience,

                        ValidateLifetime = true,

                        IssuerSigningKey = authOpt.GetSymmetricSecurityKey(),
                        ValidateIssuerSigningKey = true
                    };
                });
        }

        public static void UseChatAppModules(this IServiceCollection service)
        {
            service.AddScoped<IAuthService, AuthService>();
        }
        
        public static void UseChatAppRepositories(this IServiceCollection service)
        {
            service.AddScoped<IUserRepository, UserRepository>();
            service.AddScoped<IChatMessageRepository, ChatMessageRepository>();
            service.AddScoped<IChatRoomRepository, ChatRoomRepository>();
        }
    }
}