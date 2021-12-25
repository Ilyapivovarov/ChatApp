namespace ChatApp.AppData.Dto
{
    public record MessageDto
    {
        public int Id { get; set; }
        
        public UserDto Author { get; set; }
        
        public string Body { get; set; }
    }
}