using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
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
        [Route("test")]
        public Users TestMethod()
        {
            Users users = new Users();
            users.userId = 1;
            users.email = "dominionsucks@gmail.com";
            users.firstName = "Dominion";
            users.lastName = "Burch";
            users.numberToFeed = 1;
            
            return users;
        }
    }
}
