// API call

// Call 5 day/3 hour forecast data
// let forecastUrl =  `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`

// Coordinates by loction name
// http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}

const cityInput = document.querySelector("#city-input");
const searchButton = document.querySelector(".search-btn");
const weatherWeatherDiv = document.querySelector(".weather-cards");
const weatherCardsDiv = document.querySelector(".weather-cards");
const API_KEY = "b3dee76787453160b8c2a96b51e18773";

const createWeatherCard = (cityName, weatherItem, index) => {
  if (index === 0) {
    return `<div class = "details">
        <h2>${cityName} (${weatherItem.dt_text.split(" ")})</2>
        <h4> Temp: ${(weatherItem.main.temp - 273.15).toFixed(2)}C</h4>
        <h4> Wind: ${weatherItem.wind.speed} M/S </h4>
        <h4> Humidity: ${weatherItem.main.humidity} % </h4>
        </div>
        <div class="icon">
        <img src = "https://openweathermap.org/wn/${
          watherItem.weather[0].icon
        }@2x.png" alt = "weatherIcon"
        <h4>${weatherItem.weather[0].description}</h4>
        </div>`;
  } else
    return ` <li class = "card">
        <h3>(${watherItem.dt_text.split(" ")[0]})</h3>
        <img src = "https://openweathermap.org/wn/${
          watherItem.weather[0].icon
        }@2x.png" alt = "weatherIcon"
        <h4> Temp: ${(weatherItem.main.temp - 273.15).toFixed(2)}C</h4>
        <h4> Wind: ${weatherItem.wind.speed} M/S </h4>
        <h4> Humidity: ${weatherItem.main.humidity} % </h4>
         </li>`;
};

const getWeatherDetails = (cityName, lat, lon) => {
  const weatherUrl = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
  console.log(lat);
  console.log(lon);
  fetch(weatherUrl)
    .then((res) => res.json())
    .then((data) => {
      // Filter to get one day forecast
      const specialForecastDays = [];
      console.log("test");
      console.log(data);

      const fiveDaysCast = data.list.filter((forecast) => {
        const forecastDate = new Date(forecast.dt_txt).getDate();
        if (!specialForecastDays.includes(forecastDate)) {
          return specialForecastDays.push(forecastDate);
        }
      });

      // Clear previous weather data
      cityInput.value = "";
      weatherCardsDiv.innerHTML = "";

      console.log(fiveDaysCast);
      fiveDaysCast.forEach((weatherItem) => {
        if (index === 0) {
        } else {
          weatherCardsDiv.insertAdjacentHTML(
            "beforeend",
            createWeatherCard(weatherItem)
          );
        }
      });
    })
    .catch((err) => {
      alert("Error fetching the weather forecast: " + err);
    });
};

const getCityCoordinates = () => {
  const cityName = cityInput.value.trim();
  if (!cityName) return;
  const GEOCODING_API_URL = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_KEY}`;

  fetch(GEOCODING_API_URL)
    .then((res) => res.json())
    .then((data) => {
      if (!data.length) return alert(`No coordinates for ${cityName}`);
      const { name, lat, lon } = data[0];
      getWeatherDetails(name, lat, lon);
    })
    .catch(() => {
      alert("Error while fetching the coordinates");
    });
};

searchButton.addEventListener("click", getCityCoordinates);

// function getWeather() {
//   //const city = document.getElementbyId ('city').value;
//   let city = "Chicago";
//   let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
//   // let iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`

//   if (!city) {
//     alert("Please enter a city");
//     return;
//   }

//   fetch(url) // we make an ASYNC Request for data - Retuerns A PROMISE
//     .then(function (response) {
//       // to handle a SUCCESSFUL REQUST
//       console.log("response: ", response);
//       return response.json();
//     })
//     .then((data) => {
//       console.log("Data: ", data);
//       let lat = data.coord.lat;
//       let lon = data.coord.lon;
//       let forecastUrl = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;

//       //  `http://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}`
//       console.log("Coord: ", lat, lon);

//       fetch(forecastUrl)
//         .then((response) => response.json())
//         .then((data) => {
//           console.log("Forecast Data: ", data);
//         })
//         .catch((error) => {
//           console.log("Error: ", error);
//         });
//     })
//     .catch((error) => {
//       // handleing an ERROR response
//       console.log("Error: ", error);
//     });

//   /*
//   fetch(forecastUrl)
//       .then()
//       .then()
//       .catch()

//       */
//   getWeather();

