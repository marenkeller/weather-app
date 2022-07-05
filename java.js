function formatdate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours};`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes};`;
  }
  let days = ["sun", "mon", "tues", "wed", "thurs", "fri", "sat"];
  let day = days[date.getDay()];
  let dateOfMonth = date.getDate();
  let months = [
    "jan",
    "feb",
    "mar",
    "apr",
    "may",
    "jun",
    "jul",
    "aug",
    "sep",
    "oct",
    "nov",
    "dec",
  ];

  let month = months[date.getMonth()];
  return `${day}, ${month} ${dateOfMonth}  ${hours}:${minutes}`;
}

let currentTime = document.querySelector("#hourDate");
let now = new Date();
currentTime.innerHTML = formatdate(now);

function displayWeatherCondition(response) {
  document.querySelector("#city-h1").innerHTML = response.data.name;
  document.querySelector("#temperatureMain").innerHTML = Math.round(
    response.data.main.temp
  );

  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#feels-like").innerHTML = Math.round(
    response.data.main.feels_like
  );
  document.querySelector("#max-temp").innerHTML = Math.round(
    response.data.main.temp_max
  );
  document.querySelector("#min-temp").innerHTML = Math.round(
    response.data.main.temp_min
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  //document.querySelector("#iconMain").innerHTML = response.data.weather.icon;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
}

function searchCity(city) {
  let apiKey = "92b6fb38291bebfb68bbc438f53dc255";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

function searchLocation(position) {
  let apiKey = "92b6fb38291bebfb68bbc438f53dc255";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let searchForm = document.querySelector("#search-bar");
searchForm.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#current-city-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("Oslo");
