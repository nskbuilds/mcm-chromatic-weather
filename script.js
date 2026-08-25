// Update time every second
function updateTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    
    document.getElementById('timeDisplay').textContent = `${hours}:${minutes}:${seconds}`;
    
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const dateStr = now.toLocaleDateString('en-US', options);
    document.getElementById('dateDisplay').textContent = dateStr;
}

// Fetch weather for San Francisco
async function updateWeather() {
    try {
        // Using Open-Meteo API (free, no API key required)
        const response = await fetch(
            'https://api.open-meteo.com/v1/forecast?latitude=37.7749&longitude=-122.4194&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&temperature_unit=fahrenheit&wind_speed_unit=mph'
        );
        
        if (!response.ok) {
            throw new Error('Weather API error');
        }
        
        const data = await response.json();
        const current = data.current;
        
        const weatherCode = current.weather_code;
        const weatherIcon = getWeatherIcon(weatherCode);
        const weatherDescription = getWeatherDescription(weatherCode);
        const temp = Math.round(current.temperature_2m);
        const humidity = current.relative_humidity_2m;
        const windSpeed = Math.round(current.wind_speed_10m);
        
        const weatherHTML = `
            <div class="weather-main">
                <div class="weather-icon">${weatherIcon}</div>
                <div class="weather-temp">${temp}°F</div>
            </div>
            <div class="weather-description">${weatherDescription}</div>
            <div class="weather-details">
                <div class="weather-detail">
                    <div class="detail-label">Humidity</div>
                    <div class="detail-value">${humidity}%</div>
                </div>
                <div class="weather-detail">
                    <div class="detail-label">Wind Speed</div>
                    <div class="detail-value">${windSpeed} mph</div>
                </div>
            </div>
        `;
        
        document.getElementById('weatherContent').innerHTML = weatherHTML;
    } catch (error) {
        console.error('Error fetching weather:', error);
        document.getElementById('weatherContent').innerHTML = `
            <div class="error">Unable to load weather data</div>
        `;
    }
}

// Convert WMO weather codes to descriptions and icons
function getWeatherDescription(code) {
    const descriptions = {
        0: 'Clear Sky',
        1: 'Mainly Clear',
        2: 'Partly Cloudy',
        3: 'Overcast',
        45: 'Foggy',
        48: 'Foggy',
        51: 'Light Drizzle',
        53: 'Moderate Drizzle',
        55: 'Dense Drizzle',
        61: 'Slight Rain',
        63: 'Moderate Rain',
        65: 'Heavy Rain',
        71: 'Slight Snow',
        73: 'Moderate Snow',
        75: 'Heavy Snow',
        77: 'Snow Grains',
        80: 'Slight Rain Showers',
        81: 'Moderate Rain Showers',
        82: 'Violent Rain Showers',
        85: 'Slight Snow Showers',
        86: 'Heavy Snow Showers',
        95: 'Thunderstorm',
        96: 'Thunderstorm with Hail',
        99: 'Thunderstorm with Hail'
    };
    return descriptions[code] || 'Unknown';
}

function getWeatherIcon(code) {
    if (code === 0) return '☀️';
    if (code === 1 || code === 2) return '🌤️';
    if (code === 3) return '☁️';
    if (code === 45 || code === 48) return '🌫️';
    if (code >= 51 && code <= 55) return '🌦️';
    if (code >= 61 && code <= 65) return '🌧️';
    if (code >= 71 && code <= 77) return '❄️';
    if (code >= 80 && code <= 82) return '⛈️';
    if (code >= 85 && code <= 86) return '🌨️';
    if (code >= 95 && code <= 99) return '⛈️';
    return '🌡️';
}

// Initialize
function init() {
    updateTime();
    updateWeather();
    setInterval(updateTime, 1000);
    setInterval(updateWeather, 600000); // Update weather every 10 minutes
}

init();