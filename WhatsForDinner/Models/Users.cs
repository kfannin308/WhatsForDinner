using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WhatsForDinner.Models
{
    public class Users
    {
        [Key]
        public int userID { get; set; }
        public string email { get; set; } = null!;
        public string firstName { get; set; } = null!;
        public string lastName { get; set; } = null!;
        public int numberToFeed { get; set; }

    }
}