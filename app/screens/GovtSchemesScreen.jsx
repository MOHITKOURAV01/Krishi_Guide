import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity, Linking, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../utils/constants';
import { getGovtSchemes } from '../services/schemeService';
import { useLanguage } from '../context/LanguageContext';

export default function GovtSchemesScreen() {
    const { t } = useLanguage();
    const [schemes, setSchemes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadSchemes();
    }, []);

    const loadSchemes = async () => {
        try {
            const data = await getGovtSchemes();
            setSchemes(data);
        } catch (error) {
            console.error('Failed to load schemes:', error);
        } finally {
            setLoading(false);
        }
    };

    const openLink = (url) => {
        Linking.openURL(url);
    };

    const renderSchemeItem = ({ item }) => (
        <View style={styles.schemeCard}>
            <Text style={styles.schemeName}>{item.name}</Text>
            <Text style={styles.schemeDescription}>{item.description}</Text>

            <View style={styles.benefitsContainer}>
                <Text style={styles.benefitsTitle}>{t('benefits') || 'Benefits'}:</Text>
                {item.benefits.map((benefit, index) => (
                    <View key={index} style={styles.benefitItem}>
                        <Ionicons name="checkmark-circle" size={16} color={COLORS.primary} />
                        <Text style={styles.benefitText}>{benefit}</Text>
                    </View>
                ))}
            </View>

            <TouchableOpacity style={styles.applyButton} onPress={() => openLink(item.link)}>
                <Text style={styles.applyButtonText}>{t('applyNow') || 'Apply Now'}</Text>
                <Ionicons name="arrow-forward" size={18} color="#fff" />
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={schemes}
                renderItem={renderSchemeItem}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.listContainer}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={() => (
                    <Image
                        source={require('../../assets/govt_banner.png')}
                        style={styles.bannerImage}
                        resizeMode="cover"
                    />
                )}
            />
        </View>
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
        padding: 20,
        backgroundColor: COLORS.primary,
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#fff',
        opacity: 0.9,
    },
    listContainer: {
        padding: 16,
    },
    schemeCard: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 20,
        marginBottom: 16,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    schemeHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
        gap: 12,
    },
    schemeName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.text,
        flex: 1,
    },
    schemeDesc: {
        fontSize: 14,
        color: COLORS.textLight,
        lineHeight: 20,
        marginBottom: 16,
    },
    benefitsContainer: {
        backgroundColor: '#F3F4F6',
        padding: 12,
        borderRadius: 8,
        marginBottom: 16,
    },
    benefitsTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: COLORS.text,
        marginBottom: 8,
    },
    benefitRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 4,
    },
    benefitText: {
        fontSize: 14,
        color: COLORS.text,
        flex: 1,
    },
    applyButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.primary,
        padding: 12,
        borderRadius: 8,
        gap: 8,
    },
    applyButtonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 16,
    },
});
