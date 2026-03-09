import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Text, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useWorkout } from '../hooks/useWorkout';
import { Input } from '../components/Input'
import { Button } from '../components/Button';
import { Workout } from '../types';

type IntensityOptions = Workout['intensity'];

export const AddWorkoutScreen = () => {
    const navigation = useNavigation();
    const { addWorkout } = useWorkout();

    const [type, setType] = useState('');
    const [duration, setDuration] = useState('');
    const [intensity, setIntensity] = useState<IntensityOptions>('moyenne');
    const [notes, setNotes] = useState('');

    const [errors, setErrors] = useState<{ type?: string; duration?: string }>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const intensities: { label: string; value: IntensityOptions; color: string }[] = [
        { label: 'Faible', value: 'faible', color: '#10B981' },
        { label: 'Moyenne', value: 'moyenne', color: '#F59E0B' },
        { label: 'Élevée', value: 'élevée', color: '#EF4444' },
    ];

    const validate = () => {
        const newErrors: { type?: string; duration?: string } = {};
        if (!type.trim()) {
            newErrors.type = 'Veuillez saisir le type de séance';
        }

        const durationNum = parseInt(duration, 10);
        if (!duration.trim()) {
            newErrors.duration = 'Veuillez saisir la durée';
        } else if (isNaN(durationNum) || durationNum <= 0) {
            newErrors.duration = 'Veuillez saisir une durée valide en minutes';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSave = async () => {
        if (!validate()) return;

        setIsSubmitting(true);
        try {
            await addWorkout({
                type: type.trim(),
                duration: parseInt(duration, 10),
                intensity,
                date: new Date().toISOString(),
                notes: notes.trim() || undefined,
            });
            navigation.goBack();
        } catch (error) {
            console.error('Failed to add workout', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.keyboardContainer}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
        >
            <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
                <View style={styles.formSection}>
                    <Input
                        label="Type d'activité"
                        placeholder="Ex: Course à pied, Musculation..."
                        value={type}
                        onChangeText={(text) => {
                            setType(text);
                            if (errors.type) setErrors((prev) => ({ ...prev, type: undefined }));
                        }}
                        error={errors.type}
                        autoCapitalize="sentences"
                    />

                    <Input
                        label="Durée (en minutes)"
                        placeholder="Ex: 45"
                        value={duration}
                        onChangeText={(text) => {
                            setDuration(text);
                            if (errors.duration) setErrors((prev) => ({ ...prev, duration: undefined }));
                        }}
                        keyboardType="numeric"
                        error={errors.duration}
                    />
                </View>

                <View style={styles.formSection}>
                    <Text style={styles.label}>Intensité</Text>
                    <View style={styles.intensityContainer}>
                        {intensities.map((item) => {
                            const isActive = intensity === item.value;
                            return (
                                <TouchableOpacity
                                    key={item.value}
                                    style={[
                                        styles.intensityPill,
                                        isActive && { backgroundColor: item.color, borderColor: item.color },
                                    ]}
                                    onPress={() => setIntensity(item.value)}
                                    activeOpacity={0.7}
                                >
                                    <Text
                                        style={[
                                            styles.intensityText,
                                            isActive && styles.intensityTextActive,
                                        ]}
                                    >
                                        {item.label}
                                    </Text>
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                </View>

                <View style={styles.formSection}>
                    <Input
                        label="Notes (facultatif)"
                        placeholder="Comment s'est passée la séance ?"
                        value={notes}
                        onChangeText={setNotes}
                        multiline
                        numberOfLines={4}
                        style={styles.textArea}
                        textAlignVertical="top"
                    />
                </View>

                <View style={styles.footer}>
                    <Button
                        title="Enregistrer la séance"
                        onPress={handleSave}
                        isLoading={isSubmitting}
                        style={styles.submitButton}
                    />
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    keyboardContainer: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    container: {
        padding: 24,
        paddingBottom: 40,
    },
    formSection: {
        marginBottom: 24,
    },
    label: {
        fontSize: 14,
        fontWeight: '500',
        color: '#374151',
        marginBottom: 12,
    },
    intensityContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    intensityPill: {
        flex: 1,
        paddingVertical: 12,
        marginHorizontal: 4,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#D1D5DB',
        backgroundColor: '#F9FAFB',
        alignItems: 'center',
        justifyContent: 'center',
    },
    intensityText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#4B5563',
    },
    intensityTextActive: {
        color: '#FFFFFF',
        fontWeight: '600',
    },
    textArea: {
        height: 120,
        paddingTop: 16,
    },
    footer: {
        marginTop: 16,
    },
    submitButton: {
        width: '100%',
    },
});
