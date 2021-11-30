using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using ChatApp.AppData.Dto;
using ChatApp.AppData.Models;
using ChatApp.ChatAppServices.Repositories.Interfaces;
using ChatApp.ChatAppServices.Repositories.Models;
using ChatApp.Common.CustomClaims;
using ChatApp.Security.AuthModule;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace ChatApp.ChatAppServices.AuthService
{
    public class AuthService : IAuthService
    {
        public bool TryAuthUser(SignIn signIn, out string token)
        {
            var queryResult = Services.Locator.GetRequiredService<IUserRepository>()
                .SignInUser(signIn);
            if (queryResult.HasValue)
            {
                token = GenerateJwt(queryResult.Value);
                return true;
            }
            
            token = default;
            return false;
        }
        
        private string GenerateJwt(User user)
        {
            var authOpt = Services.Locator.GetRequiredService< IOptionsSnapshot<AuthOptions>>();
            var authParams = authOpt.Value;

            var securityKey = authParams.GetSymmetricSecurityKey();
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new List<Claim>
            {
                new(CustomClaimTypes.UserName, user.UserName),
                new(CustomClaimTypes.Id, user.Id.ToString()),
            };

            var token = new JwtSecurityToken(
                authParams.Issuer,
                authParams.Audience,
                claims,
                expires: DateTime.Now.AddSeconds(authParams.TokenLifetime),
                signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}