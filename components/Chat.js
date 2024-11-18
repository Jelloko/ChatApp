import { useState, useEffect } from 'react';
import { Bubble, GiftedChat } from "react-native-gifted-chat";
import { StyleSheet, View, Text, KeyboardAvoidingView, Platform } from 'react-native';

const Chat = ({ route, navigation }) => {
  const [messages, setMessages] = useState([]);
  const { name, bgColor } = route.params;
  const onSend = (newMessages) => {
  setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages))
  } 

  const renderBubble = (props) => {
    return <Bubble
      {...props}
      wrapperStyle={{
        right: {
          backgroundColor: "#000"
        },
        left: {
          backgroundColor: "#FFF"
        }
      }}
    />
  }

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: "Hello developer",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "React Native",
          avatar: "https://placeimg.com/140/140/any",
        },
      },
      {
        _id: 2,
        text: 'You have entered the chat',
        createdAt: new Date(),
        system: true,
      },
    ]);
  }, []);

  useEffect(() => {
    navigation.setOptions({ title: name || 'ChatApp' }); 
  }, [name]);

  return (
    <View style={[styles.container, { backgroundColor: bgColor || '#FFFFFF' }]}>
    <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
        onSend={messages => onSend(messages)}
        user={{
          _id: 1
        }}
        />
        { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null }
        </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Chat;

