using System;
using ChatApp.AppData;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

namespace ChatApp.ChatAppServices.Repositories.Base
{
    public class RepositoryBase
    {
        protected T LoadData<T>(Func<AppDbContext, T> loaFunc, string error)
        {
            try
            {
                var db = ChatAppServices.Services.Locator.GetRequiredService<AppDbContext>();
                return loaFunc(db);
            }
            catch(Exception)
            {
                ChatAppServices.Services.Logger.LogError(error);
                return default;
            }
        }

        public bool WriteData(Action<AppDbContext> writeAction, string error)
        {
            try
            {
                var db = ChatAppServices.Services.Locator.GetRequiredService<AppDbContext>();
                writeAction(db);
                db.SaveChanges();

                return true;
            }
            catch (Exception)
            {
                ChatAppServices.Services.Logger.LogError(error);
                return false;
            }
        }
    }
}