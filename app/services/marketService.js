// Mock market data
const MARKET_DATA = [
    {
        id: 1,
        name: 'Rice (Basmati)',
        currentPrice: 3500,
        previousPrice: 3300,
        unit: 'quintal',
        marketLocation: 'Delhi',
        lastUpdated: '2023-04-25',
        category: 'grain'
    },
    {
        id: 2,
        name: 'Wheat',
        currentPrice: 2200,
        previousPrice: 2100,
        unit: 'quintal',
        marketLocation: 'Ludhiana',
        lastUpdated: '2023-04-24',
        category: 'grain'
    },
    {
        id: 3,
        name: 'Tomato',
        currentPrice: 20,
        previousPrice: 25,
        unit: 'kg',
        marketLocation: 'Bangalore',
        lastUpdated: '2023-04-26',
        category: 'vegetable'
    },
    {
        id: 4,
        name: 'Onion',
        currentPrice: 15,
        previousPrice: 18,
        unit: 'kg',
        marketLocation: 'Nashik',
        lastUpdated: '2023-04-25',
        category: 'vegetable'
    },
    {
        id: 5,
        name: 'Apple (Shimla)',
        currentPrice: 120,
        previousPrice: 110,
        unit: 'kg',
        marketLocation: 'Shimla',
        lastUpdated: '2023-04-23',
        category: 'fruit'
    },
    {
        id: 6,
        name: 'Banana',
        currentPrice: 60,
        previousPrice: 55,
        unit: 'dozen',
        marketLocation: 'Chennai',
        lastUpdated: '2023-04-26',
        category: 'fruit'
    },
    {
        id: 7,
        name: 'Mustard Seeds',
        currentPrice: 5200,
        previousPrice: 5000,
        unit: 'quintal',
        marketLocation: 'Jaipur',
        lastUpdated: '2023-04-24',
        category: 'oilseed'
    },
    {
        id: 8,
        name: 'Soybean',
        currentPrice: 4800,
        previousPrice: 5100,
        unit: 'quintal',
        marketLocation: 'Indore',
        lastUpdated: '2023-04-25',
        category: 'oilseed'
    },
    {
        id: 9,
        name: 'Cardamom',
        currentPrice: 1200,
        previousPrice: 1050,
        unit: 'kg',
        marketLocation: 'Cochin',
        lastUpdated: '2023-04-22',
        category: 'spice'
    },
    {
        id: 10,
        name: 'Turmeric',
        currentPrice: 7500,
        previousPrice: 7200,
        unit: 'quintal',
        marketLocation: 'Erode',
        lastUpdated: '2023-04-23',
        category: 'spice'
    },
    {
        id: 11,
        name: 'Potato',
        currentPrice: 18,
        previousPrice: 20,
        unit: 'kg',
        marketLocation: 'Agra',
        lastUpdated: '2023-04-26',
        category: 'vegetable'
    },
    {
        id: 12,
        name: 'Maize',
        currentPrice: 1900,
        previousPrice: 1850,
        unit: 'quintal',
        marketLocation: 'Patna',
        lastUpdated: '2023-04-25',
        category: 'grain'
    }
];

/**
 * Get market prices (simulated API call)
 * @returns {Promise<Array>} Market price data
 */
export const getMarketPrices = () => {
    // Simulate API call
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(MARKET_DATA);
        }, 500);
    });
};
