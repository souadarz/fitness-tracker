import { useContext } from "react";
import {WorkoutContext} from "../context/WorkoutContext";
 
export const useWorkout = () => {
    const context = useContext(WorkoutContext);

    if(!context){
        throw new Error('useWorkout doit être utilisé dans un WorkoutProvider');
    }
    return context;
}