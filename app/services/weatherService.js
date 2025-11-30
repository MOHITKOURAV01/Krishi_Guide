import { API_KEYS } from '../utils/constants';

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
            description: 'haze',
            icon: '50d',
        },
    ],
    wind: {
        speed: 3.5,
    },
    visibility: 4000,
    sys: {
        sunrise: Math.floor(Date.now() / 1000) - 3600, // 1 hour ago
        sunset: Math.floor(Date.now() / 1000) + 25200, // 7 hours from now
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
