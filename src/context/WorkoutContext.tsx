import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import { Workout } from '../types';
import { loadWorkouts, saveWorkouts } from '../storage/workoutStorage';

interface WorkoutContextType {
    workouts: Workout[];
    isLoading: boolean;
    addWorkout: (workout: Omit<Workout, 'id'>) => Promise<void>;
    deleteWorkout: (id: string) => Promise<void>;
}

export const WorkoutContext = createContext<WorkoutContextType | undefined>(undefined);

export const WorkoutProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [workouts, setWorkouts] = useState<Workout[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchWorkouts = async () => {
            try {
                const storedWorkouts = await loadWorkouts();
                setWorkouts(storedWorkouts);
            } catch (error) {
                console.error('Failed to load workouts on startup', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchWorkouts();
    }, []);

     const addWorkout = async (newWorkoutData: Omit<Workout, 'id'>) => {
        const newWorkout: Workout = {
            ...newWorkoutData,
            id: Date.now().toString(),
        };
        const updatedWorkouts = [newWorkout, ...workouts];

        setWorkouts(updatedWorkouts);
        await saveWorkouts(updatedWorkouts);
    };

    const deleteWorkout = async (id: string) => {
        const updatedWorkouts = workouts.filter((workout) => workout.id !== id);

        setWorkouts(updatedWorkouts);
        await saveWorkouts(updatedWorkouts);
    };

    return(
        <WorkoutContext.Provider
            value={{ workouts, isLoading, addWorkout, deleteWorkout}}
        >
            {children}
        </WorkoutContext.Provider>
    );
};