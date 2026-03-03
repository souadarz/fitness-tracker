import React from 'react'
import { Button, Text, View } from 'react-native'

const HomeScreen = ({ navigation }: any) => {
  return (
    <View>
      <Text>
        Home Screen
      </Text>
      <Button 
      title= "ajouter une séance"
      onPress={() => navigation.navigate("AddWorkout")}
      >
        
      </Button>
    </View>
  )
}

export default HomeScreen