import React from "react";
import {
  Text,
} from "react-native";
import * as firebase from 'firebase';
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

const firebaseConfig = {
  apiKey: "AIzaSyBi5qsI9c-pLM3ZfpbURKu0eWobRrAZMFw",
  authDomain: "langvoc-7e512.firebaseapp.com",
  databaseURL: "https://langvoc-7e512.firebaseio.com",
  projectId: "langvoc-7e512",
  storageBucket: "langvoc-7e512.appspot.com",
  messagingSenderId: "466806669258",
  appId: "1:466806669258:web:1d77583a310c20aced9933",
  measurementId: "G-QLFGKV7CWR"
};

firebase.initializeApp(firebaseConfig);

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
