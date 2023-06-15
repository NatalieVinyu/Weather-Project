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
}




let apiKey = "77cb0df8b340d241d54524527e9a1295"
apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=New York&appid=77cb0df8b340d241d54524527e9a1295&units=metric`
console.log(apiUrl)

axios.get(apiUrl).then(displayWeather)