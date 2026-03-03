import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import { useWorkout } from "../hooks/useWorkout";
import { Intensity, ActivityType } from "../types";
import { Picker } from "@react-native-picker/picker";

type Props = NativeStackScreenProps<
  RootStackParamList,
  "AddWorkout"
>;

export default function AddWorkoutScreen({ navigation }: Props) {
  const { addWorkout } = useWorkout();

  const [duration, setDuration] = useState("");
  const [activity, setActivity] = useState<ActivityType>("course");
  const [intensity, setIntensity] = useState<Intensity>("faible");
  const [notes, setNotes] = useState("");

  const handleSubmit = async () => {
    if (!activity || !duration) {
      Alert.alert("Erreur", "Veuillez remplir les champs obligatoires");
      return;
    }

    await addWorkout({
      activity: activity as ActivityType,
      duration: Number(duration),
      intensity: intensity as Intensity,
      date: new Date().toISOString(),
      notes,
    });

    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text>Type d'activité</Text>
      {/* <TextInput
        style={styles.input}
        value={activity}
        onChangeText={(text) => setActivity(text as ActivityType)}
        placeholder="Ex: musculation"
      /> */}
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={activity}
          onValueChange={(itemValue) =>
            setActivity(itemValue as ActivityType)
          }
        >
          <Picker.Item label="Course" value="course" />
          <Picker.Item label="Musculation" value="musculation" />
          <Picker.Item label="Vélo" value="vélo" />
          <Picker.Item label="Autre" value="autre" />
        </Picker>
      </View>

      <Text>Durée (minutes)</Text>
      <TextInput
        style={styles.input}
        value={duration}
        onChangeText={(text) => setDuration(text.replace(/[^0-9]/g, ""))}
        keyboardType="numeric"
        placeholder="Ex: 45"
      />

      <Text>Intensité</Text>
      {/* <TextInput
        style={styles.input}
        value={intensity}
        onChangeText={(value) => setIntensity(value as Intensity)}
        placeholder="faible | moyenne | élevée"
      /> */}
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={intensity}
          onValueChange={(itemValue) =>
            setIntensity(itemValue as Intensity)
          }
        >
          <Picker.Item label="Faible" value="faible" />
          <Picker.Item label="Moyenne" value="moyenne" />
          <Picker.Item label="Élevée" value="élevée" />
        </Picker>
      </View>

      <Text>Notes (optionnel)</Text>
      <TextInput
        style={styles.input}
        value={notes}
        onChangeText={setNotes}
        placeholder="Notes..."
      />

      <Button title="Ajouter la séance" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#fff"
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#fff"
  },
});