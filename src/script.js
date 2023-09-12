/** @format */
function TimeFormat(dayTime) {
  let hour = dayTime.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minute = dayTime.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }
  let dayLog = dayTime.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayLog];

  return `${day} ${hour}:${minute}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row"`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 7)
      forecastHTML =
        forecastHTML +
        `
  <div class="row" >
            <div class="weather-forecast" id="forecast"></div>
            <div class="col-2">
              <h5>
              Sat
                <div class="days">
                </h5>
                <div class="card2" >
                  <div class="card-body">
                    <img src =
    "https://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png"
                    <h6 id="temp" >17°</h6> ${Math.round(forecastDay.temp)}
                </div>
              </div>
            </div>`;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecast.innerHTML = forecastHTML;
}

function getForecast(coords) {
  let apiKey = "fe1483f743b581b5520a1b725af03a49";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coords.lat}&lon=${coords.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function showTemperature(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
  console.log(response.data);
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  icon.setAttribute(
    "src",
    ` https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  getForecast(response.data.coord);
}
function searchCity(city) {
  let apiKey = "fe1483f743b581b5520a1b725af03a49";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}
function display(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}
function searchLocation(position) {
  let apiKey = "fe1483f743b581b5520a1b725af03a49";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemperature);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function convertFahrenheit(event) {
  event.preventDefault();
  let temperatureDisplay = document.querySelector("#temperature");
  let temperature = temperatureDisplay.innerHTML;
  temperatureDisplay.innerHTML = Math.round((temperature * 9) / 5 + 32);
}

function convertCelcius(event) {
  event.preventDefault();
  let temperatureDisplay = document.querySelector("#temperature");
  let temperature = temperatureDisplay.innerHTML;
  temperatureDisplay.innerHTML = Math.round(((temperature - 32) * 5) / 9);
}
let now = new Date();
let h3Date = document.querySelector("h3.date");
date.innerHTML = TimeFormat(now);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", display);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertFahrenheit);

let celciusLink = document.querySelector("#celcius-link");
celciusLink.addEventListener("click", convertCelcius);

let currentButton = document.querySelector("#current");
current.addEventListener("click", getCurrentLocation);

searchCity("London");
