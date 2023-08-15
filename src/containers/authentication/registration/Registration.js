import {
  View,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  Platform,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import FastImage from 'react-native-fast-image';
import images from '../../../assets/images';
import WKeyBoardAvoidWrapper from '../../../components/common/WKeyBoardAvoidWrapper';
import {
  Close,
  CloseBlueIcon,
  CloseBlueLine,
  CloseEye,
  LogoBlue,
  OpenEye,
} from '../../../assets/svgs';
import WInput from '../../../components/common/WInput';
import WButtonText from '../../../components/common/WButtonText';
import WText from '../../../components/common/WText';
import { colors, styles } from '../../../themes';
import Typography from '../../../themes/typography';
import {
  ACCESS_TOKENS,
  getHeight,
  getWidth,
  moderateScale,
  USER,
} from '../../../common/constants';
import { StackNavStrings } from '../../../navigation/NavigationKeys';
import {
  validateEmail,
  validateMobile,
  validateName,
  validatePassword,
  validateField
} from '../../../utils/validators';
import {
  doRegistration,
  clearLoginData,
} from '../../../redux/actions/loginAction';
import {
  REGISTRATION_SUCCESS,
  REGISTRATION_FAILED,
  UNAUTHORIZED,
} from '../../../redux/types/index';
import { useDispatch, useSelector } from 'react-redux';
import strings from '../../../i18n/strings';
import { checkPlatform, showPopupWithOk } from '../../../utils/helpers';
import WLoader from '../../../components/common/WLoader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CheckBox from '@react-native-community/checkbox';
import {
  getModel,
  getSystemVersion,
  getUniqueId,
  getVersion,
} from 'react-native-device-info';

const Registration = ({ navigation }) => {
  const login = useSelector(state => state.login);
  const dispatch = useDispatch();

  //Loading State
  let isLoading = login && login.isLoading;
  const [name, setName] = useState('');
  const [lastname, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNum, setPhoneNum] = useState('');
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [isVisible, setVisible] = useState(true);
  const [checkBox, setCheckBox] = useState(false);

  //Error State
  const [nameErr, setNameErr] = useState('');
  const [lastnameErr, setLastNameErr] = useState('');
  const [emailErr, setEmailErr] = useState('');
  const [phoneNumErr, setPhoneNumErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');
  const [checkBoxErr, setCheckBoxErr] = useState(false);

  //Check Mobile and Password Field Fill up then enable submit button
  useEffect(() => {
    if (
      name.length > 0 &&
      lastname.length > 0 &&
      phoneNum.length > 0 &&
      password.length > 0 &&
      !phoneNumErr &&
      !passwordErr &&
      !nameErr
      // !lastnameErr
    ) {
      setIsSubmitDisabled(false);
    } else {
      setIsSubmitDisabled(true);
    }
  }, [
    name,
    email,
    password,
    phoneNum,
    nameErr,
    emailErr,
    phoneNumErr,
    passwordErr,
    lastname,
    // lastnameErr
  ]);

  useEffect(() => {
    let { actions } = login;
    if (actions) {
      let { type, message, data } = actions;
      if (type === REGISTRATION_FAILED) {
        //Show Popup Message Of Error
        showPopupWithOk(strings.randWater, message);
        //Clear Login Data
        dispatch(clearLoginData());
      } else if (type === REGISTRATION_SUCCESS) {
        //do something for success
        let { token } = data.data;
        let user = {
          name: data.data.first_name + data.data.last_name,
          email: data.data.email,
          phone: data.data.mobile_number,
        };
        global.accessToken = token;
        // global.refreshToken = tokens.refreshToken;
        global.FullData = user;
        // Save Token and UserData To AsyncStorage
        AsyncStorage.multiSet([
          [ACCESS_TOKENS, token],
          [USER, JSON.stringify(user)],
        ]);
        navigation.replace(StackNavStrings.TabNavigator);
        dispatch(clearLoginData());
      } else if (type === UNAUTHORIZED) {
        //Show Error Message For Unauthorized
        showPopupWithOk(strings.randWater, message);
        //Clear Login Data
        dispatch(clearLoginData());
      }
    }
  }, [login]);

  const onPressLogin = () => {
    navigation.navigate(StackNavStrings.Login);
  };

  //Name validation
  const handleName = (val, type) => {
    if (type == 1) {
      const { msg } = validateField(val.trim(), strings.firstName_text);
      // setName(val.trim());
      setName(val);
      setNameErr(msg);
    } else {
      const { msg } = validateField(val.trim(), strings.lastName_text);
      // setLastName(val.trim());
      setLastName(val)
      // setLastNameErr(msg)
    }
  };

  //Email validation
  const handleEmail = val => {
    const { msg } = validateEmail(val.trim());
    setEmail(val.trim());
    setEmailErr(msg);
  };

  //Mobile Number validation
  const handlePhone = val => {
    const { msg } = validateMobile(val.trim());
    setPhoneNum(val.trim());
    setPhoneNumErr(msg);
  };

  //password validation
  const handlePassword = val => {
    const { msg } = validatePassword(val.trim());
    setPassword(val.trim());
    setPasswordErr(msg);
  };

  const onPressRegistration = async () => {
    console.log("hey I am register")
    const device_unique_id = await getUniqueId();
    const app_version = getVersion();

    if (checkBox) {
      const data = {
        first_name: name,
        last_name: lastname,
        email: email,
        password: password,
        mobile_number: phoneNum,
        device_unique_id,
        fcm_token: global.fcm_token,
        device_os: Platform.OS,
        device_model: getModel(),
        api_version: getSystemVersion(),
        app_version: app_version,
      };
      // console.log("RegisterData=>>>", data)
      dispatch(doRegistration(data));
    } else {
      alert('Please agree the privacy policy');//terms & conditions
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

  //On press checkbox
  const onChangeCheckBox = newValue => {
    setCheckBox(newValue);
    setCheckBoxErr(false);
  };

  const onPressTerms = () => {
    navigation.navigate(StackNavStrings.TermsAndConditions);
  };

  const onPressClose = () => {
    navigation.goBack();
  };

  return (
    <FastImage source={images.tutorial1} style={localStyles.imageBackground}>
      <View style={localStyles.mainContainer}>
        <WKeyBoardAvoidWrapper>
          <TouchableOpacity
            style={localStyles.closeIcon}
            onPress={onPressClose}>
            <CloseBlueLine />
          </TouchableOpacity>
          <View style={localStyles.logoContainer}>
            <LogoBlue />
          </View>
          <View style={localStyles.formContainer}>
            <WInput
              placeHolder={'First Name'}// Name & Surname
              keyBoardType={'default'}
              _errorText={nameErr}
              autoCapitalize={'none'}
              _value={name}
              toGetTextFieldValue={val => handleName(val, 1)}
              inputContainerStyle={localStyles.inputContainer}
            />
            <WInput
              placeHolder={'Last Name'}
              keyBoardType={'default'}
              _errorText={lastnameErr}
              autoCapitalize={'none'}
              _value={lastname}
              toGetTextFieldValue={val => handleName(val, 2)}
              inputContainerStyle={localStyles.inputContainer}
            />
            <WInput
              placeHolder={'Email address'}
              keyBoardType={'email-address'}
              autoCapitalize={'none'}
              _errorText={emailErr}
              _value={email}
              toGetTextFieldValue={val => handleEmail(val)}
              inputContainerStyle={localStyles.inputContainer}
            />
            <WInput
              placeHolder={'Cellphone number'}
              keyBoardType={'number-pad'}
              returnKeyType="done"
              _errorText={phoneNumErr}
              _value={phoneNum}
              toGetTextFieldValue={val => handlePhone(val)}
              inputContainerStyle={localStyles.inputContainer}
            />
            <WInput
              placeHolder={'Password'}
              keyBoardType={'default'}
              _errorText={passwordErr}
              autoCapitalize={'none'}
              _value={password}
              toGetTextFieldValue={val => handlePassword(val)}
              inputContainerStyle={localStyles.inputContainer}
              _isSecure={isVisible}
              rightAccessory={renderEyeIcon}
            />
            <View style={localStyles.termsContainer}>
              <View style={styles.rowCenter}>
                <CheckBox
                  boxType={'square'}
                  onAnimationType={'bounce'}
                  disabled={false}
                  style={localStyles.checkBox}
                  value={checkBox}
                  onCheckColor={colors.colorWhite}
                  onTintColor={colors.colorWhite}
                  tintColor={colors.colorWhite}
                  tintColors={{
                    true: checkBoxErr ? colors.colorRed : colors.colorWhite,
                    false: checkBoxErr ? colors.colorRed : colors.colorWhite,
                  }}
                  onValueChange={newValue => onChangeCheckBox(newValue)}
                />

                <WText color={colors.colorWhite}>{' I agree on '}</WText>

                <TouchableOpacity onPress={onPressTerms}>
                  <WText
                    color={colors.colorWhite}
                    style={localStyles.termsText}>
                    {'privacy policy'}
                  </WText>
                </TouchableOpacity>
              </View>
            </View>
            <WButtonText
              title={'Register'}
              // containerStyle={localStyles.loginButton}
              containerStyle={{
                ...localStyles.loginButton,
                backgroundColor: isSubmitDisabled
                  ? 'rgba(255, 255, 255, 0.3)'
                  : colors.colorWhite,
              }}
              style={localStyles.loginButtonText}
              onPress={onPressRegistration}
              disabled={isSubmitDisabled}
            />

            {/* Sign Up Button */}
            {/* <View style={localStyles.signUpContainer}>
              <WText color={colors.colorWhite}>
                {'Already have an account? '}
              </WText>
              <WButtonText
                title={'Login'}
                containerStyle={localStyles.signUpBtn}
                style={localStyles.signUpBtnText}
                onPress={onPressLogin}
              />
            </View> */}
          </View>
        </WKeyBoardAvoidWrapper>
      </View>
      {isLoading && <WLoader />}
    </FastImage>
  );
};

const localStyles = StyleSheet.create({
  mainContainer: {
    ...styles.flex,
    marginHorizontal: 10,
    alignItems: 'center',
  },
  imageBackground: {
    width: '100%',
    height: '100%',
    flex: 1,
    resizeMode: 'cover',
  },
  closeIcon: {
    marginTop: getHeight(50),
    ...styles.ml10,
  },
  logoContainer: {
    ...styles.columnCenter,
    ...styles.mt20,
  },
  formContainer: {
    marginTop: getHeight(40),
  },
  inputContainer: {
    marginTop: getHeight(20),
  },
  loginButton: {
    backgroundColor: colors.colorWhite,
    borderRadius: moderateScale(12),
    ...styles.mt10,
  },
  termsContainer: {
    ...styles.mt20,
    ...styles.itemsCenter,
    ...styles.rowCenter,
  },
  loginButtonText: {
    color: colors.colorBlack,
    ...Typography.fontSizes.f20,
    ...Typography.fontWeights.MediumAvenir,
  },
  signUpBtnText: {
    color: colors.primary,
    ...styles.underLineText,
    ...Typography.fontWeights,
  },
  signUpBtn: {
    ...styles.ml5,
  },
  signUpContainer: {
    ...styles.mt30,
    ...styles.rowCenter,
    ...styles.mb15,
  },
  checkBox: {
    height: checkPlatform() === 'ios' ? 16 : 14,
    width: checkPlatform() === 'ios' ? 16 : getWidth(25),
    marginRight: moderateScale(5),
    color: colors.colorWhite,
  },
  termsText: {
    ...styles.underLineText,
    color: colors.secondary,
  },
});

export default Registration;
