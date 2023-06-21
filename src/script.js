function formatDate(timestamp) {
    let date = new Date(timestamp)
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    let day = days[date.getDay()]

    return `${day}`
}

function formatTime(timestamp) {
    let date = new Date(timestamp)
    let hours = date.getHours()
     if (hours < 10){
        hours = `0${hours}`
       }

    let minutes = date.getMinutes()
     if (minutes < 10){
        minutes = `0${minutes}`
       }

    return `${hours}:${minutes}`
}

function getForecast(coordinates) {
    let apiKey = "667d9f573c8af4c33457be5d561a9148"
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`
    axios.get(apiUrl).then(displayForecast)
}

function formatDay(timestamp) {
    let date = new Date(timestamp * 1000)
    let day = date.getDay()
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

    return days[day]
}

function displayForecast(response) {
    let forecast = response.data.daily

    let forecastElement = document.querySelector("#forecast")
    
    let forecastHTML = `<div class="row">`
    forecast.forEach(function(forecastDay, index) {
        if (index < 6){

    forecastHTML = forecastHTML + `
    <div class="col-2">
        <div class="forecast-date">
            ${formatDay(forecastDay.dt)}
        </div>
      <img src="https://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png"/>
      <div class="forecast-temp">
        <span class="max-temp">${Math.round(forecastDay.temp.max)}º</span>
        <span class="min-temp">${Math.round(forecastDay.temp.min)}º</span>
      </div>
    </div>`
     }
  })

    forecastHTML = forecastHTML + `</div>`
    forecastElement.innerHTML = forecastHTML
}

function displayWeather(response) {
    console.log(response)
    let city = document.querySelector("#city")
    city.innerHTML = response.data.name

    let temperature = document.querySelector("#temperature")
    temperature.innerHTML = Math.round(response.data.main.temp)

    let sky = document.querySelector("#skyDescription")
    sky.innerHTML = response.data.weather[0].description

    let humidity = document.querySelector("#humidity")
    humidity.innerHTML = response.data.main.humidity

    let wind = document.querySelector("#wind")
    wind.innerHTML = response.data.wind.speed

    let dateElement = document.querySelector("#day")
    dateElement.innerHTML = formatDate(response.data.dt * 1000)

    let timeElement = document.querySelector("#time")
    timeElement.innerHTML = formatTime(response.data.dt * 1000)

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

let form = document.querySelector("#search-form");
form.addEventListener("submit", submitHandle);

search("New York");
