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

        [HttpPost]
        [Route("viewfavorites")]
        public Favorites ViewFavorites([FromBody] ViewFavoritesParams _viewFav)
        {
            var userFav = _favoritesDbContext.Favorites.Where(u => u.userID == _viewFav.userID).FirstOrDefault();

            return userFav;
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
                favoriteID = _addFavorite.favoriteID,
                recipeID = _addFavorite.recipeID,
                userID = _addFavorite.userID
            };

            _favoritesDbContext.Favorites.Add(_addFavorite);
            _favoritesDbContext.SaveChangesAsync();
        }

        public class AddFavoritesParams
        {
            public int favoriteID { get; set; }
            public int recipeID { get; set; }
            public int userID { get; set; }

        }
    }
}
