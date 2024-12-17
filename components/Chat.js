import { useState, useEffect } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Bubble, GiftedChat, InputToolbar } from "react-native-gifted-chat";
import { StyleSheet, View, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { collection, query, orderBy, onSnapshot, addDoc } from "firebase/firestore";
import CustomActions from './CustomActions';
import MapView, { Marker } from "react-native-maps";

const Chat = ({ route, navigation, db, storage, isConnected }) => {
  const [messages, setMessages] = useState([]);
  const { name, bgColor, userID } = route.params;

  const renderBubble = (props) => {
    return (
      <Bubble
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
    );
  };

  const renderInputToolbar = (props) => {
    if (isConnected) {
      return <InputToolbar {...props} />;
    }
    return null; // Prevent input when offline
  };

  const renderCustomActions = (props) => {
    return <CustomActions  onSend={onSend} storage={storage} userID={userID} {...props} />;
  };

  const renderCustomView = (props) => {
    const { currentMessage } = props;
    if (currentMessage.location) {
      return (
        <MapView
          style={{
            width: 150,
            height: 100,
            borderRadius: 13,
            margin: 3,
          }}
          region={{
            latitude: currentMessage.location.latitude,
            longitude: currentMessage.location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker
            coordinate={{
              latitude: currentMessage.location.latitude,
              longitude: currentMessage.location.longitude,
            }}
          />
        </MapView>
      );
    }
    return null;
  };

  useEffect(() => {
    navigation.setOptions({ title: name || 'ChatApp' });
  }, [name, navigation]);

  useEffect(() => {
    let unsubscribe;

    const fetchCachedMessages = async () => {
      try {
        const cachedMessages = await AsyncStorage.getItem('messages');
        if (cachedMessages) {
          setMessages(JSON.parse(cachedMessages));
        } else {
          console.log("No cached messages found.");
        }
      } catch (error) {
        console.error("Error loading cached messages:", error);
      }
    };

    const cacheMessages = async (messagesToCache) => {
      try {
        await AsyncStorage.setItem('messages', JSON.stringify(messagesToCache));
      } catch (error) {
        console.error("Error caching messages:", error);
      }
    };

    if (isConnected) {
      // Fetch messages from Firestore
      const messagesQuery = query(
        collection(db, "messages"),
        orderBy("createdAt", "desc")
      );

      unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
        const fetchedMessages = snapshot.docs.map(doc => {
          const data = doc.data();
          return {
            _id: doc.id,
            text: data.text,
            createdAt: data.createdAt.toDate(),
            user: data.user,
            image: data.image, // Ensure `image` is included
            location: data.location, // Ensure `location` is included
          };
        });

        setMessages(fetchedMessages);
        cacheMessages(fetchedMessages);
      });
    } else {
      // Load messages from local storage
      fetchCachedMessages();
      Alert.alert("You are offline", "Showing cached messages.");
    }

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [db, isConnected]);

  const onSend = (newMessages) => {
    if (isConnected) {
      addDoc(collection(db, "messages"), {
        ...newMessages[0],
        createdAt: new Date(),
        user: { // Add user information here
          _id: userID,
          name: name,
        },
      }).catch((error) => console.error("Error sending message:", error));
    } else {
      Alert.alert("You are offline");
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: bgColor || '#FFFFFF' }]}>
      <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
        renderInputToolbar={renderInputToolbar} // Conditionally render the InputToolbar
        renderActions={renderCustomActions}
        renderCustomView={renderCustomView}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: userID,
          name: name,
        }}
      />
      {Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null}
      { Platform.OS === "ios"?<KeyboardAvoidingView behavior="padding" />: null }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Chat;