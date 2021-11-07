using System.Collections.Generic;

namespace ChatApp.AppData.Dto 
{
    public record Room
    {
        public int Id { get; set; }
        
        public Account Admin { get; set; }
        
        public List<Account> Members { get; set; }
        
        public List<Message> Messages { get; set; }
    }
}