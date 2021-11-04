using System.Linq;
using ChatApp.AppData.Models;
using Microsoft.EntityFrameworkCore;

namespace ChatApp.AppData
{
    public sealed class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
            Database.Migrate();
        }

        public DbSet<ChatMessage> ChatMessages { get; set; }

        public DbSet<ChatRoom> ChatRooms { get; set; }

        public DbSet<User> Users { get; set; }
    }
}