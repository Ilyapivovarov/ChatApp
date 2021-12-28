using System;
using ChatApp.ChatAppServices.Logger;
using Microsoft.Extensions.Logging;

namespace ChatApp.ChatAppServices
{
    public static class Services
    {
        static Services()
        {
            Logger = new DefaultLogger();
        }
        
        public static ILogger Logger { get; }

        public static IServiceProvider Locator { get; set; } = default!;
        
        public static string GetConnectionString(bool isDev)
        {
            const string devConStr = "Host=localhost;Port=5432;Database=ChatDbDev;Username=postgres;Password=sa";
            const string prodConStr = "Host=10.10.0.20;Port=5432;Database=ChatDbProd;Username=postgres;Password=sa";

            return isDev ? devConStr : prodConStr;
        }
    }
}