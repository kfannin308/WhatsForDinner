using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
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
            var addFav = new FavoritesParams()
            {
                recipeID = _addFavorite.recipeID,
                userID = _addFavorite.userID 
            };

            var userFavs = ViewFavorites(_addFavorite.userID).ToArray();
            var found = false;

            foreach (var fav in userFavs)
            {
                if (fav.recipeID == _addFavorite.recipeID)
                {
                    found = true;
                    if (found == true)
                    {
                        return;
                    }
                }
            }
            if (!found)
            {
                _favoritesDbContext.Favorites.Add(_addFavorite);
                _favoritesDbContext.SaveChangesAsync();
            }
        }

        public class FavoritesParams
        {
            public int recipeID { get; set; }
            public int userID { get; set; }
        }

        [HttpPost]
        [Route("deletefavorites")]
        public void DeleteFromFavorites([FromBody] Favorites _deleteFav)
        {
            var savedFavs = _favoritesDbContext.Favorites.Where(f => (f.userID == _deleteFav.userID && f.recipeID == _deleteFav.recipeID)).FirstOrDefault();
            if (savedFavs != null)
            {
                _favoritesDbContext.Favorites.Remove(savedFavs);
                _favoritesDbContext.SaveChanges();
            }
        }
    }
}
