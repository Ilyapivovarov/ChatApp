using System;
using ChatApp.AppData;
using ChatApp.ChatAppServices;
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
            });
            
            services.AddSignalR();
            services.AddControllersWithViews();
            
            var authOptions = _configuration.GetSection("Auth");
            services.Configure<AuthOptions>(authOptions);
            
            var authOpt = _configuration.GetSection("Auth").Get<AuthOptions>();
            services.UseJwt(authOpt);
            
            services.UseChatAppModules();
            services.UseChatAppRepositories();

            services.AddSpaStaticFiles(configuration => 
                { configuration.RootPath = "client-app/build"; });
        }

        public void Configure(IApplicationBuilder app)
        {
            Console.WriteLine("Run Configure");

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
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "client-app";

                if (_env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });

            Services.Locator = app.ApplicationServices.CreateScope().ServiceProvider;
        }
    }
}