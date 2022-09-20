using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WhatsForDinner.Models;

namespace WhatsForDinner.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UsersController : ControllerBase
    {
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
