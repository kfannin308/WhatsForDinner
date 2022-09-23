using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WhatsForDinner.Models
{
    public class Favorites
    {
        [Key]
        public int favoriteID { get; set; }
        public int recipeID { get; set; }
        public int userID { get; set; }
    }
}
