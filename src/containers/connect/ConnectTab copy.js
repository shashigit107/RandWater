import {View, Text, SafeAreaView, StyleSheet} from 'react-native';
import React from 'react';
import WHeader from '../../components/common/WHeader';
import FastImage from 'react-native-fast-image';
import images from '../../assets/images';
import {colors, styles} from '../../themes';
import WText from '../../components/common/WText';
import WInput from '../../components/common/WInput';
import WButtonText from '../../components/common/WButtonText';
import {getHeight, moderateScale} from '../../common/constants';
import Typography from '../../themes/typography';
import {WebView} from 'react-native-webview';
import {CONNECT_SCREEN} from '../../common/apiconstants';

const ConnectTab = () => {
  const [customerCode, setCustomerCode] = React.useState('');
  const [password, setPassword] = React.useState('');

  const onPressLogin = () => {
    console.log('Login Btn');
  };

  const handleCustomerCode = val => {
    setCustomerCode(val);
  };
  const handlePassword = val => {
    setPassword(val);
  };
  return (
    <SafeAreaView style={styles.mainContainer}>
      <WHeader title={'Connect'} close />
      {/* <WebView startInLoadingState={true} source={{uri: CONNECT_SCREEN}} /> */}
      {/* <FastImage source={images.tutorial1} style={localStyles.innerContainer}>
        <View style={localStyles.formContainer}>
          <WText
            type={'BB22'}
            color={colors.placeHolder}
            style={localStyles.titleText}>
            {'Rand Water Customer Customer Account Self Service'}
          </WText>
          <View style={styles.mt15}>
            <WInput
              placeHolder={'Customer Code'}
              keyBoardType={'number-pad'}
              placeholderTextColor={colors.colorBlack}
              // _errorText={phoneNumErr}
              _value={customerCode}
              toGetTextFieldValue={val => handleCustomerCode(val)}
              inputContainerStyle={localStyles.inputContainer}
            />
            <WInput
              placeHolder={'Password'}
              _isSecure={true}
              keyBoardType={'default'}
              placeholderTextColor={colors.colorBlack}
              // _errorText={passwordErr}
              _value={password}
              toGetTextFieldValue={val => handlePassword(val)}
              inputContainerStyle={localStyles.inputContainer}
            />
            <WButtonText
              title={'Login'}
              containerStyle={localStyles.loginButton}
              style={localStyles.loginButtonText}
              onPress={onPressLogin}
            />
            <WText
              type={'MA14'}
              color={colors.colorWhite}
              style={localStyles.bottomText}>
              {
                'If you are logging on for the first time, please contact the Rand Water Customer Service Centre: 0860 10 10 60 for your password.'
              }
            </WText>
          </View>
        </View>
      </FastImage> */}
    </SafeAreaView>
  );
};

const localStyles = StyleSheet.create({
  innerContainer: {
    ...styles.flex,
    ...styles.pt20,
    ...styles.ph20,
    ...styles.itemsCenter,
  },
  formContainer: {
    ...styles.mt10,
  },
  titleText: {
    textAlign: 'center',
  },
  loginButton: {
    backgroundColor: colors.darkBlue,
    ...styles.mt15,
    borderRadius: moderateScale(24),
  },
  loginButtonText: {
    ...Typography.fontSizes.f16,
  },
  bottomText: {
    textAlign: 'center',
    marginTop: getHeight(90),
  },
});

export default ConnectTab;
