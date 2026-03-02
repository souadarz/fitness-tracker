import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import AddWorkoutScreen from "../screens/AddWorkoutScreen";
import WorkoutDetailsScreen from "../screens/WorkoutDetailsScreen";

const Stack = createNativeStackNavigator();
export const AppNavigator = () => {
    return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerTitleAlign: "center",
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Mes séances" }}
        />
        <Stack.Screen
          name="AddWorkout"
          component={AddWorkoutScreen}
          options={{ title: "Ajouter une séance" }}
        />
        <Stack.Screen
          name="WorkoutDetails"
          component={WorkoutDetailsScreen}
          options={{ title: "Détails" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}