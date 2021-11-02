namespace ChatApp.Services
{
    public static class ServicesLocator
    {
        public static string GetConnectionString(bool isDev)
        {
            const string devConStr = "Host=localhost;Port=5432;Database=chat-app-dev;Username=postgres;Password=sa";
            const string prodConStr = "Host=172.18.0.2;Port=5432;Database=chat-app-prod;Username=postgres;Password=sa";

            return isDev ? devConStr : prodConStr;
        }
    }
}