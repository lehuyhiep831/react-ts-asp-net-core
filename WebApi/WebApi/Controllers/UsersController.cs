using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using WebApi.Entities;
using WebApi.Helpers;
using WebApi.Models;
using WebApi.Services;

namespace WebApi.Controllers
{

    [ApiController]
    [Route("[controller]")]
    public class UsersController : ControllerBase
    {
        private IUserService _userService; 

        public UsersController(
            IUserService userService   )
        {
            _userService = userService;  
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var users = _userService.GetAll();
            return Ok(users);
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var user = _userService.GetById(id);
            return Ok(user);
        }

        [HttpPost]
        public IActionResult Add(AddUser model)
        {
            var user = _userService.Add(model);
            return Ok(new { id= user?.Id, message = "User added successfully" });
        }


        [HttpPost("AddAsync")]
        public async Task<ActionResult<User>> AddAsync(AddUser model)
        {
            var user = await _userService.AddAsync(model);
            return Ok(user);
        }

        [HttpPut("{id}")]
        public IActionResult Edit(int id, EditUser model)
        {
            _userService.Edit(id, model);
            return Ok(new { message = "User updated successfully" });
        }

        [HttpDelete("{id}")]
        public IActionResult Remove(int id)
        {
            _userService.Remove(id);
            return Ok(new { message = "User deleted successfully" });
        }
    }
}
