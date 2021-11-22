using ChatApp.AppData;
using ChatApp.ChatAppServices;
using ChatApp.ChatAppServices.Repositories.Interfaces;
using ChatApp.Extensions;
using ChatApp.Security.AuthModule;
using ChatApp.SignalRHubs;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace ChatApp
{
    public class Startup
    {
        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _env;

        public Startup(IConfiguration configuration, IWebHostEnvironment env)
        {
            _configuration = configuration;
            _env = env;
        }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<AppDbContext>(builder =>
            {
                builder.UseNpgsql(Services.GetConnectionString(_env.IsDevelopment()));
                builder.UseLazyLoadingProxies();
            });

            services.AddSignalR();
            services.AddControllersWithViews();

            var authOptions = _configuration.GetSection("Auth");
            services.Configure<AuthOptions>(authOptions);
            services.UseJwt(authOptions.Get<AuthOptions>());

            services.UseChatAppModules();
            services.UseChatAppRepositories();
            services.UseChatAppServices();

            services.AddSpaStaticFiles(configuration => 
                { configuration.RootPath = "client-app/build"; });
        }

        public void Configure(IApplicationBuilder app)
        {
            if (_env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapHub<ChatHub>("/chat");
                endpoints.MapControllers();
            });

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "client-app";

                if (_env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer("start");
                }
            });

            Services.Locator = app.ApplicationServices.CreateScope().ServiceProvider;
            if (!Services.Locator.GetRequiredService<IDefaultDataRepository>().InitDefaultDataAsync())
                Services.Logger.LogTrace("Error while init default data");
        }
    }
}