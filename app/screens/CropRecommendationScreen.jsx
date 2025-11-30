import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator,
    Alert,
    Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../utils/constants';
import InputField from '../components/InputField';
import CommonButton from '../components/CommonButton';
import { getCropRecommendations } from '../services/cropService';
import { useLanguage } from '../context/LanguageContext';

export default function CropRecommendationScreen() {
    const { t } = useLanguage();
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [formData, setFormData] = useState({
        nitrogen: '',
        phosphorus: '',
        potassium: '',
        ph: '',
        rainfall: '',
        temperature: '',
    });

    const handleInputChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handlePredict = async () => {
        // Basic validation
        if (Object.values(formData).some((val) => !val)) {
            Alert.alert('Error', 'Please fill all fields');
            return;
        }

        setLoading(true);
        try {
            // Call the service with correct parameter order
            const recommendations = await getCropRecommendations(
                Number(formData.temperature),
                65, // humidity (default)
                Number(formData.rainfall),
                Number(formData.ph),
                Number(formData.nitrogen),
                Number(formData.phosphorus),
                Number(formData.potassium)
            );

            setResult(recommendations);
        } catch (error) {
            Alert.alert('Error', 'Failed to get recommendation');
        } finally {
            setLoading(false);
        }
    };

    return (
        <ScrollView style={styles.container}>
            {/* Banner Image */}
            <Image
                source={require('../../assets/crop_banner.png')}
                style={styles.bannerImage}
                resizeMode="cover"
            />

            <View style={styles.form}>
                <View style={styles.row}>
                    <View style={styles.halfInput}>
                        <InputField
                            label={t('nitrogen')}
                            placeholder="0-140"
                            keyboardType="numeric"
                            value={formData.nitrogen}
                            onChangeText={(val) => handleInputChange('nitrogen', val)}
                        />
                    </View>
                    <View style={styles.halfInput}>
                        <InputField
                            label={t('phosphorus')}
                            placeholder="5-145"
                            keyboardType="numeric"
                            value={formData.phosphorus}
                            onChangeText={(val) => handleInputChange('phosphorus', val)}
                        />
                    </View>
                </View>

                <View style={styles.row}>
                    <View style={styles.halfInput}>
                        <InputField
                            label={t('potassium')}
                            placeholder="5-205"
                            keyboardType="numeric"
                            value={formData.potassium}
                            onChangeText={(val) => handleInputChange('potassium', val)}
                        />
                    </View>
                    <View style={styles.halfInput}>
                        <InputField
                            label={t('phLevel')}
                            placeholder="0-14"
                            keyboardType="numeric"
                            value={formData.ph}
                            onChangeText={(val) => handleInputChange('ph', val)}
                        />
                    </View>
                </View>

                <View style={styles.row}>
                    <View style={styles.halfInput}>
                        <InputField
                            label={t('rainfall')}
                            placeholder="mm"
                            keyboardType="numeric"
                            value={formData.rainfall}
                            onChangeText={(val) => handleInputChange('rainfall', val)}
                        />
                    </View>
                    <View style={styles.halfInput}>
                        <InputField
                            label={t('temperature')}
                            placeholder="°C"
                            keyboardType="numeric"
                            value={formData.temperature}
                            onChangeText={(val) => handleInputChange('temperature', val)}
                        />
                    </View>
                </View>

                <CommonButton
                    title={t('getRecommendation')}
                    onPress={handlePredict}
                    loading={loading}
                    style={styles.button}
                />

                {result && result.length > 0 && (
                    <View style={styles.resultCard}>
                        <Text style={styles.resultTitle}>{t('recommendedCrop')}</Text>
                        {result.map((rec, index) => (
                            <View key={index} style={styles.cropItem}>
                                <Text style={styles.cropName}>🌾 {rec.crop}</Text>
                                <Text style={styles.cropReason}>{rec.reason}</Text>
                            </View>
                        ))}
                    </View>
                )}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    bannerImage: {
        width: '100%',
        height: 200,
    },
    header: {
        paddingVertical: 16,
        paddingHorizontal: 20,
        backgroundColor: COLORS.primary,
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 14,
        color: '#fff',
        opacity: 0.9,
    },
    form: {
        padding: 16,
        paddingBottom: 24,
    },
    row: {
        flexDirection: 'row',
        gap: 16,
    },
    halfInput: {
        flex: 1,
    },
    button: {
        marginTop: 12,
    },
    resultCard: {
        marginTop: 24,
        padding: 24,
        backgroundColor: '#fff',
        borderRadius: 16,
        alignItems: 'center',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
    },
    resultTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.text,
        marginBottom: 16,
    },
    cropItem: {
        marginBottom: 16,
        padding: 12,
        backgroundColor: '#f0f9ff',
        borderRadius: 8,
        borderLeftWidth: 4,
        borderLeftColor: COLORS.primary,
    },
    cropName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: COLORS.primary,
        marginBottom: 4,
    },
    cropReason: {
        fontSize: 14,
        color: COLORS.textLight,
        lineHeight: 20,
    },
    // Intro Screen Styles
    introContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    introContent: {
        width: '85%',
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        borderRadius: 24,
        padding: 32,
        alignItems: 'center',
        backdropFilter: 'blur(10px)',
    },
    iconCircle: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
    },
    introTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 8,
        textAlign: 'center',
    },
    introSubtitle: {
        fontSize: 16,
        color: '#fff',
        opacity: 0.9,
        marginBottom: 40,
        textAlign: 'center',
    },
    featuresContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginBottom: 40,
    },
    featureItem: {
        alignItems: 'center',
        flex: 1,
    },
    featureIcon: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    featureText: {
        fontSize: 12,
        color: '#fff',
        textAlign: 'center',
        fontWeight: '500',
    },
    analyzeButton: {
        width: '100%',
        borderRadius: 16,
        overflow: 'hidden',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
    analyzeButtonGradient: {
        paddingVertical: 16,
        paddingHorizontal: 32,
        alignItems: 'center',
    },
    analyzeButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1e3a8a',
    },
    backButton: {
        marginRight: 12,
    },
});
