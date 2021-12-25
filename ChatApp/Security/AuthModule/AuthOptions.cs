using System;
using System.Text;
using Microsoft.IdentityModel.Tokens;

namespace ChatApp.Security.AuthModule
{
    public class AuthOptions
    {
        public string? Issuer { get; set; }

        public string? Audience { get; set; } 

        public string? Secret { get; set; } 

        public int TokenLifetime { get; set; }

        public  SymmetricSecurityKey GetSymmetricSecurityKey()
        {
            if (Secret == null)
                throw new ArgumentException($"{nameof(Secret)} is null");
            
            return new SymmetricSecurityKey(Encoding.ASCII.GetBytes(Secret));
        }
    }
}