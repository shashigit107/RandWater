import {
  View,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  Platform,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import WText from '../../../components/common/WText';
import images from '../../../assets/images';
import {
  ACCESS_TOKENS,
  getHeight,
  getWidth,
  moderateScale,
  USER,
} from '../../../common/constants';
import FastImage from 'react-native-fast-image';
import { colors, styles } from '../../../themes';
import { CloseEye, LogoBlue, OpenEye } from '../../../assets/svgs';
import WInput from '../../../components/common/WInput';
import WButtonText from '../../../components/common/WButtonText';
import Typography from '../../../themes/typography';
import WKeyBoardAvoidWrapper from '../../../components/common/WKeyBoardAvoidWrapper';
import { StackNavStrings } from '../../../navigation/NavigationKeys';
import { validateEmail, validatePassword } from '../../../utils/validators';
import { useDispatch, useSelector } from 'react-redux';
import WLoader from '../../../components/common/WLoader';
import { LOGIN_FAILED, LOGIN_SUCCESS, UNAUTHORIZED } from '../../../redux/types';
import { showPopupWithOk } from '../../../utils/helpers';
import { clearLoginData, doLogin } from '../../../redux/actions/loginAction';
import strings from '../../../i18n/strings';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CloseBlueLine } from '../../../assets/svgs';
import {
  getDeviceId,
  getModel,
  getSystemVersion,
  getUniqueId,
  getVersion,
} from 'react-native-device-info';
import {
  appleAuth,
  AppleButton,
} from '@invertase/react-native-apple-authentication';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import { GUEST_LOGIN, SOCIAL_LOGIN } from '../../../common/apiconstants';
// import { setCurrentScreenName, logEventData } from '../../../common/CustomAnalytics';
import analytics from '@react-native-firebase/analytics';

