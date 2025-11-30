/**
 * Get crop recommendations based on soil and climate data
 * @param {number} temp - Temperature in Celsius
 * @param {number} humidity - Humidity percentage
 * @param {number} rainfall - Rainfall in mm
 * @param {number} soilPH - Soil pH value
 * @param {number} nitrogen - Nitrogen content
 * @param {number} phosphorus - Phosphorus content
 * @param {number} potassium - Potassium content
 * @returns {Array} Array of crop recommendations
 */
export const getCropRecommendations = (
    temp,
    humidity,
    rainfall,
    soilPH,
    nitrogen,
    phosphorus,
    potassium
) => {
    const recommendations = [];

    // Rice
    if (rainfall > 100 && temp > 20 && soilPH >= 5.5 && soilPH <= 6.5) {
        recommendations.push({
            crop: 'Rice',
            reason: 'Thrives in high rainfall (>100mm), warm temp (>20°C) and slightly acidic soil.'
        });
    }

    // Wheat
    if (rainfall > 40 && rainfall < 100 && temp > 15 && temp < 25 && soilPH >= 6.0 && soilPH <= 7.5) {
        recommendations.push({
            crop: 'Wheat',
            reason: 'Suitable for moderate rainfall, cool temp (15-25°C) and neutral soil.'
        });
    }

    // Maize
    if (nitrogen > 50 && phosphorus > 40 && potassium > 30 && temp > 18 && temp < 30 && soilPH >= 5.5 && soilPH <= 7.0) {
        recommendations.push({
            crop: 'Maize',
            reason: 'Requires rich nutrients (N>50, P>40, K>30) and warm temp.'
        });
    }

    // Chickpea
    if (rainfall < 60 && temp > 15 && temp < 30 && soilPH >= 6.0 && soilPH <= 8.0) {
        recommendations.push({
            crop: 'Chickpea',
            reason: 'Good for low rainfall areas and wide pH range.'
        });
    }

    // Potato
    if (potassium > 80 && temp > 15 && temp < 24 && soilPH >= 5.0 && soilPH <= 6.5) {
        recommendations.push({
            crop: 'Potato',
            reason: 'Needs high potassium (>80) and cool temperatures.'
        });
    }

    // Cotton
    if (temp > 22 && rainfall > 70 && soilPH >= 5.5 && soilPH <= 8.0) {
        recommendations.push({
            crop: 'Cotton',
            reason: 'Requires warm climate (>22°C) and moderate rainfall.'
        });
    }

    // Sugarcane
    if (rainfall > 120 && nitrogen > 80 && phosphorus > 60 && potassium > 80 && temp > 20 && soilPH >= 6.0 && soilPH <= 7.5) {
        recommendations.push({
            crop: 'Sugarcane',
            reason: 'Needs heavy rainfall, high nutrients and warm climate.'
        });
    }

    // Fallback recommendations based on pH
    if (recommendations.length === 0) {
        if (soilPH < 5.5) {
            recommendations.push({
                crop: 'Blueberries',
                reason: 'Soil is acidic (<5.5 pH). Blueberries thrive here.'
            });
            recommendations.push({
                crop: 'Sweet Potatoes',
                reason: 'Tolerant to acidic soil conditions.'
            });
        } else if (soilPH > 7.5) {
            recommendations.push({
                crop: 'Cabbage',
                reason: 'Soil is alkaline (>7.5 pH). Cabbage grows well.'
            });
            recommendations.push({
                crop: 'Cauliflower',
                reason: 'Suitable for alkaline soil conditions.'
            });
        } else {
            recommendations.push({
                crop: 'Beans',
                reason: 'General recommendation for neutral soil.'
            });
            recommendations.push({
                crop: 'Carrots',
                reason: 'Good root vegetable for standard conditions.'
            });
        }
    }

    return recommendations;
};
