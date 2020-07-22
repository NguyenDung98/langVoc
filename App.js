import React from "react";
import {
  Text,
} from "react-native";

import Screens from './src/navigations';

import {
  useFonts,
  Montserrat_400Regular,
  Montserrat_400Regular_Italic,
  Montserrat_500Medium,
  Montserrat_500Medium_Italic,
} from "@expo-google-fonts/montserrat";

import {
  Pacifico_400Regular,
} from "@expo-google-fonts/pacifico";

import {
  DancingScript_700Bold,
} from "@expo-google-fonts/dancing-script";


export default function App() {
  let [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_400Regular_Italic,
    Montserrat_500Medium,
    Montserrat_500Medium_Italic,
    Pacifico_400Regular,
    DancingScript_700Bold
  });

  if (!fontsLoaded) return <Text>Loading...</Text>;

  return <Screens/>;
}
