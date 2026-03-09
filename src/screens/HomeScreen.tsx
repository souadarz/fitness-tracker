import React from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useWorkout } from '../hooks/useWorkout';
import { WorkoutCard } from '../components/WorkoutCard';
import { Plus, Dumbbell } from 'lucide-react-native';
import { Button } from '../components/Button';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export const HomeScreen = () => {
    const navigation = useNavigation<HomeScreenNavigationProp>();
    const { workouts, isLoading } = useWorkout();

    if (isLoading) {
        return (
            <View style={styles.centerContainer}>
                <ActivityIndicator size="large" color="#3B82F6" />
                <Text style={styles.loadingText}>Chargement des séances...</Text>
            </View>
        );
    }

    const renderEmptyState = () => (
        <View style={styles.emptyContainer}>
            <View style={styles.emptyIconContainer}>
                <Dumbbell color="#94A3B8" size={48} />
            </View>
            <Text style={styles.emptyTitle}>Aucune séance</Text>
            <Text style={styles.emptySubtitle}>
                Commencez à suivre votre progression en ajoutant votre première séance d'entraînement.
            </Text>
            <Button
                title="Ajouter une séance"
                onPress={() => navigation.navigate('AddWorkout')}
                style={styles.emptyButton}
            />
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={workouts}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <WorkoutCard
                        workout={item}
                        onPress={() => navigation.navigate('WorkoutDetails', { workoutId: item.id })}
                    />
                )}
                contentContainerStyle={workouts.length === 0 ? styles.listEmpty : styles.listContainer}
                ListEmptyComponent={renderEmptyState}
                showsVerticalScrollIndicator={false}
            />

            {workouts.length > 0 && (
                <View style={styles.fabContainer}>
                    <Button
                        title="Nouvelle Séance"
                        onPress={() => navigation.navigate('AddWorkout')}
                        style={styles.fab}
                    />
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FAFC',
    },
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F8FAFC',
    },
    loadingText: {
        marginTop: 16,
        color: '#64748B',
        fontSize: 16,
    },
    listContainer: {
        padding: 16,
        paddingBottom: 100, // Space for FAB
    },
    listEmpty: {
        flexGrow: 1,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
    },
    emptyIconContainer: {
        backgroundColor: '#F1F5F9',
        padding: 24,
        borderRadius: 100,
        marginBottom: 24,
    },
    emptyTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: '#1E293B',
        marginBottom: 8,
    },
    emptySubtitle: {
        fontSize: 15,
        color: '#64748B',
        textAlign: 'center',
        marginBottom: 32,
        lineHeight: 22,
    },
    emptyButton: {
        width: '100%',
    },
    fabContainer: {
        position: 'absolute',
        bottom: 24,
        left: 24,
        right: 24,
    },
    fab: {
        shadowColor: '#3B82F6',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
    },
});
