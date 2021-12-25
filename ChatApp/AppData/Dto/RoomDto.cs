using System.Collections.Generic;

namespace ChatApp.AppData.Dto 
{
    public record RoomDto
    {
        public int Id { get; set; }
        
        public UserDto Admin { get; set; }
        
        public List<UserDto> Members { get; set; }
        
        public List<MessageDto> Messages { get; set; }
    }
}