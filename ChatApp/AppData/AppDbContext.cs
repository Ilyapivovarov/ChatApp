using ChatApp.AppData.Models;
using Microsoft.EntityFrameworkCore;
#pragma warning disable CS8618

namespace ChatApp.AppData
{
    public sealed class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
            Database.Migrate();
        }
        
        public DbSet<Message> Messages { get; set; } 

        public DbSet<Chat> Chats { get; set; }
        
        public DbSet<User> Users { get; set; }
    }
}