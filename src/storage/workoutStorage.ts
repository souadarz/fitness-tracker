import AsyncStorage from '@react-native-async-storage/async-storage';
import { Workout } from '../types';

const WORKOUTS_STORAGE_KEY = '@fitness_app_workouts';

export const saveWorkouts = async (workouts: Workout[]): Promise<void> => {
    try {
        const jsonValue = JSON.stringify(workouts);
        await AsyncStorage.setItem(WORKOUTS_STORAGE_KEY, jsonValue);
    } catch (e) {
        console.error('Error saving workouts to AsyncStorage:', e);
        throw e;
    }
};

export const loadWorkouts = async (): Promise<Workout[]> => {
    try {
        const jsonValue = await AsyncStorage.getItem(WORKOUTS_STORAGE_KEY);
        return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (e) {
        console.error('Error loading workouts from AsyncStorage:', e);
        return [];
    }
};
