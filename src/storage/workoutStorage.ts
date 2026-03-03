import AsyncStorage from "@react-native-async-storage/async-storage";
import { Workout } from "../types";

const STORAGE_KEY = '@fitness_workouts';

export const loadWorkouts = async (): Promise<Workout[]> => {
  try {
    const json = await AsyncStorage.getItem(STORAGE_KEY);
    if (json === null) return [];
    return JSON.parse(json) as Workout[];
  } catch (error) {
    console.error('Erreur lors du chargement des séances :', error);
    throw new Error('Impossible de charger les séances.');
  }
};