using System;
using System.Threading.Tasks;
using ChatApp.AppData.Dto;
using ChatApp.AppData.Models;
using ChatApp.ChatAppServices;
using ChatApp.ChatAppServices.MapperService;
using ChatApp.ChatAppServices.Repositories.Interfaces;
using ChatApp.Controllers.Base;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Query.SqlExpressions;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

namespace ChatApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ChatAppControllerBase
    {
        private readonly IMapperService _mapper;

        public UserController(IMapperService mapper)
        {
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult> GetAccounts()
        {
            var users = await Services.Locator.GetRequiredService<IUserRepository>()
                .GetUsersAsync();
            if (users == null)
                return BadRequest("Error");

            return Ok(_mapper.Map<UserDto[]>(users));
        }


        [HttpGet]
        [Route("{id:int}")]
        public async Task<ActionResult> GetAccounts(int id)
        {
            var user = await Services.Locator.GetRequiredService<IUserRepository>()
                .GetUserByIdAsync(id);
            
            if (user == null)
                return BadRequest("");
            
            return Ok(_mapper.Map<User, UserDto>(user));
        }
    }
}