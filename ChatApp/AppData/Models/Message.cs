using ChatApp.AppData.Models.Base;
#pragma warning disable CS8618

namespace ChatApp.AppData.Models
{
    public class Message : DbModelBase
    {
        public string Body { get; set; } 

        public virtual User Author { get; set; }

        public int ChatId { get; set; } 
    }
}