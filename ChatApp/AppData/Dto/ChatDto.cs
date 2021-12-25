using System.Collections.Generic;

namespace ChatApp.AppData.Dto 
{
    public record ChatDto
    {
        public ChatDto(int id, UserDto creator, List<UserDto> admins, List<MessageDto> messages, List<UserDto> members)
        {
            Id = id;
            Creator = creator;
            Admins = admins;
            Messages = messages;
            Members = members;
        }

        public int Id { get; set; }
        
        public UserDto Creator { get; set; }

        public List<UserDto> Admins { get; set; }

        public List<MessageDto> Messages { get; set; }
    
        public virtual List<UserDto> Members { get; set; }
    }
}