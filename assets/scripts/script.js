const fetchWeather = async () => {
    try {
        const fetchedData = await fetch("https://api.open-meteo.com/v1/forecast?latitude=41.69&longitude=44.83&hourly=temperature_2m&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,showers_sum,snowfall_sum,windspeed_10m_max&current_weather=true&timezone=auto");
        const data = await fetchedData.json();

        
        if (data.current_weather.is_day === 1) {
            document.body.style.backgroundImage = "url('https://wallpaperset.com/w/full/c/5/5/70243.jpg')";
        } else {
            document.body.style.backgroundImage = "url('https://wallpaperset.com/w/full/8/7/a/25571.jpg')";
        }

        const latitude = document.getElementById("latitude");
        const longitude = document.getElementById("longitude");
        const windSpeed = document.getElementById("wind-value");
        const maxWindSpeed = document.getElementById("max-windspeed")
        const timeZone = document.getElementById("timezone");
        const currentWeatherTemp = document.getElementById("weather-det-temperature");
        const isDay = document.getElementById("is-day")
        const weatherDate = document.getElementById("weather-date")
        const sunrise = document.getElementById("sunrise")
        const sunset = document.getElementById("sunset")
        const showersSum = document.getElementById("showers-sum")
        const snowFallSum = document.getElementById("snowfall-sum")
        const cityLocation = document.getElementById("weather-city")

        cityLocation.textContent = data.timezone;
        latitude.textContent = `Latitude: ${data.latitude}`;
        longitude.textContent = `Longtitude: ${data.longitude}`;
        timeZone.textContent = `Timezone: ${data.timezone}`;
        currentWeatherTemp.textContent = `${data.current_weather.temperature}${data.daily_units.temperature_2m_min}`;
        windSpeed.textContent = `Windspeed: ${data.current_weather.windspeed}`;
        maxWindSpeed.textContent = `Max Windspeed: ${data.daily.windspeed_10m_max[0]} ${data.daily_units.windspeed_10m_max}`;
        isDay.textContent = `Daytime: ${data.current_weather.is_day}`;
        
        weatherDate.textContent = data.current_weather.time;
        sunrise.textContent = `Sunrise: ${data.daily.sunrise[0]}`;
        sunset.textContent = `Sunset: ${data.daily.sunset[1]}`;
        showersSum.textContent = `Showers-sum: ${data.daily.showers_sum[3]}${data.daily_units.showers_sum}`;
        snowFallSum.textContent = `Snowfall-sum: ${data.daily.snowfall_sum[0]}${data.daily_units.snowfall_sum}`;

        const hourlyBox = document.querySelector(".hourly-weather");
        const hourlyIds = data.hourly.time.map((index) => index + 1);   
        for (let i = 0; i < hourlyIds.length; i++) {
            const hourlyHeading = document.createElement("h4");
            hourlyHeading.id = hourlyIds[i];
            hourlyHeading.textContent = `${data.hourly.time[i]} - `;
            hourlyBox.appendChild(hourlyHeading);
            
            const hourlyTemperature = document.createElement("span");
            hourlyTemperature.textContent = `${data.hourly.temperature_2m[i]}${data.hourly_units.temperature_2m}`;
            hourlyTemperature.style.color = "yellow";
            hourlyHeading.appendChild(hourlyTemperature);
          }
          
    } catch (error) {
        console.error(error);
    }
};
fetchWeather();
