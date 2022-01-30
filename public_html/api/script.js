
// API KEY cf4e3808f35b0b8fbe51b9a3974a1510

const getBtn = document.getElementById('button');
const forecastBtn = document.getElementById('button2');
const searchBar = document.getElementById('search');
const weatherContainer = document.getElementById('weather');

let currentWeather = undefined;
let forecastWeather = undefined;

const currentWeatherQuery = 'https://api.openweathermap.org/data/2.5/weather?q={city}&appid=cf4e3808f35b0b8fbe51b9a3974a1510';
const forecastWeatherQuery = 'https://api.openweathermap.org/data/2.5/forecast?q={city}&appid=cf4e3808f35b0b8fbe51b9a3974a1510'

const getCurrentData = () => {

    let city = searchBar.value;

    let url = currentWeatherQuery.replace('{city}', city);

    let req = new XMLHttpRequest();
    req.open("GET", url, true);

    req.addEventListener("load", ()=>{
        currentWeather = JSON.parse(req.responseText);
        console.log(currentWeather);
        const date = new Date(currentWeather.dt * 1000);

        const dateString = `${date.toLocaleDateString('pl-PL')} ${date.toLocaleTimeString('pl-PL')}`

        const temperature = currentWeather.main.temp;
        const icon = currentWeather.weather[0].icon;

        drawWeather(dateString, temperature, icon);
    })
    req.send();
};

function getForecastData(){
    let city = searchBar.value;
    let url = forecastWeatherQuery.replace('{city}', city);

    fetch(url).then((response) => {
        return response.json();
    }).then((data) => {
        forecastWeather = data.list;
        console.log(forecastWeather);
        drawWeather();
    })
}

function drawWeather(date, temperature, icon){

    weatherContainer.innerHTML = '';
    if (currentWeather){
        const weatherItem = document.createElement('div');
        weatherItem.className = 'weather-item';

        const weatherDate = document.createElement('div');
        weatherDate.className = 'weather-date';

        const weatherTemperature = document.createElement('div');
        weatherTemperature.className = 'weather-temperature';

        const weatherIcon = document.createElement('img');
        weatherIcon.className = 'weather-icon';

        weatherItem.appendChild(weatherDate);
        weatherItem.appendChild(weatherTemperature);
        weatherItem.appendChild(weatherIcon);

        weatherDate.textContent = date;
        temperature = temperature - 273.15;
        weatherTemperature.innerHTML = temperature.toFixed(0) + '&deg;C';
        weatherIcon.src = 'https://openweathermap.org/img/wn/{icon}@2x.png'.replace("{icon}", icon);

        weatherContainer.appendChild(weatherItem);

        currentWeather = undefined;
    }

    if(forecastWeather){
        for(let i=0; i < 40; i++){
            let weather = forecastWeather[i];
            console.log(weather);
            const weatherItem = document.createElement('div');
            weatherItem.className = 'weather-item';

            const weatherDate = document.createElement('div');
            weatherDate.className = 'weather-date';

            const weatherTemperature = document.createElement('div');
            weatherTemperature.className = 'weather-temperature';

            const weatherIcon = document.createElement('img');
            weatherIcon.className = 'weather-icon';

            weatherItem.appendChild(weatherDate);
            weatherItem.appendChild(weatherTemperature);
            weatherItem.appendChild(weatherIcon);

            let date = new Date(weather.dt * 1000);
            weatherDate.textContent = `${date.toLocaleDateString('pl-PL')} ${date.toLocaleTimeString('pl-PL')}`
            temperature = weather.main.temp - 273.15;
            weatherTemperature.innerHTML = temperature.toFixed(0) + '&deg;C';
            weatherIcon.src = 'https://openweathermap.org/img/wn/{icon}@2x.png'.replace("{icon}", "04n");

            weatherContainer.appendChild(weatherItem);

            forecastWeather = undefined;
        }
    }
}

getBtn.addEventListener('click', getCurrentData);
forecastBtn.addEventListener('click', getForecastData);
