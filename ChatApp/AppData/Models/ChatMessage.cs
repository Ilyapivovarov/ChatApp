using System.Collections.Generic;
using ChatApp.AppData.Models.Base;

namespace ChatApp.AppData.Models
{
    public class ChatMessage : DbModelBase
    {
        public string Message { get; set; }

        public User Author { get; set; }
    }
}