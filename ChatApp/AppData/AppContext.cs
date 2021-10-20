using ChatApp.AppData.Models;
using Microsoft.EntityFrameworkCore;

namespace ChatApp.AppData
{
    public class AppContext : DbContext
    {
        public AppContext(DbContextOptions<AppContext> options) 
            : base(options)
        { }
    }
}