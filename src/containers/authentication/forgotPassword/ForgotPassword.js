import React, {useState, useEffect} from 'react';
import {View, StyleSheet, TouchableOpacity, SafeAreaView} from 'react-native';
import images from '../../../assets/images';
import {getHeight, moderateScale} from '../../../common/constants';
import FastImage from 'react-native-fast-image';
import {colors, styles} from '../../../themes';
import {CloseBlueLine, LogoBlue} from '../../../assets/svgs';
import WInput from '../../../components/common/WInput';
import WButtonText from '../../../components/common/WButtonText';
import Typography from '../../../themes/typography';
import WKeyBoardAvoidWrapper from '../../../components/common/WKeyBoardAvoidWrapper';
import {validateEmail} from '../../../utils/validators';
import {showPopupWithOk} from '../../../utils/helpers';
import {useDispatch, useSelector} from 'react-redux';
import {
  FORGOT_PASSWORD_FAILED,
  FORGOT_PASSWORD_LOADING,
  FORGOT_PASSWORD_SUCCESS,
  UNAUTHORIZED,
} from '../../../redux/types';
import {
  clearSettingsData,
  forgotPassword,
} from '../../../redux/actions/settingsAction';
import strings from '../../../i18n/strings';
import WHeader from '../../../components/common/WHeader';
import WLoader from '../../../components/common/WLoader';
const ForgotPassword = ({navigation}) => {
  const settings = useSelector(state => state.settings);
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [emailErr, setEmailErr] = useState('');
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  useEffect(() => {
    global.navigation = navigation;
  }, []);

  useEffect(() => {
    if (email.length > 0 && !emailErr) {
      setIsSubmitDisabled(false);
    } else {
      setIsSubmitDisabled(true);
    }
  }, [email, emailErr]);

  useEffect(() => {
    let {actions} = settings;
    if (actions) {
      let {type, message} = actions;

      if (type === FORGOT_PASSWORD_FAILED) {
        showPopupWithOk(strings.randWater, message);
        dispatch(clearSettingsData());
      }

      if (type === FORGOT_PASSWORD_SUCCESS) {
        showPopupWithOk(strings.randWater, `Email sent successfully.`);
        dispatch(clearSettingsData());
        navigation.goBack();
      }
    }
  }, [settings]);

  //User Name validation
  const handleUserName = val => {
    const {msg} = validateEmail(val.trim());
    setEmail(val.trim());
    setEmailErr(msg);
  };

  const onPressLogin = () => {
    dispatch(forgotPassword({email}));
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <WHeader
        title={'Forgot Password'}
        close
        settingIcon={false}
        onPress={() => navigation.goBack()}
      />
      <FastImage source={images.tutorial1} style={localStyles.imageBackground}>
        <View style={localStyles.mainContainer}>
          <WKeyBoardAvoidWrapper>
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
              <WButtonText
                title={'Verify'}
                containerStyle={{
                  ...localStyles.loginButton,
                  backgroundColor: isSubmitDisabled
                    ? 'rgba(255, 255, 255, 0.3)'
                    : colors.colorWhite,
                }}
                style={localStyles.loginButtonText}
                onPress={onPressLogin}
                disabled={isSubmitDisabled}
              />
            </View>
          </WKeyBoardAvoidWrapper>
        </View>
      </FastImage>
      {settings?.isLoading && <WLoader />}
    </SafeAreaView>
  );
};

const localStyles = StyleSheet.create({
  mainContainer: {
    ...styles.flex,
    alignItems: 'center',
  },
  imageBackground: {
    width: '100%',
    height: '100%',
    // flex: 1,
    resizeMode: 'cover',
  },
  logoContainer: {
    ...styles.columnCenter,
    marginTop: getHeight(150),
  },
  formContainer: {
    marginTop: getHeight(200),
  },
  inputContainer: {
    marginTop: getHeight(28),
  },
  loginButton: {
    backgroundColor: colors.colorWhite,
    borderRadius: moderateScale(24),
    ...styles.mt50,
  },
  loginButtonText: {
    color: colors.colorBlack,
    ...Typography.fontSizes.f20,
    ...Typography.fontWeights.MediumAvenir,
  },
  closeIcon: {
    marginTop: getHeight(50),
    // ...styles.ml10,
  },
});

export default ForgotPassword;
