using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using WhatsForDinner.Models;

namespace WhatsForDinner.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly UsersDbContext _usersDbContext;

        public UsersController(UsersDbContext usersDbContext)
        {
            _usersDbContext = usersDbContext;
        }

        [HttpGet]
        [Route("login")]
        public Users Login(string email, string firstName, string lastName)
        {
            Users users = new Users();
            users.email = email;
            users.firstName = firstName;
            users.lastName = lastName;

            return users;
        }

        [HttpGet]
        [Route("test")]
        public Users[] Test()
        {
            return _usersDbContext.Users.ToArray();
        }

        [HttpPost]
        [Route("register")]
        public void RegisterUser(string email, string firstName, string lastName, int numberToFeed)
        {
            Users newUser = new Users();
            newUser.email = email;
            newUser.firstName = firstName;
            newUser.lastName = lastName;
            newUser.numberToFeed = numberToFeed;

            _usersDbContext.Users.Add(newUser);
            _usersDbContext.SaveChanges();
        }

    }
}
