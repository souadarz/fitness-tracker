import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useWorkout } from '../hooks/useWorkout';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Button } from '../components/Button';
import { Clock, Flame, Calendar, Activity, AlignLeft } from 'lucide-react-native';

type WorkoutDetailsRouteProp = RouteProp<RootStackParamList, 'WorkoutDetails'>;

export const WorkoutDetailsScreen = () => {
    const route = useRoute<WorkoutDetailsRouteProp>();
    const navigation = useNavigation();
    const { workouts, deleteWorkout } = useWorkout();

    const { workoutId } = route.params;
    const workout = workouts.find((w) => w.id === workoutId);

    if (!workout) {
        return (
            <View style={styles.centerContainer}>
                <Text style={styles.errorText}>Séance introuvable</Text>
                <Button title="Retour" onPress={() => navigation.goBack()} style={styles.backButton} />
            </View>
        );
    }

    const handleDelete = () => {
        // Basic confirmation dialog logic for React Native
        import('react-native').then(({ Alert }) => {
            Alert.alert(
                'Supprimer la séance',
                'Voulez-vous vraiment supprimer cette séance ? Cette action est irréversible.',
                [
                    { text: 'Annuler', style: 'cancel' },
                    {
                        text: 'Supprimer',
                        style: 'destructive',
                        onPress: async () => {
                            await deleteWorkout(workout.id);
                            navigation.goBack();
                        }
                    },
                ]
            );
        });
    };

    const formattedDate = format(new Date(workout.date), 'EEEE d MMMM yyyy à HH:mm', { locale: fr });

    const getIntensityColor = (intensity: string) => {
        switch (intensity) {
            case 'faible': return '#10B981';
            case 'moyenne': return '#F59E0B';
            case 'élevée': return '#EF4444';
            default: return '#6B7280';
        }
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <View style={styles.headerCard}>
                <View style={styles.iconContainer}>
                    <Activity color="#3B82F6" size={32} />
                </View>
                <Text style={styles.title}>{workout.type}</Text>
            </View>

            <View style={styles.detailsCard}>
                <View style={styles.detailRow}>
                    <View style={styles.detailIconContainer}>
                        <Calendar color="#64748B" size={20} />
                    </View>
                    <View style={styles.detailTextContainer}>
                        <Text style={styles.detailLabel}>Date</Text>
                        <Text style={[styles.detailValue, { textTransform: 'capitalize' }]}>{formattedDate}</Text>
                    </View>
                </View>

                <View style={styles.divider} />

                <View style={styles.detailRow}>
                    <View style={styles.detailIconContainer}>
                        <Clock color="#64748B" size={20} />
                    </View>
                    <View style={styles.detailTextContainer}>
                        <Text style={styles.detailLabel}>Durée</Text>
                        <Text style={styles.detailValue}>{workout.duration} minutes</Text>
                    </View>
                </View>

                <View style={styles.divider} />

                <View style={styles.detailRow}>
                    <View style={[styles.detailIconContainer, { backgroundColor: getIntensityColor(workout.intensity) + '20' }]}>
                        <Flame color={getIntensityColor(workout.intensity)} size={20} />
                    </View>
                    <View style={styles.detailTextContainer}>
                        <Text style={styles.detailLabel}>Intensité</Text>
                        <Text
                            style={[
                                styles.detailValue,
                                { color: getIntensityColor(workout.intensity), textTransform: 'capitalize' }
                            ]}
                        >
                            {workout.intensity}
                        </Text>
                    </View>
                </View>
            </View>

            {workout.notes && (
                <View style={styles.notesCard}>
                    <View style={styles.notesHeader}>
                        <AlignLeft color="#64748B" size={20} />
                        <Text style={styles.notesTitle}>Notes</Text>
                    </View>
                    <Text style={styles.notesText}>{workout.notes}</Text>
                </View>
            )}

            <Button
                title="Supprimer la séance"
                onPress={handleDelete}
                variant="danger"
                style={styles.deleteButton}
            />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F8FAFC',
        padding: 24,
    },
    errorText: {
        fontSize: 18,
        color: '#64748B',
        marginBottom: 24,
    },
    backButton: {
        width: '100%',
    },
    container: {
        flex: 1,
        backgroundColor: '#F8FAFC',
    },
    contentContainer: {
        padding: 24,
    },
    headerCard: {
        alignItems: 'center',
        marginBottom: 24,
    },
    iconContainer: {
        backgroundColor: '#EFF6FF',
        padding: 16,
        borderRadius: 64,
        marginBottom: 16,
    },
    title: {
        fontSize: 28,
        fontWeight: '800',
        color: '#1E293B',
        textTransform: 'capitalize',
    },
    detailsCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 16,
        marginBottom: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    detailRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
    },
    detailIconContainer: {
        backgroundColor: '#F1F5F9',
        padding: 12,
        borderRadius: 12,
        marginRight: 16,
    },
    detailTextContainer: {
        flex: 1,
    },
    detailLabel: {
        fontSize: 13,
        color: '#64748B',
        marginBottom: 4,
    },
    detailValue: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1E293B',
    },
    divider: {
        height: 1,
        backgroundColor: '#F1F5F9',
        marginLeft: 60, // Align with text
    },
    notesCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 20,
        marginBottom: 32,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    notesHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    notesTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1E293B',
        marginLeft: 8,
    },
    notesText: {
        fontSize: 15,
        color: '#475569',
        lineHeight: 24,
    },
    deleteButton: {
        marginTop: 8,
        marginBottom: 32,
    },
});
