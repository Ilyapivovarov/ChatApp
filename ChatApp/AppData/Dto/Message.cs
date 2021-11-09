namespace ChatApp.AppData.Dto
{
    public record Message
    {
        public int Id { get; set; }
        
        public Account Author { get; set; }
        
        public string Body { get; set; }
    }
}