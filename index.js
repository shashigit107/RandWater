/**
 * @format
 */

import React from 'react';
import {AppRegistry} from 'react-native';
import App from './src';
import {name as appName} from './app.json';
import {Provider} from 'react-redux';
import store from './src/redux/store';
// import messaging from '@react-native-firebase/messaging';
// import notifee from '@notifee/react-native';

// messaging().setBackgroundMessageHandler(async remoteMessage => {
//   console.log('Message handled in the background!', remoteMessage);
//   global.messageFromBackground = remoteMessage;
// });

// notifee.onBackgroundEvent(async ({type, detail}) => {
//   const {notification} = detail;
//   global.messageFromBackground = notification;
// });

const HeadlessCheck = ({isHeadless}) => {
  if (isHeadless) {
    return null;
  }

  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

AppRegistry.registerComponent(appName, () => HeadlessCheck);
