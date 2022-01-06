using ChatApp.AppData.ModelBuilders;
using ChatApp.AppData.ModelBuilders.Interfaces;
using ChatApp.AppData.Models;
using Microsoft.Extensions.DependencyInjection;
using NUnit.Framework;

namespace ChatApp.Tests.ModelBuilderTests;

public class UserBuilderTests : ChatAppTestBase
{
    [SetUp]
    public void SetUp()
    {
        InitServices(services => { services.AddTransient<IUserBuilder, UserBuilder>(); });
    }

    [Test]
    public void CheckUserModelProperty_Test()
    {
        var builder = Services.GetRequiredService<IUserBuilder>();
        var friend = new User
        {
            UserName = "friend",
            Password = "friend",
            FirstName = "Fred",
            LastName = "Smith"
        };
        var result = builder.SetPassword("sad")
            .SetUserName("sda")
            .SetFirstName("Admin")
            .SetFriendList(friend)
            .SetLastName("Admin")
            .Build();

        Assert.True(CheckProperty(result));
    }

    private static bool CheckProperty(User user)
    {
        foreach (var property in user.GetType().GetProperties())
        {
            var value = property.GetValue(user);
            if (value == default || string.IsNullOrWhiteSpace(value.ToString()))
                return false;
        }

        return true;
    }
}