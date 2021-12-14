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
    [Route("[controller]")]
    public class AccountController : ChatAppControllerBase
    {
        private readonly IMapperService _mapper;

        public AccountController(IMapperService mapper)
        {
            _mapper = mapper;
        }
        
        [HttpGet]
        [Route("")]
        public async Task<ActionResult> GetAccounts()
        {
            try
            {
                var accounts = await Services.Locator.GetRequiredService<IUserRepository>()
                    .GetUsersAsync();
                return Ok(_mapper.Map<Account[]>(accounts.Value));
            }
            catch (Exception e)
            {
                Services.Logger.LogError(e, e.Message);
                return BadRequest(e.Message);
            }
        }
        
        
        [HttpGet]
        [Route("{id:int}")]
        public async Task<ActionResult> GetAccounts(int id)
        {
            try
            {
                var queryResult = await Services.Locator.GetRequiredService<IUserRepository>()
                    .GetUserByIdAsync(id);
                if (queryResult.HasValue)
                    return Ok(_mapper.Map<User, Account>(queryResult.Value));

                return BadRequest(queryResult.ErrorMessage);
            }
            catch (Exception e)
            {
                Services.Logger.LogError(e, e.Message);
                return BadRequest(e.Message);
            }
        }
    }
}