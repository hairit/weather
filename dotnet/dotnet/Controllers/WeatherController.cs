using Microsoft.AspNetCore.Mvc;

namespace dotnet.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherController : ControllerBase
    {
        private HttpClient _httpClient;

        public WeatherController()
        {
            _httpClient = new HttpClient();
        }

        [HttpGet("{zipcode}")]
        public async Task<ActionResult> Check(string zipcode)
        {
            if (string.IsNullOrWhiteSpace(zipcode))
            {
                return BadRequest("Please provide zipcode");
            }
            try
            {
                var url = $"http://api.weatherstack.com/current?access_key=610acf4c1d203448cd6f671955c5e8aa&query={zipcode}";
                var result = await _httpClient.GetAsync(url);
                if (result.StatusCode != System.Net.HttpStatusCode.OK) {
                    return BadRequest($"Cannot check weather by zipcode ${zipcode}. Please try with other");
                }
                var response = await result.Content.ReadAsStringAsync();
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}