const Login = ({ navigation, route }) => {
  const login = useSelector(state => state.login);
  const dispatch = useDispatch();

  //Loading State
  let isLoading = login && login.isLoading;
  const { params } = route;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordErr, setPasswordErr] = useState('');
  const [emailErr, setEmailErr] = useState('');
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [isVisible, setVisible] = useState(true);

  useEffect(() => {
    // setCurrentScreenName('Login', "Login Screen")
    analytics().logScreenView({ Login: 'Login Screen', Login_class: 'Login.js', });
    global.navigation = navigation;
  }, []);

  useEffect(() => {
    if (email.length > 0 && password.length > 0 && !passwordErr && !emailErr) {
      setIsSubmitDisabled(false);
    } else {
      setIsSubmitDisabled(true);
    }
  }, [email, password, passwordErr, emailErr]);

  useEffect(() => {
    GoogleSignin.configure({
      // Mandatory method to call before calling signIn()
      scopes: ['https://www.googleapis.com/auth/drive.readonly'],

      androidClientId:
        '178094013478-f8jdkkjdujlekmhfm3tqh7ohpqp5446q.apps.googleusercontent.com',
      webClientId:
        '178094013478-3tqu61ha1ptsd0j88vccdrrpgqrivrmk.apps.googleusercontent.com',
    });
  }, []);

  useEffect(() => {
    let { actions } = login;
    if (actions) {
      let { type, message, data } = actions;
      if (type === LOGIN_FAILED) {
        //Show Popup Message Of Error
        showPopupWithOk(strings.randWater, message);
        //Clear Login Data
        dispatch(clearLoginData());
      } else if (type === LOGIN_SUCCESS) {
        //do something for success
        let { token } = data.data;
        let user = {
          name: data.data.first_name,
          email: data.data.email,
          phone: data.data.mobile_number,
          is_guest_user: data.data.is_guest_user === 1,
          created_at: data.data.created_at,
          expires_at:data.data.expires_at
        };
        global.accessToken = token;
        // global.refreshToken = tokens.refreshToken;
        global.FullData = user;
        // Save Token and UserData To AsyncStorage
        AsyncStorage.multiSet([
          [ACCESS_TOKENS, token],
          [USER, JSON.stringify(user)],
        ]);
        if (params?.fromSubmit) {
          navigation.goBack();
        } else {
          navigation.reset({
            index: 0,
            routes: [{ name: StackNavStrings.TabNavigator }],
          });
        }
        dispatch(clearLoginData());
      } else if (type === UNAUTHORIZED) {
        //Show Error Message For Unauthorized
        console.log('message', message);
        showPopupWithOk(strings.randWater, message, () => navigation.goBack());
        //Clear Login Data
        dispatch(clearLoginData());
      }
    }
  }, [login]);

  const googleSignin = async () => {
    try {
      const hasPlayServices = await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });
      if (hasPlayServices) {
        const googleResponse = await GoogleSignin.signIn();
        onPressLogin(
          SOCIAL_LOGIN,
          googleResponse?.user?.id,
          'google',
          googleResponse?.user,
        );
      }
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('User Cancelled the Login Flow');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Signing In');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('Play Services Not Available or Outdated');
      } else {
        console.log(error.message);
      }
    }
  };

  const appleLogin = async () => {
    try {
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
      });

      if (appleAuthRequestResponse?.user) {
        const user = {
          email: appleAuthRequestResponse?.email,
          familyName: appleAuthRequestResponse?.fullName.familyName,
          givenName: appleAuthRequestResponse?.fullName.givenName,
        };
        onPressLogin(
          SOCIAL_LOGIN,
          appleAuthRequestResponse?.user,
          'apple',
          user,
        );
      }
    } catch (error) {
      console.log('error in apple signin', error);
    }
  };

  const guestLogin = () => {
    onPressLogin(GUEST_LOGIN);
  };

  const onPressRegister = () => {
    navigation.navigate(StackNavStrings.Registration);
  };

  //User Name validation
  const handleUserName = val => {
    const { msg } = validateEmail(val.trim());
    setEmail(val.trim());
    setEmailErr(msg);
  };

  //password validation
  const handlePassword = val => {
    const { msg } = validatePassword(val.trim());
    setPassword(val.trim());
    setPasswordErr(msg);
  };

  const onPressLogin = async (url, provider_id, provider, user) => {
    const device_unique_id = await getUniqueId();
    const app_version = getVersion();
    console.log("api in ui", url)
    if (url !== undefined) {
      const name = `${user?.givenName || ''} ${user?.familyName || ''}`;

      const data = {
        device_unique_id,
        fcm_token: url === GUEST_LOGIN ? null : global.fcm_token,
        device_os: Platform.OS,
        device_model: getModel(),
        api_version: getSystemVersion(),
        app_version: app_version,
        provider_id,
        provider,
        first_name: name || '',
        email: user?.email || '',
        profile_picture: user?.photo || '',
      };

      dispatch(doLogin(data, url));
    } else {
      const data = {
        email: email,
        password: password,
        device_unique_id,
        fcm_token: global.fcm_token,
        device_os: Platform.OS,
        device_model: getModel(),
        api_version: getSystemVersion(),
        app_version: app_version,
      };
      console.log("-------LoginData",data)
      dispatch(doLogin(data));
    }
  };

  // Common Render Eye Icon
  const renderEye = (isVisible, onPasswordShowHide) => {
    return (
      <Pressable activeOpacity={1} onPress={onPasswordShowHide}>
        {isVisible ? (
          <CloseEye width={moderateScale(25)} height={moderateScale(25)} />
        ) : (
          <OpenEye width={moderateScale(25)} height={moderateScale(25)} />
        )}
      </Pressable>
    );
  };
  //Password visibility
  const onPasswordShowHide = () => {
    setVisible(prev => !prev);
  };
  //password Eye icon
  const renderEyeIcon = () => {
    return renderEye(isVisible, onPasswordShowHide);
  };

  return (
    <FastImage source={images.tutorial1} style={localStyles.imageBackground}>
      <View style={localStyles.mainContainer}>
        <WKeyBoardAvoidWrapper>
          <View style={{ position: "absolute" }}>
            <TouchableOpacity
              style={localStyles.closeIcon}
              onPress={() => navigation.goBack()}
            >
              <CloseBlueLine />
            </TouchableOpacity>
          </View>
          <View style={localStyles.logoContainer}>
            <LogoBlue />
          </View>
          <View style={localStyles.formContainer}>
            <WInput
              placeHolder={'Email'}
              keyBoardType={'email-address'}
              _errorText={emailErr}
              autoCapitalize={'none'}
              _value={email}
              toGetTextFieldValue={val => handleUserName(val)}
              inputContainerStyle={localStyles.inputContainer}
            />
            <WInput
              placeHolder={'Password'}
              keyBoardType={'default'}
              autoCapitalize={'none'}
              _errorText={passwordErr}
              _value={password}
              toGetTextFieldValue={val => handlePassword(val)}
              inputContainerStyle={localStyles.inputContainer}
              _isSecure={isVisible}
              rightAccessory={renderEyeIcon}
            />
            <TouchableOpacity
              style={localStyles.forgotPasswordWrapper}
              onPress={() =>
                navigation.navigate(StackNavStrings.ForgotPassword)
              }>
              <WText
                color={colors.colorWhite}
                style={localStyles.forgotPassword}>
                {'Forgot Password?'}
              </WText>
            </TouchableOpacity>
            <WButtonText
              title={'Login'}
              containerStyle={{
                ...localStyles.loginButton,
                backgroundColor: isSubmitDisabled
                  ? 'rgba(255, 255, 255, 0.3)'
                  : colors.colorWhite,
              }}
              style={localStyles.loginButtonText}
              onPress={() => onPressLogin()}
              disabled={isSubmitDisabled}
            />
          </View>
        </WKeyBoardAvoidWrapper>
      </View>
      {isLoading && <WLoader />}
    </FastImage>
  );
};

const localStyles = StyleSheet.create({
  mainContainer: {
    marginHorizontal: 10,
    ...styles.flex,
    alignItems: 'center',
  },
  closeIcon: {
    marginTop: getHeight(50),
    ...styles.ml10,
  },
  imageBackground: {
    width: '100%',
    height: '100%',
    flex: 1,
    resizeMode: 'cover',
  },
  logoContainer: {
    ...styles.columnCenter,
    marginTop: getHeight(150),
  },
  formContainer: {
    marginTop: getHeight(40),
  },
  inputContainer: {
    marginTop: getHeight(28),
  },
  loginButton: {
    backgroundColor: colors.colorWhite,
    borderRadius: moderateScale(12),
    ...styles.mt50,
  },
  socialLoginButton: {
    backgroundColor: colors.colorWhite,
    borderRadius: moderateScale(24),
    ...styles.mt10,
  },
  loginButtonText: {
    color: colors.colorBlack,
    ...Typography.fontSizes.f20,
    ...Typography.fontWeights.MediumAvenir,
  },
  signUpBtnText: {
    color: colors.colorWhite,
    ...styles.underLineText,
    ...Typography.fontWeights,
  },
  signUpBtn: {
    ...styles.ml5,
  },
  signUpContainer: {
    ...styles.mt40,
    ...styles.rowCenter,
    ...styles.mb15,
  },
  forgotPasswordWrapper: {
    alignSelf: 'flex-end',
  },
  forgotPassword: {
    marginTop: getHeight(10),
    marginRight: getWidth(10),
  },
});

export default Login;
