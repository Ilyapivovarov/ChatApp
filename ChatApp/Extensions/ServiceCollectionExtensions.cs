using ChatApp.ChatAppServices.AuthService;
using ChatApp.ChatAppServices.MapperService;
using ChatApp.ChatAppServices.Repositories;
using ChatApp.ChatAppServices.Repositories.Base;
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
            service.AddTransient<IAuthService, AuthService>();
        }
        
        public static void UseChatAppRepositories(this IServiceCollection service)
        {
            service.AddTransient<IUserRepository, UserRepository>();
            service.AddTransient<IMessageRepository, MessageRepository>();
            service.AddTransient<IChatRepository, ChatRepository>();
            service.AddTransient<IDefaultDataRepository, DefaultDataRepository>();
        }
        
        public static void UseChatAppServices(this IServiceCollection service)
        {
            service.AddTransient<IMapperService, MapperService>();
        }
    }
}