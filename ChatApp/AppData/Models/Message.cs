using ChatApp.AppData.Models.Base;

namespace ChatApp.AppData.Models
{
    public class Message : DbModelBase
    {
        public string Body { get; set; } = default!;

        public virtual User Author { get; set; } = default!;

        public int ChatId { get; set; } = default!;
    }
}