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

function showTemperature(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
}
function searchCity(city) {
  let apiKey = "7e2b97d3e917c6fbf240fd23eb4501d0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}
function display(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}
function searchLocation(position) {
  let apiKey = "7e2b97d3e917c6fbf240fd23eb4501d0";
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
