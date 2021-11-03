using System;
using ChatApp.AppData;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

namespace ChatApp.Services.Repositories.Base
{
    public class RepositoryBase
    {
        protected T LoadData<T>(Func<AppDbContext, T> loaFunc, string error)
        {
            try
            {
                var db = Services.Locator.GetRequiredService<AppDbContext>();
                return loaFunc(db);
            }
            catch(Exception)
            {
                Services.Logger.LogError(error);
                return default;
            }
        }

        public bool WriteData(Action<AppDbContext> writeAction, string error)
        {
            try
            {
                var db = Services.Locator.GetRequiredService<AppDbContext>();
                writeAction(db);
                db.SaveChanges();

                return true;
            }
            catch (Exception)
            {
                Services.Logger.LogError(error);
                return false;
            }
        }
    }
}