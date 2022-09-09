
const user_input = document.querySelector('#place')
const search_btn = document.querySelector('#search')

const city_name = document.querySelector('.city-name')
const weather_type = document.querySelector('.weather-type')
const temp = document.querySelector('.temp')
const min_temp = document.querySelector('.min-temp')
const max_temp = document.querySelector('.max-temp')


search_btn.addEventListener('click', () => {
    const city = user_input.value;
    city_name.innerText = city;
    // getWeatherData(city);
    showWeatherData(city);
})


// GET WEATHER DATA
const getWeatherData = async (city) => {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '3c8a560ff7msh4e3ed10a355ac49p1faaeejsnc333d6598764',
            'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
        }
    };

    const url = `https://weatherapi-com.p.rapidapi.com/forecast.json?q=${city}`
    const response = await fetch(url, options)
    return response.json()
}

// SHOW WEATHER DATA
const showWeatherData = async (city) => {
    const base_data = await getWeatherData(city);

    let weather_status = base_data.current.condition.text;
    weather_type.innerText = weather_status;

    let maxTemp = base_data.forecast.forecastday[0].day.maxtemp_c;
    max_temp.innerText = `Max Temp: ${maxTemp}°C`;

    let minTemp = base_data.forecast.forecastday[0].day.mintemp_c;
    min_temp.innerText = `Min Temp: ${minTemp}°C`;

    let avgTemp = base_data.forecast.forecastday[0].day.avgtemp_c;
    temp.innerText = `Avg Temp: ${avgTemp}°C`;

    user_input.value = '';
}