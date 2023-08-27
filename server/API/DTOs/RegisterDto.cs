using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
	public class RegisterDto
	{
        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        public string Username { get; set; }

        [Required]
        public string DisplayName { get; set; }

        [Required]
        [RegularExpression("(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{4,8}$", ErrorMessage = "Password must contain special character and number and and between 4 and 8 in length")]
        public string Password { get; set; }
	}
}

