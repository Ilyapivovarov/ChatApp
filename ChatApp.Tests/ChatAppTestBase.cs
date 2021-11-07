using System;
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
    }
}