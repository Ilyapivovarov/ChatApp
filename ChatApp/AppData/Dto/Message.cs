namespace ChatApp.AppData.Dto
{
    public record Message
    {
        public int AuthorId { get; set; }
        
        public string MessageBody { get; set; }
    }
}