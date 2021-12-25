namespace ChatApp.AppData.Dto
{
    public record SignInDto
    {
        public string UserName { get; set; }

        public string Password { get; set; }
    }
}