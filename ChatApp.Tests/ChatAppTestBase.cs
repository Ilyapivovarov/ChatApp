using System;
using System.Linq;
using ChatApp.AppData.Models;
using Microsoft.Extensions.DependencyInjection;

namespace ChatApp.Tests
{
    public class ChatAppTestBase
    {
        protected IServiceProvider Services { get; private set; }

        protected void InitServices(Action<IServiceCollection> serviceInit)
        {
            var serviceCollection = new ServiceCollection();
            serviceInit(serviceCollection);
            Services = serviceCollection.BuildServiceProvider();
        }
        
        protected static bool IsAnyNull(object obj)
        {
            return obj.GetType()
                .GetProperties().Where(x => x.Name != nameof(User.Id)).Select(property => property.GetValue(obj))
                .All(value => value != default && !string.IsNullOrWhiteSpace(value.ToString()) && value.ToString() != "0");
        }
    }
}