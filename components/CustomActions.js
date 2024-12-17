import { TouchableOpacity, View, Text, StyleSheet, Alert } from "react-native";
import { useActionSheet } from '@expo/react-native-action-sheet';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const CustomActions = ({ wrapperStyle, iconTextStyle, onSend, storage, userID }) => {
  const actionSheet = useActionSheet();

  const generateReference = (uri) => {
    const timeStamp = (new Date()).getTime();
    const imageName = uri.split("/")[uri.split("/").length - 1];
    return `${userID}-${timeStamp}-${imageName}`;
  }

  const uploadToFirebase = async (imageURI) => {
    const uniqueRefString = generateReference(imageURI);
    const newUploadRef = ref(storage, uniqueRefString);
    const response = await fetch(imageURI);
    const blob = await response.blob();
    uploadBytes(newUploadRef, blob).then(async (snapshot) => {
      const imageURL = await getDownloadURL(snapshot.ref)
      onSend([{ 
        image: imageURL,
        user: { _id: userID, name: "User Name" }, 
        createdAt: new Date(),
      }]);
    });
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert("Permission denied", "You need to allow access to your photos.");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync();
    if (!result.canceled) {
      await uploadToFirebase(result.assets[0].uri);
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
      await uploadToFirebase(result.assets[0].uri);
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
