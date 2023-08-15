/* eslint-disable react-hooks/exhaustive-deps */
import messaging from '@react-native-firebase/messaging';
import * as React from 'react';
import {View,Alert} from 'react-native';
import {StackNavStrings} from './navigation/NavigationKeys';
import notifee, {AndroidLaunchActivityFlag} from '@notifee/react-native';
import { makeFlag } from './redux/actions/settingsAction';
import { useDispatch } from 'react-redux';
import { broadcastNotificationFlag } from './redux/actions/settingsAction';

export function PushNotificationComponent({navigation}) {
  const dispatch=useDispatch()
  React.useEffect(() => {
    requestUserPermission();
    // When the application is running, but in the background.
    messaging().onNotificationOpenedApp(remoteMessage => {
      navigation?.navigate(StackNavStrings.Reports);
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage,
      );
    });

    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage,
          );
        } else {
          // console.log(
          //   'Notification caused app to open from quit state BUT NULL:',
          // );
        }
      });

    // when the app is in foreground handle notification from here
    messaging().onMessage(async remoteMessage => {
      const channelId = await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
      });
      // dispatch(makeFlag(true))
      console.log('remoteMessageforeGroung ==> ', remoteMessage);
      console.log("------------------------",remoteMessage?.data.broadcast_message)

      if(remoteMessage?.data?.broadcast_message==true){
        // console.log("-------------if3",remoteMessage?.notification?.body)
        dispatch(broadcastNotificationFlag(true,remoteMessage?.notification?.body))
        // console.log("-------------if2",remoteMessage?.notification?.body)
        Alert.alert('Rand Water', remoteMessage?.notification?.body, [
          {
            text: 'Dismiss',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          // {text: 'OK', onPress: () => console.log('OK Pressed')},
        ]);
      }
      // console.log("-------------if2",remoteMessage?.notification?.body)
     
        
     
      await notifee.displayNotification({
        title: remoteMessage?.notification?.title,
        body: remoteMessage?.notification?.body,
        android: {
          channelId,
          smallIcon: 'ic_small_icon',
          pressAction: {
            id: 'default',
            launchActivity: 'default',
            launchActivityFlags: [AndroidLaunchActivityFlag.SINGLE_TOP],
          },
        },
      });
    });
  }, []);

  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission({
      alert: true,
      announcement: false,
      badge: true,
      sound: true,
    });
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    if (enabled) {
      getFcmToken();
    } else {
      getFcmToken();
    }
  };

  // get the fcm token
  const getFcmToken = async () => {
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
      global.fcm_token = fcmToken;
      // console.log('Your Firebase Token is Push Notification:', fcmToken);
    } else {
      console.log('Failed', 'No token received');
    }
  };
  return <View />;
}
