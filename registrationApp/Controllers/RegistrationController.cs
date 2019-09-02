using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.Net.Http;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
using registrationApp.ViewModels;

namespace registrationApp.Controllers
{
    [Route("api/user")]
    public class RegistrationController : Controller
    {
        // GET: api/<controller>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<controller>/5
        [HttpGet("{id}")]
        public void Get(int id)
        {
        }

        // Post the account creation form data from the request body to the SKIDATA API and return registered user data
        [HttpPost]
        public string Post([FromBody]JObject jsonToken)
        {
            // Implement a using statement for the http resource so the connect is closed after use
            using (var client = new HttpClient())
            {
                // Construct call to SKIDATA Loyalty API, including the API key and Json data from the request body
                client.DefaultRequestHeaders.Add("x-api-key", "aTOtB+khU76czvbl7w2VewLwetI66uSN5mYYO2oe7f0=");                
                var httpResponse = client.PostAsJsonAsync("https://api.skidataus.com/user/82/v1/user", jsonToken).Result;

                // Save the HTTP response to a variable and deserialize it into a LoyaltyUser object so the properties are easily accessible
                var responseString = httpResponse.Content.ReadAsStringAsync().Result;
                LoyaltyUser newUser = JsonConvert.DeserializeObject<LoyaltyUser>(responseString);

                var response = newUser.UserId; // This will return null if there was an error, including the username being invalid or taken
                return response;                
            }            
        }

        // PUT api/<controller>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/<controller>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
