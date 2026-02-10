const API_KEY = "v4DosBPWAhOd0RGGgxbiYKfXObAsbWmcexGm7C2k"

const date = document.getElementById("date")

date.innerHTML = new Date()

async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const result = document.getElementById("result");
  const forecast = document.getElementById("forecast");

  if (!city) {
    result.innerHTML = `<p class="error">Please enter a city name</p>`;
    return;
  }

  result.innerHTML = "Loading...";
  forecast.innerHTML = "Loading...";

  try {
    const geoRes = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${city}`
    );
    const geoData = await geoRes.json();
    console.log(geoData)
    if (!geoData.length) {
      throw new Error("City not found");
    }

    const lat = geoData[0].lat;
    const lon = geoData[0].lon;

    const weatherRes = await fetch(
      `https://api.api-ninjas.com/v1/weather?lat=${lat}&lon=${lon}`,
      {
        headers: { "X-Api-Key": API_KEY }
      }
    );

    if (!weatherRes.ok) {
      throw new Error("Weather fetch failed");
    }

    const data = await weatherRes.json();
    
    const weatherForRes = await fetch(
      `https://api.api-ninjas.com/v1/weatherforecast?lat=${lat}&lon=${lon}`,
      {
        headers: { "X-Api-Key": API_KEY }
      }
    );

    if (!weatherForRes.ok) {
      throw new Error("Weather Forecast fetch failed");
    }

    const forecastData = await weatherForRes.json();

    console.log(forecastData)

    result.innerHTML = `
       <div class="mid">
             <div class="left">
                <h2>${city.toUpperCase()}</h2>
                <p>Temp: ${data.temp}°C</p>
            </div>
            <div class="right">
                <img src="crescent-moon-with-cloud-cartoon-style-design-weather-icon-mobile-app-night-designs_768569-996__1_-removebg-preview.png">
                    <div class="cloud">
                        <div class="temp"> <i class="fa-solid fa-temperature-full"></i>
                            <p>Feels Like: ${data.feels_like}°C</p>
                        </div>
                        <div class="temp"> <i class="fa-solid fa-droplet"></i>
                            <p>Humidity: ${data.humidity}%</p>
                        </div>
                        <div class="temp"> <i class="fa-solid fa-wind"></i>
                            <p>Wind Speed: ${data.wind_speed} km/h</p>
                        </div>
                    </div>

                </div>
            </div>
        `;

    forecast.innerHTML = `
    <div class="day">
                <p>Tomorrow</p>
                <img src="${forecastData[0].weather === "Clear"? "tl.webp" : "cloud_computing.png"}">
                <p>Temp: ${forecastData[0].temp}°</p>
                <p>Weather: ${forecastData[0].weather}</p>
                <p>Humidity: ${forecastData[0].humidity}</p>
            </div>
            <div class="day">
                <p>Day After Tomorrow</p>
                <img src="${forecastData[1].weather === "Clear"? "tl.webp" : "cloud_computing.png"}">
                <p>Temp: ${forecastData[1].temp}°</p>
                <p>Weather: ${forecastData[1].weather}</p>
                <p>Humidity: ${forecastData[1].humidity}</p>
            </div>
            <div class="day">
                <p>3rd Day</p>
                <img src="${forecastData[2].weather === "Clear"? "tl.webp" : "cloud_computing.png"}">
                <p>Temp: ${forecastData[2].temp}°</p>
                <p>Weather: ${forecastData[2].weather}</p>
                <p>Humidity: ${forecastData[2].humidity}</p>
            </div>
            <div class="day">
                <p>4th Day</p>
                <img src="${forecastData[3].weather === "Clear"? "tl.webp" : "cloud_computing.png"}">
                <p>Temp: ${forecastData[3].temp}°</p>
                <p>Weather: ${forecastData[3].weather}</p>
                <p>Humidity: ${forecastData[3].humidity}</p>
            </div>
            <div class="day">
                <p>5th Day</p>
                <img src="${forecastData[4].weather === "Clear"? "tl.webp" : "cloud_computing.png"}">
                <p>Temp: ${forecastData[4].temp}°</p>
                <p>Weather: ${forecastData[4].weather}</p>
                <p>Humidity: ${forecastData[4].humidity}</p>
            </div>
    `

  } catch (error) {
    result.innerHTML = `<p class="error">${error.message}</p>`;
  }
}
call()