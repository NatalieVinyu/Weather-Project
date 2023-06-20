function cityDay(timestamp) {
    let date = new Date(timestamp);
    
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    let day = days[date.getDay()]
    
    return `${day}`
}
    
function cityTime(timestamp) {
    let date = new Date(timestamp);
    
    let hours = date.getHours();
    if (hours < 10) {
        hours = `0${hours}`
    }
    let minutes = date.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`
    }
    
    return `${minutes}:${hours}`
}

function getForecast(coordinates) {
    console.log(coordinates)
    let apiKey = "667d9f573c8af4c33457be5d561a9148"
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`
    axios.get(apiUrl).then(displayForecast)
}

function displayForecast(response) {
    console.log(response.data)
    let forecast = document.querySelector("#forecast")
    let forecastHTML = `<div class="row">`
    let days = ["Tue", "Wed", "Thu", "Sun"]
    days.forEach(function(day) {

   
    forecastHTML = forecastHTML + `
    <div class="col-2">
        <div class="forecast-date">
            ${day}
        </div>
      <img src="https://openweathermap.org/img/wn/10d@2x.png"/>
      <div class="forecast-temp">
        <span class="max-temp">18º</span>
        <span class="min-temp">12º</span>
      </div>
    </div>`
  })

    forecastHTML = forecastHTML + `</div>`
    forecast.innerHTML = forecastHTML
}


function displayWeather(response) {
    let city = document.querySelector("#city")
    city.innerHTML = response.data.name

    let temperature = document.querySelector("#temperature")
    temperature.innerHTML = Math.round(celsiusTemp)

    celsiusTemp = response.data.main.temp

    let sky = document.querySelector("#skyDescription")
    sky.innerHTML = response.data.weather[0].description

    let humidity = document.querySelector("#humidity")
    humidity.innerHTML = response.data.main.humidity

    let wind = document.querySelector("#wind")
    wind.innerHTML = response.data.wind.speed

    let day = document.querySelector("#day")
    day.innerHTML = cityTime(response.data.dt * 1000)

    let time = document.querySelector("#time")
    time.innerHTML = cityDay(response.data.dt * 1000)

    let icon = document.querySelector("#icon")
    icon.setAttribute("src", `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`)

    getForecast(response.data.coord)
}

function search(city) {
    let apiKey = "77cb0df8b340d241d54524527e9a1295"
    apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    axios.get(apiUrl).then(displayWeather);
}

function submitHandle(event) {
    event.preventDefault();
    let cityInput = document.querySelector("#search-input");
    search(cityInput.value);
}

function fahrenheitTemperature(event) {
    event.preventDefault();
    celsiusLink.classList.remove("active");
    fahrenheitLink.classList.add("active");
    let temperatureElement = document.querySelector("#temperature");
    let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
    temperatureElement.innerHTML = Math.round(fahrenheitTemp); 
}

function celsiusTemperature(event) {
    event.preventDefault();
    celsiusLink.classList.add("active");
    fahrenheitLink.classList.remove("active");
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(celsiusTemp);
    
}

function currentPosition(position) {
    let latitude = position.coords.latitude
    let longitude = position.coords.longitude
    apiKey = "77cb0df8b340d241d54524527e9a1295"
    apiUrl =`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`

    axios.get(apiUrl).then(displayWeather)
}

function getCurrentPosition(event){
event.preventDefault()
navigator.geolocation.getCurrentPosition(currentPosition)
}

let button = document.querySelector("#button")
button.addEventListener("click", getCurrentPosition)

let celsiusTemp = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", submitHandle);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", fahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", celsiusTemperature);

search("New York");
