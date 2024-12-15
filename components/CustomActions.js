import { TouchableOpacity, View, Text, StyleSheet, Alert } from "react-native";
import { useActionSheet } from '@expo/react-native-action-sheet';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const CustomActions = ({ wrapperStyle, iconTextStyle, onSend, storage }) => {
  const actionSheet = useActionSheet();

  const uploadToFirebase = async (uri) => {
    const blob = await fetch(uri).then((res) => res.blob());
    const filename = uri.substring(uri.lastIndexOf('/') + 1);
    const storageRef = ref(storage, `images/${filename}`);
    await uploadBytes(storageRef, blob);
    return await getDownloadURL(storageRef);
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert("Permission denied", "You need to allow access to your photos.");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync();
    if (!result.canceled) {
      const imageUrl = await uploadToFirebase(result.uri);
      onSend([{ image: imageUrl }]);
    }
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert("Permission denied", "You need to allow access to your camera.");
      return;
    }
    const result = await ImagePicker.launchCameraAsync();
    if (!result.canceled) {
      const imageUrl = await uploadToFirebase(result.uri);
      onSend([{ image: imageUrl }]);
    }
  };

  const getLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert("Permission denied", "You need to allow location access.");
      return;
    }
    const location = await Location.getCurrentPositionAsync({});
    if (location) {
      onSend([{ location: { latitude: location.coords.latitude, longitude: location.coords.longitude } }]);
    }
  };

  const onActionPress = () => {
    const options = ['Select an image from library', 'Take a photo', 'Share location', 'Cancel'];
    const cancelButtonIndex = options.length - 1;

    actionSheet.showActionSheetWithOptions(
      { options, cancelButtonIndex },
      async (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            await pickImage();
            break;
          case 1:
            await takePhoto();
            break;
          case 2:
            await getLocation();
            break;
          default:
            break;
        }
      }
    );
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onActionPress}>
      <View style={[styles.wrapper, wrapperStyle]}>
        <Text style={[styles.iconText, iconTextStyle]}>+</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 26,
    height: 26,
    marginLeft: 10,
    marginBottom: 10,
  },
  wrapper: {
    borderRadius: 13,
    borderColor: '#b2b2b2',
    borderWidth: 2,
    flex: 1,
  },
  iconText: {
    color: '#b2b2b2',
    fontWeight: 'bold',
    fontSize: 10,
    backgroundColor: 'transparent',
    textAlign: 'center',
  },
});

export default CustomActions;
