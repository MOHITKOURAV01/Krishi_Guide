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
    if (rainfall > 80 && temp > 20 && soilPH >= 5.0 && soilPH <= 8.0) {
        recommendations.push({
            crop: 'Rice',
            reason: 'Suitable for high rainfall (>80mm) and warm temperature.'
        });
    }

    // Wheat
    if (rainfall > 30 && rainfall < 120 && temp > 10 && temp < 30 && soilPH >= 5.5 && soilPH <= 7.5) {
        recommendations.push({
            crop: 'Wheat',
            reason: 'Good for moderate rainfall and cool to warm temperature (10-30°C).'
        });
    }

    // Maize
    if (nitrogen > 40 && temp > 18 && temp < 35 && soilPH >= 5.5 && soilPH <= 7.5) {
        recommendations.push({
            crop: 'Maize',
            reason: 'Requires nitrogen (>40) and warm temperature.'
        });
    }

    // Chickpea
    if (rainfall < 80 && temp > 15 && temp < 30 && soilPH >= 6.0 && soilPH <= 8.5) {
        recommendations.push({
            crop: 'Chickpea',
            reason: 'Thrives in lower rainfall and wider pH range.'
        });
    }

    // Soybean
    if (temp > 20 && temp < 35 && rainfall > 50 && soilPH >= 6.0 && soilPH <= 7.5) {
        recommendations.push({
            crop: 'Soybean',
            reason: 'Excellent for warm climate (20-35°C) and moderate rain.'
        });
    }

    // Mustard
    if (temp > 10 && temp < 25 && rainfall < 50 && soilPH >= 6.0 && soilPH <= 7.5) {
        recommendations.push({
            crop: 'Mustard',
            reason: 'Best for cool, dry weather conditions.'
        });
    }

    // Groundnut
    if (temp > 20 && temp < 30 && rainfall > 40 && soilPH >= 5.0 && soilPH <= 7.0) {
        recommendations.push({
            crop: 'Groundnut',
            reason: 'Prefers warm conditions and slightly acidic to neutral soil.'
        });
    }

    // Tomato
    if (temp > 18 && temp < 30 && potassium > 40 && soilPH >= 6.0 && soilPH <= 7.0) {
        recommendations.push({
            crop: 'Tomato',
            reason: 'Requires potassium (>40) and moderate temperature.'
        });
    }

    // Potato
    if (potassium > 60 && temp > 10 && temp < 25 && soilPH >= 4.8 && soilPH <= 6.5) {
        recommendations.push({
            crop: 'Potato',
            reason: 'Needs high potassium and cool weather.'
        });
    }

    // Cotton
    if (temp > 21 && rainfall > 50 && soilPH >= 5.5 && soilPH <= 8.5) {
        recommendations.push({
            crop: 'Cotton',
            reason: 'Requires warm climate and moderate rainfall.'
        });
    }

    // Sugarcane
    if (rainfall > 100 && nitrogen > 60 && temp > 20) {
        recommendations.push({
            crop: 'Sugarcane',
            reason: 'High water and nutrient requirement crop.'
        });
    }

    // Millets (Hardy crop fallback)
    if (rainfall < 50 || soilPH > 8.0 || soilPH < 5.5) {
        recommendations.push({
            crop: 'Millets (Bajra/Jowar)',
            reason: 'Hardy crop suitable for extreme pH or low rainfall conditions.'
        });
    }

    // Fallback recommendations based on pH if list is short
    if (recommendations.length < 2) {
        if (soilPH < 5.5) {
            recommendations.push({
                crop: 'Blueberries',
                reason: 'Acidic soil (<5.5 pH) is ideal.'
            });
            recommendations.push({
                crop: 'Sweet Potatoes',
                reason: 'Tolerant to acidic soil.'
            });
        } else if (soilPH > 7.5) {
            recommendations.push({
                crop: 'Cabbage',
                reason: 'Alkaline soil tolerant.'
            });
            recommendations.push({
                crop: 'Cauliflower',
                reason: 'Grows well in alkaline conditions.'
            });
            recommendations.push({
                crop: 'Spinach',
                reason: 'Can tolerate higher pH levels.'
            });
        } else {
            recommendations.push({
                crop: 'Beans',
                reason: 'Versatile crop for neutral soil.'
            });
            recommendations.push({
                crop: 'Carrots',
                reason: 'Good for standard soil conditions.'
            });
            recommendations.push({
                crop: 'Peas',
                reason: 'Cool season crop for neutral soil.'
            });
        }
    }

    return recommendations;
};
