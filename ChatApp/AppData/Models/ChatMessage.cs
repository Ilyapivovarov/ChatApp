using System;
using System.ComponentModel.DataAnnotations;

namespace ChatApp.AppData.Models
{
    public class ChatMessage
    {
        public Guid Id => Guid.NewGuid(); 
        
        public string Message { get; set; }

        public string Author { get; set; }
    }
}