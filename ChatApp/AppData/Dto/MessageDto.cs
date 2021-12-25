namespace ChatApp.AppData.Dto
{
    public record MessageDto(int Id, UserDto Author, string Body, int ChatId);
}