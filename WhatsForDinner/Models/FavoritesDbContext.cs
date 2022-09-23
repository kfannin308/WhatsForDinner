using Microsoft.EntityFrameworkCore;

namespace WhatsForDinner.Models
{
    public class FavoritesDbContext : DbContext
    {
        public FavoritesDbContext(DbContextOptions<FavoritesDbContext> options) : base(options)
        {
            // Nothing needed
        }

        public DbSet<Favorites> Favorites { get; set; }
    }
}
