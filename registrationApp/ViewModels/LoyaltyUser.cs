using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace registrationApp.ViewModels
{
    // Created a LoyaltyUser class to map the API response properties to the account creation request
    public class LoyaltyUser
    {
        public string UserId { get; set; }
        public string Username { get; set; }
        public string Message { get; set; } // If an error occurs, the message will be saved as this property
    }
}
