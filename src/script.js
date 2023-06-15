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

function displayWeather(response) {
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

    let day = document.querySelector("#day")
    day.innerHTML = cityTime(response.data.dt * 1000)

    let time = document.querySelector("#time")
    time.innerHTML = cityDay(response.data.dt * 1000)
    console.log(response)
}

let city = "New York"
let apiKey = "77cb0df8b340d241d54524527e9a1295"
apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
console.log(apiUrl)

axios.get(apiUrl).then(displayWeather)