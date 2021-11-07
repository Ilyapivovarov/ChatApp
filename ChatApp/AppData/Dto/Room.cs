using System.Collections.Generic;

namespace ChatApp.AppData.Dto 
{
    public record Room
    {
        public Account RoomAdmin { get; set; }
        
        public List<Account> Users { get; set; }
        
        public List<Message> ChatMessages { get; set; }
    }
}