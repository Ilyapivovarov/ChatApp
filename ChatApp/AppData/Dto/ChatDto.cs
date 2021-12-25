using System.Collections.Generic;

namespace ChatApp.AppData.Dto;

public record ChatDto(int Id, UserDto Creator, List<UserDto> Admins, List<MessageDto> Messages,
    List<UserDto> Members);