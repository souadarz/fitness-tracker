import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, ViewStyle, TextStyle } from 'react-native';

interface ButtonProps {
    title: string;
    onPress: () => void;
    variant?: 'primary' | 'secondary' | 'danger';
    isLoading?: boolean;
    style?: ViewStyle;
    textStyle?: TextStyle;
}

export const Button: React.FC<ButtonProps> = ({
    title,
    onPress,
    variant = 'primary',
    isLoading = false,
    style,
    textStyle,
}) => {
    const getVariantStyles = () => {
        switch (variant) {
            case 'secondary':
                return styles.secondary;
            case 'danger':
                return styles.danger;
            case 'primary':
            default:
                return styles.primary;
        }
    };

    const getVariantTextStyles = () => {
        switch (variant) {
            case 'secondary':
                return styles.secondaryText;
            case 'danger':
            case 'primary':
            default:
                return styles.primaryText;
        }
    };

    return (
        <TouchableOpacity
            style={[styles.button, getVariantStyles(), style]}
            onPress={onPress}
            disabled={isLoading}
            activeOpacity={0.8}
        >
            {isLoading ? (
                <ActivityIndicator color={variant === 'secondary' ? '#6B7280' : '#FFFFFF'} />
            ) : (
                <Text style={[styles.text, getVariantTextStyles(), textStyle]}>{title}</Text>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        paddingVertical: 16,
        paddingHorizontal: 24,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginVertical: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    primary: {
        backgroundColor: '#3B82F6', 
    },
    secondary: {
        backgroundColor: '#F3F4F6',
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
    danger: {
        backgroundColor: '#EF4444',
    },
    text: {
        fontSize: 16,
        fontWeight: '600',
    },
    primaryText: {
        color: '#FFFFFF',
    },
    secondaryText: {
        color: '#374151',
    },
});
