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
        
        /// <summary>
        /// Логгер
        /// </summary>
        public static ILogger Logger { get; set; }

        /// <summary>
        /// Локатор сервисов
        /// </summary>
        public static IServiceProvider Locator { get; set; } = default!;

        /// <summary>
        /// Изменить логгер поумолчанию 
        /// </summary>
        /// <param name="logger">Логгер</param>
        public static void SetLogger(ILogger<Program> logger)
        {
            Logger = logger;
        }
        
        /// <summary>
        /// Получить строку подключения к БД
        /// </summary>
        /// <param name="isDev">Тип окружения</param>
        /// <returns>Строка подключения</returns>
        public static string GetConnectionString(bool isDev)
        {
            const string devConStr = "Host=localhost;Port=5432;Database=ChatDbDev;Username=postgres;Password=sa";
            const string prodConStr = "Host=10.10.0.20;Port=5432;Database=ChatDbProd;Username=postgres;Password=sa";

            return isDev ? devConStr : prodConStr;
        }
    }
}