import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { Platform, SafeAreaView, StatusBar, View } from 'react-native';
import Geocoder from 'react-native-geocoding';
import { check, PERMISSIONS } from 'react-native-permissions';
import { GOOGLE_MAPS_API_KEY } from './common/apiconstants';
import { CAMERA_PERMISSION } from './common/constants';
import AppNavigator from './navigation';
// import {requestUserPermission} from './services/notificationService';
import { colors, styles } from './themes';
import messaging from '@react-native-firebase/messaging';
import AppUpdatePopup from './components/common/AppUpdatePopup'
import { useSelector } from 'react-redux';

const App = () => {
  // const { popupFlag } = useSelector(state => state.settings)
  // const settings = useSelector(state => state.settings);
  
  useEffect(() => {
    Geocoder.init(GOOGLE_MAPS_API_KEY);
    // requestUserPermission();

    if (Platform.OS === 'ios') {
      check(PERMISSIONS.IOS.CAMERA).then(res => {
        if (res === 'granted') {
          AsyncStorage.setItem(CAMERA_PERMISSION, 'true');
        }
      });
    } else {
      check(PERMISSIONS.ANDROID.CAMERA).then(res => {
        if (res === 'granted') {
          AsyncStorage.setItem(CAMERA_PERMISSION, 'true');
        }
      });
    }

    messaging()
      .requestPermission({
        alert: true,
        provisional: true,
        sound: true,
      })
      .then(auth => {
        // console.log(auth, 'authoriztion');
      })
      .catch(err => {
        console.log(err);
      });
      

    messaging()
      .getToken()
      .then(token => {
        // console.log(token, 'token');
        global.fcm_token = token;
      });
    messaging().onMessage(async remoteMessage => {
      fun()
      console.log(remoteMessage, 'remoteMessage');
    });
    const fun=()=>{
          console.log("-------remote massage for admin check------------") 
    }

    // Register background handler
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
      // global.messageFromBackground = remoteMessage;
    });
  }, []);
  const renderPopp=()=>{
    // console.log("-------------hey-------------",popupFlag)
  }
  //Cover notch screen for IOS
  const SafeAreaApp = () => {
    return (
      // <SafeAreaView style={styles.flex}>
      <>
        <StatusBar
          barStyle="dark-content"
          backgroundColor={colors.colorWhite}
        />
        <AppNavigator />
        <AppUpdatePopup />
        {renderPopp()}
      </>
      // </SafeAreaView>
    );
  };

  return <SafeAreaApp />;
};

export default App;
