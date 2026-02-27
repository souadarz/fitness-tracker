import { ReactNode, createContext, useEffect, useState } from "react";
import { Workout } from "../types";

interface WorkoutContextType {
    workouts: Workout[];
    isLoading: boolean;
    error: string | null;
    addWorkout: (data: Omit<Workout, 'id'>) => Promise<void>;
}

export const WorkoutContext = createContext<WorkoutContextType | undefined>(undefined);

export const WorkoutProvider = ({ children }: { children: ReactNode }) {
    const [workouts, steWorkouts] = useState<Workout[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const init = async () => {
            setIsLoading(true);
            try {
                const stored = await loadWorkouts();
                steWorkouts(stored)
            } catch (error) {
                setError("impossible de chager les séances");
            } finally {
                setIsLoading(false);
            }
        };
        init();
    }, []);

    const addWorkout = async (data: Omit<Workout, 'id'>) => {
        const newWorkout: Workout = {
            ...data,
            id: Date.now().toString(),
        };
        steWorkouts((prev) => [newWorkout, ...prev]);
    };

    return(
        <WorkoutContext.Provider
            value={{ workouts, isLoading, error, addWorkout}}
        >
            {children}
        </WorkoutContext.Provider>
    );
};