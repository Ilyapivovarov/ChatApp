namespace ChatApp.AppData.Dto
{
    public record SignIn
    {
        public string UserName { get; set; }

        public string Password { get; set; }
    }
}