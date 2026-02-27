export type ActivityType = 'course' | 'musculation' | 'vélo' | 'autre';

export type Intensity = 'faible' | 'moyenne' | 'élevée';

export interface Workout {
    id: string;
    activity: ActivityType;
    duration: number;
    intensity: Intensity;
    date: string;
    notes?: string;
}