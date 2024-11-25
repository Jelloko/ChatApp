// import the screens
import Start from './components/Start';
import Chat from './components/Chat';

// import react Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Create the navigator
const Stack = createNativeStackNavigator();

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const App = () => {
  const firebaseConfig = {
    apiKey: "AIzaSyBQhnrtWBgG5C3d6hAWajAgyKm_ahCxPJ4",
    authDomain: "chatapp-9a5d7.firebaseapp.com",
    projectId: "chatapp-9a5d7",
    storageBucket: "chatapp-9a5d7.firebasestorage.app",
    messagingSenderId: "97622808509",
    appId: "1:97622808509:web:3e485a3d1e6f30d8a964d4",
    measurementId: "G-C0EW20MHEL"
  };

  // Initialize Firebase
const app = initializeApp(firebaseConfig);

 // Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Start"
      >
        <Stack.Screen
          name="Start"
          component={Start}
        />
        <Stack.Screen
         name="Chat"
       >
         {props => <Chat db={db} {...props} />}
       </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;