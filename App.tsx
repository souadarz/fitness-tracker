import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { WorkoutProvider } from './src/context/WorkoutContext';
import { AppNavigator } from './src/navigation/AppNavigator';

export default function App() {
  return (
    <WorkoutProvider>
      <AppNavigator />
    </WorkoutProvider>
  );
}