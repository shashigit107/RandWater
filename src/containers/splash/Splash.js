import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect} from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {ACCESS_TOKENS, APP_OPEN, USER} from '../../common/constants';
import {StackNavStrings} from '../../navigation/NavigationKeys';
import {PushNotificationComponent} from '../../PushNotificationComponent';
import { useSelector } from "react-redux";

const Splash = ({navigation}) => {
  const { popupFlag } = useSelector(state => state.settings)
  useEffect(() => {
    global.navigation = navigation;
    //Hide splash screen
    SplashScreen.hide();
    makeAsyncProcessing();
  }, []);

  // global.FullData?.is_guest_user;

  const makeAsyncProcessing = () => {
    //Get users data from AsyncStorage
    AsyncStorage.multiGet([USER, ACCESS_TOKENS, APP_OPEN], (error, result) => {
      console.log("checkloginuser",result)
      if (result !== null) {
        let loginUser = result[0][1];
        let token = result[1][1];
        let AppOpen = result[2][1];
        if (loginUser && token) {
          let user = JSON.parse(loginUser);
          // let token = token;
          // const {accessToken, refreshToken} = AllToken;
          global.accessToken = token; //set access token globally
          // global.refreshToken = refreshToken; //set refresh token globally
          global.FullData = user;
          //check profile is complete or not
          navigation.replace(StackNavStrings.TabNavigator);
        } else {
          if (!AppOpen) {
            navigation.replace(StackNavStrings.Tutorial);
          } else {
            //Navigate to Login Screen
            navigation.reset({
              index: 0,
              routes: [{name: StackNavStrings.AuthNavigator}],
            });
          }
        }
      } else {
      }
    });
  };
  const renderPop=()=>{
    
    // console.log("hey------i----execute",popupFlag)
  }

  return (
    <View>
      <PushNotificationComponent navigation={navigation} />
      <ActivityIndicator size={'large'} />
      {renderPop()}
    </View>
  );
};

export default Splash;
