import { useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';

const Chat = ({ route, navigation }) => {
  const { name, bgColor } = route.params; 

  useEffect(() => {
    navigation.setOptions({ title: name || 'ChatApp' }); 
  }, [name]);

  return (
    <View style={[styles.container, { backgroundColor: bgColor || '#FFFFFF' }]}>
    <Text style={styles.text}>Chat Here!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    color: '#FFFFFF',
  },
});

export default Chat;

