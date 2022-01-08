using System.Collections;
using System.Collections.Generic;
using System.Linq;
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
            .AddUsersInFriendsList(friend)
            .SetLastName("Admin")
            .SetUserRole(UserRole.Member)
            .SetUserStatus(UserStatus.Active)
            .Build();

        Assert.IsTrue(IsAnyNull(result));
    }
}