function formatTime() {
let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tueday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
} 
return `${day} ${hours}:${minutes}`;
}

document.querySelector("#date").innerHTML = formatTime();

function showWeather(response) {
  document.querySelector("#current-weather").innerHTML = response.data.weather[0].description;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  celciusTemperature = Math.round(response.data.main.temp);
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#choose-city").innerHTML = response.data.name;
  document.querySelector("#icon").setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  document.querySelector("#icon").setAttribute("alt", response.data.weather[0].description);
}

function search(city) {
  let apiKey = "b9a867042f40ae2fdcbd042705b891b2";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  search(city);
}

function searchLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "b9a867042f40ae2fdcbd042705b891b2";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

  axios.get(apiUrl).then(showWeather);
}
function currentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}
function displayFahrenheit (event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  celcius.classList.remove("active");
  fahrenheit.classList.add("active");
  let fahrenheitTemperature = (celciusTemperature * 9) / 5 +32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelcius(event) {
  event.preventDefault();
  celcius.classList.add("active");
  fahrenheit.classList.remove("active");
  temperature.innerHTML = celciusTemperature;
}

let celciusTemperature = null;

let form = document.querySelector("#enter-city");
form.addEventListener("submit", handleSubmit);

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", displayFahrenheit);

let celcius = document.querySelector("#celcius");
celcius.addEventListener("click", displayCelcius);

let locationButton = document.querySelector("#current-location");
locationButton.addEventListener("click", currentLocation);

search("Oslo");