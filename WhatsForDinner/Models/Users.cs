using System.ComponentModel.DataAnnotations;

namespace WhatsForDinner.Models
{
    public class Users
    {
        [Key]
        public int userId { get; set; }
        public string email { get; set; } = null!;
        public string firstName { get; set; } = null!;
        public string lastName { get; set; } = null!;
        public int numberToFeed { get; set; }

    }
}