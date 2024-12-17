***

## ChatApp Documentation

***

***Overview***

The ChatApp is a mobile application designed to provide a seamless chat experience with a simple interface. Users can:

Enter their name and choose a background color on the start page.

Chat with others in a conversation view.

Send text messages, images, and location data.

Access their messages offline.

***User Stories***

As a new user, I want to quickly join a chat room without needing a complex sign-up process so I can start chatting right away.

As a user, I want to customize my chat experience by choosing a unique background color so I can make the interface feel more personal.

As a user, I want to send images so I can easily share photos that matter to me.

As a user, I want to share my location effortlessly so I can avoid the hassle of typing out directions.

As a user, I want the app to automatically save my chats locally so I can access them even when I lose internet connection.

As a user, I want the app to display timestamps for each message so I can keep track of when conversations happened.

***Technologies Used***

React Native: JavaScript framework for building mobile applications.

Expo: Development platform for React Native.

GiftedChat: React Native library for chat interfaces.

Android Studio Emulator: For testing the app.

ImagePicker: For image upload and sharing.

React Native Maps: To display shared locations.

Firebase: Backend for real-time database and file storage.

AsyncStorage: Local storage for offline functionality.

***Setup Instructions***

**Step 1: Clone the Repository**

Open your terminal and run the following commands:
$ git clone https://github.com/your-username/chatapp.git
$ cd chatapp

**Step 2: Install Dependencies**

Make sure you have Node.js v18.20.4 installed. You can download it from Node.js. Then, run the following command to install project dependencies:
$ npm install

Next, install the Expo CLI globally if you don’t already have it:
$ npm install -g expo-cli

**Step 3: Configure Firebase**

Go to Firebase Console, create a new project, and add a web app.

Copy your Firebase configuration credentials.

Open the App.js file in the project and replace the firebaseConfig object with your credentials:
const firebaseConfig = {
  apiKey: "YOUR_API_KEY"

  authDomain: "YOUR_AUTH_DOMAIN"

  projectId: "YOUR_PROJECT_ID"

  storageBucket: "YOUR_STORAGE_BUCKET"

  messagingSenderId: "YOUR_MESSAGING_SENDER_ID"

  appId: "YOUR_APP_ID"
};

**Step 4: Run the App Locally**

Start the Expo development server:
$ npm start

Scan the QR code in your terminal using the Expo Go app (available on iOS and Android) or launch the app using an emulator.
