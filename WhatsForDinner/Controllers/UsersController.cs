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

        [HttpPost]
        [Route("login")]
        public Users Login([FromBody] LoginParams _loginParams)
        {
            var userLogIn = _usersDbContext.Users.Where(u => u.email == _loginParams.email).FirstOrDefault();

            return userLogIn;
        }
        public class LoginParams
        {
            public string email;
        }

        [HttpGet]
        [Route("test")]
        public Users[] Test()
        {
            return _usersDbContext.Users.ToArray();
        }


        [HttpPost]
        [Route("register")]
        public void RegisterUser ([FromBody] Users _newUser)
        {
            var newUser = new RegisterUserParams()
            {
                firstName = _newUser.firstName,
                lastName = _newUser.lastName,
                email = _newUser.email,
                numberToFeed = _newUser.numberToFeed
            };

            _usersDbContext.Users.Add(_newUser);
            _usersDbContext.SaveChangesAsync();
        }

        public class RegisterUserParams
        {
            public string email;
            public string firstName;
            public string lastName;
            public int numberToFeed;
        }
            
    }
}
