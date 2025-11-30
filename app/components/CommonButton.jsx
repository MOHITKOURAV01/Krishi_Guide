import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { COLORS } from '../utils/constants';

/**
 * Reusable button component
 */
export default function CommonButton({ title, onPress, loading = false, variant = 'primary', disabled = false }) {
    const isPrimary = variant === 'primary';

    return (
        <TouchableOpacity
            style={[
                styles.button,
                isPrimary ? styles.primaryButton : styles.secondaryButton,
                disabled && styles.disabledButton
            ]}
            onPress={onPress}
            disabled={disabled || loading}
        >
            {loading ? (
                <ActivityIndicator color={isPrimary ? '#fff' : COLORS.primary} />
            ) : (
                <Text style={[
                    styles.buttonText,
                    isPrimary ? styles.primaryText : styles.secondaryText
                ]}>
                    {title}
                </Text>
            )}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        paddingVertical: 14,
        paddingHorizontal: 24,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 48,
    },
    primaryButton: {
        backgroundColor: COLORS.primary,
    },
    secondaryButton: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: COLORS.primary,
    },
    disabledButton: {
        opacity: 0.5,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '600',
    },
    primaryText: {
        color: '#fff',
    },
    secondaryText: {
        color: COLORS.primary,
    },
});
