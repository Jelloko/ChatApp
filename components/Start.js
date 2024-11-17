import { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ImageBackground } from 'react-native';

const Start = ({ navigation }) => {
  const [name, setName] = useState('');
  const [bgColor, setBgColor] = useState('#FFFFFF'); 

  const colors = ['#090C08', '#474056', '#8A95A5', '#B9C6AE']; 

  return (
    <ImageBackground 
      source={require('../assets/Background-Image.png')} 
      style={styles.background}
    >
      <Text style={styles.title}>ChatApp!</Text>
      
      <View style={styles.box}>
        <TextInput
          style={styles.textInput}
          value={name}
          onChangeText={setName}
          placeholder="Type your username here"
          placeholderTextColor="#757083"
        />
        
        <Text style={styles.colorPickerTitle}>Pick a Background Color:</Text>

        <View style={styles.colorPicker}>
          {colors.map((color, index) => (
            <TouchableOpacity 
              key={index} 
              style={[styles.colorCircle, { backgroundColor: color }]} 
              onPress={() => setBgColor(color)} 
            />
          ))}
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Chat', { name: name, bgColor: bgColor })} 
        >
          <Text style={styles.buttonText}>Start Chatting</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#FFFFFF',
    position: 'absolute',
    top: 50, 
    width: '100%',
  },
  box: {
    width: '88%',
    height: '44%',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5, 
    alignItems: 'center',
    justifyContent: 'space-evenly', 
    position: 'absolute',
    bottom: 150, 
    alignSelf: 'center',
  },
  textInput: {
    width: '100%',
    padding: 15,
    borderWidth: 1,
    borderColor: '#757083',
    borderRadius: 5,
    fontSize: 16,
    fontWeight: '300',
    color: '#757083',
    opacity: 0.7,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
  colorPickerTitle: {
    fontSize: 16,
    fontWeight: '300',
    color: '#757083',
    opacity: 1,
    marginBottom: -20,
  },
  colorPicker: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
  },
  colorCircle: {
    width: 50,
    height: 50,
    borderRadius: 50/2, 
    margin: 10,
  },
  button: {
    width: '100%',
    padding: 20,
    borderRadius: 5,
    backgroundColor: '#757083',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

export default Start;
