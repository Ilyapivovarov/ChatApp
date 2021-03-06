using System;
using ChatApp.AppData;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

namespace ChatApp.ChatAppServices.Repositories.Base
{
    public class RepositoryBase
    {
        protected T? LoadData<T>(Func<AppDbContext, T?> loaFunc, string error)
        {
            try
            {
                var db = Services.Locator.GetRequiredService<AppDbContext>();
                return loaFunc(db);
            }
            catch(Exception e)
            {
                Services.Logger.LogError(error, e.Message);
                return default;
            }
        }

        protected bool WriteData(Action<AppDbContext> writeAction, string error)
        {
            try
            {
                var db = Services.Locator.GetRequiredService<AppDbContext>();
                writeAction(db);
                db.SaveChanges();

                return true;
            }
            catch (Exception e)
            {
                Services.Logger.LogError(error, e.Message);
                return false;
            }
        }
        
        protected T? WriteAndReturnData<T>(Func<AppDbContext, T> writeAction, string error)
        {
            try
            {
                var db = Services.Locator.GetRequiredService<AppDbContext>();
                var data = writeAction(db);
                db.SaveChanges();

                return data;
            }
            catch (Exception e)
            {
                Services.Logger.LogError(error, e.Message);
                return default;
            }
        }
    }
}