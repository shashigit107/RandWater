import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect } from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { useDispatch, useSelector } from 'react-redux';
import images from '../../assets/images';
import { RightGrayArrow } from '../../assets/svgs';
import { getHeight } from '../../common/constants';
import WHeader from '../../components/common/WHeader';
import WLoader from '../../components/common/WLoader';
import WText from '../../components/common/WText';
import strings from '../../i18n/strings';
import { StackNavStrings } from '../../navigation/NavigationKeys';
import {
  clearSettingsData,
  deleteAccount,
  logOut,
} from '../../redux/actions/settingsAction';
import { LOGOUT_FAILED, LOGOUT_SUCCESS, UNAUTHORIZED } from '../../redux/types';
import { colors, styles } from '../../themes';
import { showPopupWithOk, showPopupWithOkAndCancel } from '../../utils/helpers';
import { getUserProfile } from '../../redux/actions/settingsAction';
import {
  GET_USER_PROFILE_FAILED,
  GET_USER_PROFILE_SUCCESS,
  DELETE_ACCOUNT_FAILED,
  DELETE_ACCOUNT_SUCCESS,
} from '../../redux/types';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
// import { setCurrentScreenName } from '../../common/CustomAnalytics';
import analytics from '@react-native-firebase/analytics';

const Settings = ({ navigation }) => {
  const settings = useSelector(state => state.settings);
  const dispatch = useDispatch();
  const [Id, setId] = React.useState('');
  //Loading State
  let isLoading = settings && settings.isLoading;
  console.log('isloading=', isLoading);
  useEffect(() => {
    let { actions } = settings;
    console.log("setinglogout", settings)
    if (actions) {
      let { type, message, data } = actions;
      if (type === LOGOUT_FAILED) {
        //Show Popup Message Of Error
        showPopupWithOk(strings.randWater, message);
        //Clear settings Data
        dispatch(clearSettingsData());
      } else if (type === LOGOUT_SUCCESS) {
        logoutApp('Logout');
        analytics().logScreenView({ Logout: 'Settings Screen', Settings_class: 'Settings.js', });
        //do something for success
        dispatch(clearSettingsData());
      } else if (type === UNAUTHORIZED) {
        //Show Error Message For Unauthorized
        showPopupWithOk(strings.randWater, message);
        //Clear settings Data
        dispatch(clearSettingsData());
      }
    }
  }, [settings]);

  useEffect(() => {
    dispatch(getUserProfile());
  }, []);

  useEffect(() => {
    let { actions } = settings;
    if (actions) {
      let { type, message, data } = actions;
      if (type === GET_USER_PROFILE_FAILED) {
        //Show Popup Message Of Error
        showPopupWithOk(strings.randWater, message);
      } else if (type === GET_USER_PROFILE_SUCCESS) {
        console.log(data?.data?.id);
        if (!!data?.data?.id) {
          setId(String(data?.data?.id));
        }
      }
    }
  }, [settings]);

  useEffect(() => {
    let { actions } = settings;
    if (actions) {
      let { type, message, data } = actions;
      if (type === DELETE_ACCOUNT_FAILED) {
        //Show Popup Message Of Error
        showPopupWithOk(strings.randWater, message);
        dispatch(clearSettingsData());
      } else if (type === DELETE_ACCOUNT_SUCCESS) {
        showPopupWithOk(
          strings.randWater,
          'Your account deleted successfully.',
        );

        logoutApp('DeleteAccount');
        analytics().logScreenView({ Delete_Account: 'Settings Screen', Settings_class: 'Settings.js', });
        dispatch(clearSettingsData());
      }
    }
  }, [settings]);

  const logoutApp = async (name) => {
    const isSignedIn = await GoogleSignin.isSignedIn();
    if (isSignedIn) {
      await GoogleSignin.signOut();
    }
    global.accessToken = ''
    await AsyncStorage.clear();
    navigation.reset({
      index: 0,
      routes: [{ name: StackNavStrings.AuthNavigator }],
    });
    // setCurrentScreenName(name)
  };

  const SettingOptions = ({ title, subTitle, style, Screen }) => {
    const logOutApi = () => {
      dispatch(logOut());
    };
    const deleteAccountApi = () => {
      dispatch(
        deleteAccount({
          id: Id,
        }),
      );
    };
    const onPressItem = () => {
      if (Screen === 'Log Out') {
        showPopupWithOkAndCancel(
          strings.randWater,
          'Are you sure you want to logout?',
          logOutApi,
        );
      } else if (Screen == 'Delete Account') {
        showPopupWithOkAndCancel(
          strings.randWater,
          'Are you sure you want to delete your Account?',
          deleteAccountApi,
        );
      } else {
        navigation.navigate(Screen);
      }
    };
    return (
      <TouchableOpacity
        style={[localStyles.optionContainer, style]}
        onPress={onPressItem}>
        <View>
          <WText type={'MA18'}>{title}</WText>
          <WText type={'MA14'}>{subTitle}</WText>
        </View>
        <RightGrayArrow />
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView style={styles.mainContainer}>
      <WHeader title={'Settings'} close />
      <FastImage source={images.tutorial1} style={localStyles.innerContainer}>
        <ScrollView
          contentContainerStyle={localStyles.container}
          showsVerticalScrollIndicator={false}>
          {!global.FullData?.is_guest_user && (
            <SettingOptions
              title={'Edit Profile'}
              subTitle={'EDIT YOUR PERSONAL INFO'}
              Screen={StackNavStrings.EditProfile}
            />
          )}
          {!global.FullData?.is_guest_user && (
            <SettingOptions
              title={'Reports'}
              subTitle={'ALL YOUR REPORT IN ONE SPACE'}
              Screen={StackNavStrings.Reports}
            />
          )}
          {!global.FullData?.is_guest_user && (
            <SettingOptions
              title={'Change Password'}
              subTitle={'CHANGE YOUR LOGIN PASSWORD'}
              Screen={StackNavStrings.ChangePassword}
            />
          )}
          <SettingOptions
            title={'Contact Us'}
            subTitle={'NEED TO GET IN TOUCH?'}
            Screen={StackNavStrings.ContactUs}
          />
          {/* <SettingOptions
            title={'Privacy Settings'}
            subTitle={'CONTROL YOUR PRIVACY'}
            Screen={StackNavStrings.PrivacySettings}
          /> */}
          <SettingOptions
            title={'Privacy Policy'} //Terms and Conditions
            subTitle={'OUR PRIVACY POLICY'} //TERMS AND CONDITIONS
            Screen={StackNavStrings.TermsAndConditions}
          />
          {!global.FullData?.is_guest_user && (
            <SettingOptions
              title={'Delete Account'}
              subTitle={'DELETE YOUR ACCOUNT'}
              Screen={'Delete Account'}
              style={styles.mt10}
            />
          )}
          {!global.FullData?.is_guest_user && (
            <SettingOptions
              title={'Log Out'}
              subTitle={'YOU NEED TO LOGOUT FROM APP?'}
              Screen={'Log Out'}
            />
          )}
        </ScrollView>
      </FastImage>
      {/* {isLoading && <WLoader />} */}
    </SafeAreaView>
  );
};

const localStyles = StyleSheet.create({
  container: {
    paddingBottom: getHeight(150),
  },
  optionContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.80)',
    ...styles.p10,
    ...styles.rowSpaceBetween,
    ...styles.ph20,
    borderTopWidth: 2,
    borderColor: colors.colorWhite,
  },
  innerContainer: {
    ...styles.flex,
    ...styles.pt20,
  },
});

export default Settings;
