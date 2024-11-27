// import the screens
import Start from './components/Start';
import Chat from './components/Chat';

// import react Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// import Firebase modules
import { initializeApp } from "firebase/app";
import { getFirestore, enableNetwork, disableNetwork } from "firebase/firestore";

// import NetInfo
import NetInfo from '@react-native-community/netinfo';
import { useEffect, useState } from 'react';

// Create the navigator
const Stack = createNativeStackNavigator();

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

  // State to hold connection status
  const [isConnected, setIsConnected] = useState(true);

  // Monitor network connectivity
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      const connected = state.isConnected && state.isInternetReachable;
      setIsConnected(connected);

      // Enable or disable Firestore network based on connectivity
      if (connected) {
        enableNetwork(db).catch((error) => console.error("Error enabling network:", error));
      } else {
        disableNetwork(db).catch((error) => console.error("Error disabling network:", error));
      }
    });

    // Cleanup subscription on component unmount
    return () => unsubscribe();
  }, [db]);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="Chat">
          {props => <Chat db={db} isConnected={isConnected} {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
