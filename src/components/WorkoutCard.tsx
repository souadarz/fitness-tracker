import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Workout } from '../types';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Activity, Clock, Flame, ChevronRight } from 'lucide-react-native';

interface WorkoutCardProps {
    workout: Workout;
    onPress: () => void;
}

export const WorkoutCard: React.FC<WorkoutCardProps> = ({ workout, onPress }) => {
    const getIntensityColor = (intensity: string) => {
        switch (intensity) {
            case 'faible':
                return '#10B981';
            case 'moyenne':
                return '#F59E0B';
            case 'élevée':
                return '#EF4444';
            default:
                return '#6B7280';
        }
    };

    const formattedDate = format(new Date(workout.date), 'dd MMMM yyyy', { locale: fr });

    return (
        <TouchableOpacity
            style={styles.card}
            onPress={onPress}
            activeOpacity={0.7}
        >
            <View style={styles.header}>
                <View style={styles.titleContainer}>
                    <View style={styles.iconContainer}>
                        <Activity color="#3B82F6" size={20} />
                    </View>
                    <Text style={styles.type}>{workout.type}</Text>
                </View>
                <Text style={styles.date}>{formattedDate}</Text>
            </View>

            <View style={styles.detailsContainer}>
                <View style={styles.detailItem}>
                    <Clock color="#6B7280" size={16} />
                    <Text style={styles.detailText}>{workout.duration} min</Text>
                </View>

                <View style={styles.detailItem}>
                    <Flame color={getIntensityColor(workout.intensity)} size={16} />
                    <Text style={[styles.detailText, { color: getIntensityColor(workout.intensity) }]}>
                        {workout.intensity}
                    </Text>
                </View>
            </View>

            <View style={styles.footer}>
                {workout.notes ? (
                    <Text style={styles.notes} numberOfLines={1}>
                        {workout.notes}
                    </Text>
                ) : (
                    <View style={{ flex: 1 }} />
                )}
                <ChevronRight color="#CBD5E1" size={20} />
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
        borderWidth: 1,
        borderColor: '#F1F5F9',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconContainer: {
        backgroundColor: '#EFF6FF',
        padding: 8,
        borderRadius: 8,
        marginRight: 12,
    },
    type: {
        fontSize: 18,
        fontWeight: '700',
        color: '#1E293B',
        textTransform: 'capitalize',
    },
    date: {
        fontSize: 12,
        color: '#94A3B8',
        fontWeight: '500',
    },
    detailsContainer: {
        flexDirection: 'row',
        marginBottom: 12,
        paddingBottom: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#F1F5F9',
    },
    detailItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 16,
        backgroundColor: '#F8FAFC',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
    },
    detailText: {
        marginLeft: 6,
        fontSize: 14,
        fontWeight: '600',
        color: '#475569',
        textTransform: 'capitalize',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    notes: {
        fontSize: 13,
        color: '#64748B',
        flex: 1,
        marginRight: 12,
        fontStyle: 'italic',
    },
});
