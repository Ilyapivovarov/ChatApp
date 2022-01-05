using ChatApp.AppData.Models;

namespace ChatApp.AppData.ModelBuilders.Interfaces;

public interface IUserBuilder
{
    /// <summary>
    /// Обновить билдер 
    /// </summary>
    /// <returns></returns>
    public IUserBuilder Reset();

    /// <summary>
    /// Установить имя пользователя
    /// </summary>
    /// <param name="userName">Имя пользователя</param>
    /// <returns></returns>
    public IUserBuilder SetUserName(string userName);

    /// <summary>
    /// Установить пароль
    /// </summary>
    /// <param name="password">Пароль</param>
    /// <returns></returns>
    public IUserBuilder SetPassword(string password);

    /// <summary>
    /// Установить имя
    /// </summary>
    /// <param name="firstName">Имя</param>
    /// <returns></returns>
    public IUserBuilder SetFirstName(string firstName);
    
    /// <summary>
    /// Установить фамилию
    /// </summary>
    /// <param name="lastName">Фамилия</param>
    /// <returns></returns>
    public IUserBuilder SetLastName(string lastName);

    /// <summary>
    /// Установить список друзей 
    /// </summary>
    /// <param name="users">Список пользователя</param>
    /// <returns></returns>
    public IUserBuilder SetFriendList(params User[] users);

    /// <summary>
    /// Утановить роль для пользователя
    /// </summary>
    /// <param name="role">Роль пользователя</param>
    /// <returns></returns>
    public IUserBuilder SetUserRole(UserRole role);

    /// <summary>
    /// Установить статус для пользователя
    /// </summary>
    /// <param name="status">Статус пользователя</param>
    /// <returns></returns>
    public IUserBuilder SetUserStatus(UserStatus status);

    /// <summary>
    /// Собрать модель  
    /// </summary>
    /// <returns></returns>
    public User Build();
}
