
export interface Workout {
  id: string;
  type: string;
  duration: number;
  intensity: 'faible' | 'moyenne' | 'élevée';
  date: string;
  notes?: string;
}