namespace WhatsForDinner.Models
{
    public class Users
    {
        public int userId { get; set; }
        public string email { get; set; } = null!;
        public string firstName { get; set; } = null!;
        public string lastName { get; set; } = null!;
        public int numberToFeed { get; set; }

    }
}
