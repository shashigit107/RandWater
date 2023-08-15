// import messaging from '@react-native-firebase/messaging';
// import notifee, {AndroidLaunchActivityFlag} from '@notifee/react-native';

// export async function requestUserPermission() {
//   const authStatus = await messaging().requestPermission();
//   const enabled =
//     authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
//     authStatus === messaging.AuthorizationStatus.PROVISIONAL;

//   if (enabled) {
//     getToken();
//     notificationListner();
//   }
// }

// const getToken = async () => {
//   try {
//     const fcmToken = await messaging().getToken();
//     if (fcmToken) {
//       // console.log('new token', fcmToken);
//       global.fcm_token = fcmToken;
//     }
//   } catch (error) {
//     console.log('Firebase error', error);
//   }
// };

// export const notificationListner = async () => {
//   await notifee.requestPermission();

//   const channelId = await notifee.createChannel({
//     id: 'default',
//     name: 'Default Channel',
//   });

//   messaging().onNotificationOpenedApp(remoteMessage => {
//     console.log(
//       'Notification caused app to open from background state:',
//       remoteMessage.notification,
//     );
//   });

//   messaging().onMessage(async remoteMessage => {
//     console.log('recived in foreground', remoteMessage);
//     await notifee.displayNotification({
//       title: remoteMessage?.notification?.title,
//       body: remoteMessage?.notification?.body,
//       android: {
//         channelId,
//         smallIcon: 'ic_small_icon',
//         pressAction: {
//           id: 'default',
//           launchActivity: 'default',
//           launchActivityFlags: [AndroidLaunchActivityFlag.SINGLE_TOP],
//         },
//       },
//     });
//   });

//   messaging()
//     .getInitialNotification()
//     .then(remoteMessage => {
//       if (remoteMessage) {
//         console.log(
//           'Notification caused app to open from quit state:',
//           remoteMessage.notification,
//         );
//       }
//     });
// };
