

const API_KEYS = {
    OPENWEATHER: '9b88143e699d705afc21d8361112923e'
};

const BASE_URL = 'https://api.openweathermap.org/data/2.5';

/**
 * Fetch weather data by city name
 * @param {string} city - City name
 * @returns {Promise<Object>} Weather data
 */
export const getWeatherByCity = async (city) => {
    try {
        const response = await fetch(
            `${BASE_URL}/weather?q=${city}&appid=${API_KEYS.OPENWEATHER}&units=metric`
        );

        if (!response.ok) {
            // Fallback to mock data if API fails (e.g. rate limit)
            console.warn(`Weather API error: ${response.status}. Using mock data.`);
            return getMockWeatherData(city);
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching weather data:', error);
        console.warn('Using mock data due to error.');
        return getMockWeatherData(city);
    }
};

// Mock data generator for fallback
const getMockWeatherData = (cityName = 'Delhi') => ({
    name: cityName,
    main: {
        temp: 28,
        feels_like: 30,
        humidity: 45,
        pressure: 1012,
    },
    weather: [
        {
            id: 721,
            main: 'Haze',
            description: 'haze',
            icon: '50d',
        },
    ],
    wind: {
        speed: 3.5,
    },
    visibility: 4000,
    sys: {
        // Realistic sunrise/sunset times for India (around 6:30 AM and 6:00 PM)
        sunrise: Math.floor(new Date().setHours(6, 30, 0, 0) / 1000),
        sunset: Math.floor(new Date().setHours(18, 0, 0, 0) / 1000),
    },
});

/**
 * Fetch weather data by coordinates
 * @param {number} lat - Latitude
 * @param {number} lon - Longitude
 * @returns {Promise<Object>} Weather data
 */
export const getWeatherByCoordinates = async (lat, lon) => {
    try {
        const response = await fetch(
            `${BASE_URL}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEYS.OPENWEATHER}`
        );

        if (!response.ok) {
            throw new Error(`Weather API error: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching weather by coordinates:', error);
        throw error;
    }
};

/**
 * Fetch weather alerts by coordinates
 * Uses OpenWeatherMap One Call API to get weather alerts
 * @param {number} lat - Latitude
 * @param {number} lon - Longitude
 * @returns {Promise<Array>} Weather alerts array
 */
export const getWeatherAlerts = async (lat, lon) => {
    try {
        // OneCall API 3.0 endpoint for alerts
        const response = await fetch(
            `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,daily&appid=${API_KEYS.OPENWEATHER}`
        );

        if (!response.ok) {
            console.warn(`Weather Alerts API error: ${response.status}`);
            return [];
        }

        const data = await response.json();
        return data.alerts || [];
    } catch (error) {
        console.error('Error fetching weather alerts:', error);
        return [];
    }
};

/**
 * Fetch 10-day weather forecast by coordinates
 * @param {number} lat - Latitude
 * @param {number} lon - Longitude
 * @returns {Promise<Array>} 10-day forecast array
 */
export const getWeatherForecast = async (lat, lon) => {
    try {
        // Using 5 day / 3 hour forecast API (free tier)
        const response = await fetch(
            `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEYS.OPENWEATHER}`
        );

        if (!response.ok) {
            console.warn(`Weather Forecast API error: ${response.status}`);
            return getMockForecastData();
        }

        const data = await response.json();

        // Group by day and get daily forecast
        const dailyForecasts = [];
        const processedDates = new Set();

        data.list.forEach(item => {
            const date = new Date(item.dt * 1000);
            const dateStr = date.toDateString();

            // Take noon forecast (12:00) for each day
            if (!processedDates.has(dateStr) && date.getHours() === 12) {
                processedDates.add(dateStr);
                dailyForecasts.push({
                    date: dateStr,
                    temp: Math.round(item.main.temp),
                    tempMin: Math.round(item.main.temp_min),
                    tempMax: Math.round(item.main.temp_max),
                    description: item.weather[0].description,
                    icon: item.weather[0].icon,
                    humidity: item.main.humidity,
                    windSpeed: item.wind.speed,
                    rain: item.rain ? item.rain['3h'] || 0 : 0,
                });
            }
        });

        return dailyForecasts.slice(0, 10); // Return up to 10 days
    } catch (error) {
        console.error('Error fetching weather forecast:', error);
        return getMockForecastData();
    }
};

// Mock forecast data for fallback
const getMockForecastData = () => {
    const forecasts = [];
    const today = new Date();

    for (let i = 0; i < 10; i++) {
        const date = new Date(today);
        date.setDate(date.getDate() + i);

        forecasts.push({
            date: date.toDateString(),
            temp: 25 + Math.floor(Math.random() * 10),
            tempMin: 20 + Math.floor(Math.random() * 5),
            tempMax: 30 + Math.floor(Math.random() * 10),
            description: ['clear sky', 'few clouds', 'scattered clouds', 'partly cloudy'][Math.floor(Math.random() * 4)],
            icon: '01d',
            humidity: 40 + Math.floor(Math.random() * 40),
            windSpeed: 2 + Math.random() * 5,
            rain: Math.random() > 0.7 ? Math.random() * 10 : 0,
        });
    }

    return forecasts;
};
