using ChatApp.AppData.Models.Base;

namespace ChatApp.AppData.Models
{
    public class ChatMessage : DbModelBase
    {
        public string Message { get; set; }

        public virtual User Author { get; set; }
    }
}