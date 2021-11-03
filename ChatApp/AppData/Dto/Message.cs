namespace ChatApp.AppData.Dto
{
    public record Message
    {
        public Account Author { get; set; }
        
        public string MessageBody { get; set; }
    }
}