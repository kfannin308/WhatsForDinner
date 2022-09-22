using Microsoft.EntityFrameworkCore;

namespace WhatsForDinner.Models
{
    public class UsersDbContext : DbContext
    {
        public UsersDbContext(DbContextOptions<UsersDbContext> options) : base(options)
        {
            // Nothing needed
        }

        public DbSet<Users> Users { get; set; }
    }
}
