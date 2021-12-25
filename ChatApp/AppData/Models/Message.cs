using ChatApp.AppData.Models.Base;

namespace ChatApp.AppData.Models
{
    public class Message : DbModelBase
    {
        public string Body { get; set; } 

        public virtual User Author { get; set; }

        public int ChatId { get; set; } 
    }
}