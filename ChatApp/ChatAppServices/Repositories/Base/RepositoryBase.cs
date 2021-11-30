using System;
using ChatApp.AppData;
using ChatApp.ChatAppServices.Repositories.Models;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

namespace ChatApp.ChatAppServices.Repositories.Base
{
    public class RepositoryBase
    {
        protected QueryResult<T> LoadData<T>(Func<AppDbContext, T> loaFunc, string error)
        {
            try
            {
                var db = Services.Locator.GetRequiredService<AppDbContext>();
                
                return new QueryResult<T>(loaFunc(db));
            }
            catch(Exception e)
            {
                Services.Logger.LogError(error, e.Message);
                return new QueryResult<T>(error);
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
        
        protected QueryResult<T> WriteAndReturnData<T>(Func<AppDbContext, T> writeAction, string error)
        {
            try
            {
                var db = Services.Locator.GetRequiredService<AppDbContext>();
                var data = writeAction(db);
                db.SaveChanges();

                return new QueryResult<T>(data);
            }
            catch (Exception e)
            {
                Services.Logger.LogError(e, error);
                return new QueryResult<T>(error);
            }
        }
    }
}