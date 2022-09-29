using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WhatsForDinner.Models;

namespace WhatsForDinner.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class FavoritesController : ControllerBase
    {
        private readonly FavoritesDbContext _favoritesDbContext;

        public FavoritesController(FavoritesDbContext favoritesDbContext)
        {
            _favoritesDbContext = favoritesDbContext;
        }

        [HttpGet]
        [Route("test")]
        public Favorites[] Test()
        {
            return _favoritesDbContext.Favorites.ToArray();
        }

        [HttpGet]
        [Route("viewfavorites")]
        public List<Favorites> ViewFavorites(int userID)
        {
            var userFavs = _favoritesDbContext.Favorites.Where(u => u.userID == userID).ToList();

            return userFavs;
        }

        public class ViewFavoritesParams
        {
            public int userID { get; set; }
        }

        [HttpPost]
        [Route("addtofavorites")]
        public void AddToFavorites([FromBody] Favorites _addFavorite)
        {
            var addFav = new AddFavoritesParams()
            {
                recipeID = _addFavorite.recipeID,
                userID = _addFavorite.userID
            };

            _favoritesDbContext.Favorites.Add(_addFavorite);
            _favoritesDbContext.SaveChangesAsync();
        }

        public class AddFavoritesParams
        {
            public int recipeID { get; set; }
            public int userID { get; set; }

        }
    }
}
