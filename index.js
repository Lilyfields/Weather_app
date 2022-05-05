const timeEl = document.getElementById('time');
const dateEl = document.getElementById('date');
const currentWeatherItemsEl = document.getElementById('current-weather-items');
const timezone = document.getElementById('time-zone');
const countryEl = document.getElementById('country');
const weatherForecastEl = document.getElementById('weather-forecast');
const currentTempEl = document.getElementById('current-temp');
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

//fetch westher data from API from search
const inputEl = document.getElementById('location');

const buttonEl = document.getElementById('search');
buttonEl.addEventListener('click', () => {
    var location = inputEl.value;
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=b21deabc21db14b6f37ecc059fa772c7`)
        .then(res => res.json())
        .then(locationData => {

            console.log(locationData)

            fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${locationData[0].lat}&lon=${locationData[0].lon}&exclude=hourly,minutely&units=metric&appid=b21deabc21db14b6f37ecc059fa772c7`)
                .then(res => res.json())
                .then(weatherData => {


                    console.log(weatherData)
                    presentWeatherData(weatherData);


                    // currentWeatherItemsEl.innerHTML= `<div id="humidity">${humidity}</div>` + `<div id="pressure">${pressure}</div>` + ` <div id="wind_speed">${wind_speed}</div>` + ` <div id="uvi">${uvi}</div>`
                })
        })
})


//set date and time. 

setInterval(() => {
    const time = new Date();
    const month = time.getMonth();
    const date = time.getDate();
    const day = time.getDay();
    const hour = time.getHours();
    const hoursIn12HrFormat = hour >= 13 ? hour % 12 : hour
    const minutes = time.getMinutes();
    const ampm = hour >= 12 ? 'PM' : 'AM'


    timeEl.innerHTML = (hoursIn12HrFormat < 10 ? '0' + hoursIn12HrFormat : hoursIn12HrFormat) + ':' + (minutes < 10 ? '0' + minutes : minutes) + ' ' + `<span id="am-pm">${ampm}</span>`

    dateEl.innerHTML = days[day] + ',' + date + ' ' + months[month]

}, 1000);





//Display weather information

function presentWeatherData(weatherData) {
    let { humidity, pressure, uvi, wind_speed } = weatherData.current;

    timezone.innerHTML = weatherData.timezone;


    currentWeatherItemsEl.innerHTML =

        ` <div class="weather-items">
<div>Humidity</div>
<div>${humidity}%</div>
</div>
<br>
<div class="weather-items">
<div>Pressure</div>
<div>${pressure}</div>
</div>
<br>
<div class="weather-items">
<div>Wind Speed</div>
<div>${wind_speed}</div>
</div>
<br>
<div class="weather-items">
<div>UV-index</div>
<div>${uvi}</div>
</div>`;


    let dailyForecast = ''
    weatherData.daily.forEach((day, idx) => {
        if (idx == 0) {
            currentTempEl.innerHTML = `
            
            <div class="today" id="current-temp">
                <img src=" http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="weather icon" class="w.icon">
                <div class="other">
                    <div class="day">${window.moment(day.dt * 1000).format('ddd')}</div>
                    <div class="temp">Night- ${day.temp.night}&#176; C</div>
                    <div class="temp">Day- ${day.temp.day}&#176; C</div>
                </div>
            </div>
            
            
            `

        } else {
            dailyForecast += `
        <div class="weather-forecast-item">
                <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="weather icon" class="w.icon">
                <div class="day">${window.moment(day.dt * 1000).format('ddd')}</div>
                <div class="temp">Night- ${day.temp.night}&#176; C</div>
                <div class="temp">Day- ${day.temp.day}&#176; C</div>
             </div>
        </div>


        `
        }
    })

    weatherForecastEl.innerHTML = dailyForecast;

}



