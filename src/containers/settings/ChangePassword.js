import React, {useState, useEffect} from 'react';
import {View, StyleSheet, SafeAreaView, Pressable} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import FastImage from 'react-native-fast-image';

import WInput from '../../components/common/WInput';
import WLoader from '../../components/common/WLoader';
import WHeader from '../../components/common/WHeader';
import WButtonText from '../../components/common/WButtonText';
import {getHeight, moderateScale} from '../../common/constants';
import WKeyBoardAvoidWrapper from '../../components/common/WKeyBoardAvoidWrapper';

import {CloseEye, LogoBlue, OpenEye} from '../../assets/svgs';
import images from '../../assets/images';
import {colors, styles} from '../../themes';
import Typography from '../../themes/typography';

import strings from '../../i18n/strings';
import {validatePassword} from '../../utils/validators';
import {showPopupWithOk} from '../../utils/helpers';

import {
  CHANGE_PASSWORD_FAILED,
  CHANGE_PASSWORD_SUCCESS,
} from '../../redux/types';
import {
  changePassword,
  clearSettingsData,
} from '../../redux/actions/settingsAction';

const ChangePassword = ({navigation}) => {
  const [oldPassword, setOldPassword] = useState('');
  const [oldPasswordError, setOldPasswordError] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordError, setNewPasswordError] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [confirmNewPasswordError, setConfirmNewPasswordError] = useState('');
  const [isVisible, setVisible] = useState(true);
  const [isVisibleNew, setVisibleNew] = useState(true);
  const [isVisibleConfirm, setVisibleConfirm] = useState(true);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  const dispatch = useDispatch();
  const changePasswordReducer = useSelector(state => state.settings);
  console.log("changePasswordReducer",changePasswordReducer)

  useEffect(() => {
    global.navigation = navigation;
  }, []);

  useEffect(() => {
    if (
      oldPassword.length > 0 &&
      newPassword.length > 0 &&
      confirmNewPassword.length > 0 &&
      !oldPasswordError &&
      !confirmNewPasswordError &&
      !newPasswordError
    ) {
      setIsSubmitDisabled(false);
    } else {
      setIsSubmitDisabled(true);
    }
  }, [
    oldPassword,
    oldPasswordError,
    newPassword,
    newPasswordError,
    confirmNewPassword,
    confirmNewPasswordError,
  ]);

  useEffect(() => {
    let {actions} = changePasswordReducer;
    console.log("changePasswordReducer",changePasswordReducer)
    // console.log()
    if (actions) {
      let {type, message} = actions;

      if (type === CHANGE_PASSWORD_FAILED) {
        showPopupWithOk(strings.randWater, message);
        dispatch(clearSettingsData());
      }

      if (type === CHANGE_PASSWORD_SUCCESS) {
        showPopupWithOk('Password changed successfully.');
        dispatch(clearSettingsData());
        navigation.goBack();
      }
    }
  }, [changePasswordReducer]);

  //User Name validation
  const handleOldPassword = val => {
    const {msg} = validatePassword(
      val.trim(),
      undefined,
      undefined,
      strings.plsEnterOldPassword,
    );
    setOldPassword(val.trim());
    setOldPasswordError(msg);
  };

  //User Name validation
  const handleNewPassword = val => {
    const {msg} = validatePassword(
      val.trim(),
      undefined,
      undefined,
      strings.plsEnterNewPassword,
    );
    setNewPassword(val.trim());
    setNewPasswordError(msg);
  };

  //User Name validation
  const handleConfirmNewPassword = val => {
    const {msg, status} = validatePassword(
      val.trim(),
      undefined,
      undefined,
      strings.plsEnterConfirmPassword,
    );
    setConfirmNewPassword(val.trim());
    setConfirmNewPasswordError(msg);
    if (status) {
      if (newPassword !== val.trim()) {
        setConfirmNewPasswordError(
          'New Password and Confirm Password must be same.',
        );
      }
    }
  };

  const onPressLogin = () => {
    if (oldPassword === newPassword && oldPassword === confirmNewPassword) {
      showPopupWithOk(`Old and New Password can't be same.`);
    } else if (newPassword !== confirmNewPassword) {
      showPopupWithOk(`New Password and Confirm Password must be same.`);
    } else {
      const data = {
        password: oldPassword,
        new_password: newPassword,
      };
      dispatch(changePassword(data));
    }
  };

  // Common Render Eye Icon
  const renderEye = (isVisibl, onPasswordShowHide, val) => {
    // console.log(isVisibl)
    return (
      <Pressable activeOpacity={1} onPress={() => onPasswordShowHide(val)}>
        {isVisibl ? (
          <CloseEye width={moderateScale(25)} height={moderateScale(25)} />
        ) : (
          <OpenEye width={moderateScale(25)} height={moderateScale(25)} />
        )}
      </Pressable>
    );
  };
  //Password visibility
  const onPasswordShowHide = val => {
    if (val === 1) setVisible(prev => !prev);
    if (val === 2) setVisibleNew(prev => !prev);
    if (val === 3) setVisibleConfirm(prev => !prev);
  };
  //password Eye icon
  const renderEyeIcon = val => {
    if (val === 1) return renderEye(isVisible, onPasswordShowHide, 1);
    if (val === 2) return renderEye(isVisibleNew, onPasswordShowHide, 2);
    if (val === 3) return renderEye(isVisibleConfirm, onPasswordShowHide, 3);
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <WHeader title={'Change Password'} close />
      <FastImage source={images.tutorial1} style={localStyles.imageBackground}>
        <View style={localStyles.mainContainer}>
          <WKeyBoardAvoidWrapper>
            <View style={localStyles.formContainer}>
              <WInput
                placeHolder={'Old Password'}
                _errorText={oldPasswordError}
                autoCapitalize={'none'}
                _value={oldPassword}
                _isSecure={isVisible}
                toGetTextFieldValue={val => handleOldPassword(val)}
                inputContainerStyle={localStyles.inputContainer}
                inputBoxStyle={localStyles.inputBoxStyle}
                rightAccessory={() => renderEyeIcon(1)}
              />
              <WInput
                placeHolder={'New Password'}
                _errorText={newPasswordError}
                autoCapitalize={'none'}
                _value={newPassword}
                _isSecure={isVisibleNew}
                rightAccessory={() => renderEyeIcon(2)}
                toGetTextFieldValue={val => handleNewPassword(val)}
                inputContainerStyle={localStyles.inputContainer}
                inputBoxStyle={localStyles.inputBoxStyle}
              />
              <WInput
                placeHolder={'Confirm Password'}
                _errorText={confirmNewPasswordError}
                autoCapitalize={'none'}
                _value={confirmNewPassword}
                _isSecure={isVisibleConfirm}
                rightAccessory={() => renderEyeIcon(3)}
                toGetTextFieldValue={val => handleConfirmNewPassword(val)}
                inputContainerStyle={localStyles.inputContainer}
                inputBoxStyle={localStyles.inputBoxStyle}
              />
              <WButtonText
                title={'Change Password'}
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
      {changePasswordReducer?.isLoading && <WLoader />}
    </SafeAreaView>
  );
};

const localStyles = StyleSheet.create({
  mainContainer: {
    ...styles.flex,
    alignItems: 'center',
  },
  imageBackground: {
    resizeMode: 'cover',
    ...styles.flex,
    ...styles.ph20,
    ...styles.itemsCenter,
  },
  logoContainer: {
    ...styles.columnCenter,
    marginTop: getHeight(150),
  },
  formContainer: {
    marginTop: getHeight(150),
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
    color: colors.placeHolder,
    ...Typography.fontSizes.f20,
    ...Typography.fontWeights.MediumAvenir,
  },
  inputBoxStyle: {
    // width: '80%',
  },
});

export default ChangePassword;
