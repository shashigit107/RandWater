//---------------react-native import --------------
import {
  View,
  StyleSheet,
  Text,
  Image

} from 'react-native';
import React, { useState, useEffect } from 'react';
//------------reusable Component Import ----------------
import {
  getHeight,
  getWidth,
  moderateScale,
} from '../../../common/constants';
import images from '../../../assets/images';
import FastImage from 'react-native-fast-image';
import {
  colors,
  styles
} from '../../../themes';
import Typography from '../../../themes/typography';
import WButtonText from '../../../components/common/WButtonText';
import { StackNavStrings } from '../../../navigation/NavigationKeys';


const ChooseRegisterSign = ({ navigation, route }) => {
  const onPressNext = () => {
    navigation.navigate(StackNavStrings.Login)
  }
  const onPressRegister = () => {
    navigation.navigate(StackNavStrings.Registration);
  }

  return (
    <FastImage source={images.tutorial1} style={localStyles.imageBackground}>


      <View style={localStyles.mainContainer}>

        {/* <WKeyBoardAvoidWrapper> */}
        <View style={localStyles.logoContainer}>
          {/* <LogoBlue height="150" width="252" /> */}

          <Image style={{ width: 350, height: 100 }} resizeMode={"contain"} source={images.welcomeLogo} />
          <View style={{ marginTop: 16 }}>
            <Text style={{ color: "#082C67", fontSize: 36, fontWeight: "900" }}>WELCOME</Text>
          </View>
        </View>
        {/* </WKeyBoardAvoidWrapper> */}

        <View style={localStyles.formContainer}>
          <View style={localStyles.TextContainer}>
            <Text style={[localStyles.TextStyle]}>Rand Water is finding new ways in saving water.
              As a precious and scarce resource, let us work together in saving water by reporting burst pipes,
              water leaks and other related water issues in your community. It starts with You.</Text>
          </View>
          <View style={{ flexDirection: 'row', marginTop: -10 }}>
            <WButtonText
              title={'Sign In'}
              containerStyle={{
                flex: 1,
                ...localStyles.searchButton,
                ...localStyles.nextButton,
              }}
              style={localStyles.searchText}
              onPress={onPressNext}
            />
          </View>
          <View style={{ flexDirection: 'row', marginVertical: 15, justifyContent: "center", alignItems: 'center' }}>
            <View style={{ height: 2, backgroundColor: colors.lightWhite, flex: 1 }}></View>
            <Text style={{ paddingHorizontal: 10, fontWeight: 'bold', color: 'white', fontSize: 14 }}>OR</Text>
            <View style={{ height: 2, backgroundColor: colors.lightWhite, flex: 1 }}></View>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <WButtonText
              title={'Register'}
              containerStyle={{
                flex: 1,
                ...localStyles.searchButton1,
                ...localStyles.nextButton,
              }}
              style={localStyles.searchText1}
              onPress={onPressRegister}
            />
          </View>
        </View>
      </View>
    </FastImage>
  );
};

const localStyles = StyleSheet.create({
  mainContainer: {
    // ...styles.flex,
    flex: 1,
    alignItems: 'center',
  },
  TextContainer: {
    backgroundColor: "#FFFFFFCC",
    marginBottom: moderateScale(50),
    flexWrap: "nowrap",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: moderateScale(10),


  },
  TextStyle: {
    color: '#082C67',
    textAlign: 'center',
    padding: "5%",
    // fontWeight:Platform.OS="ios"?"500":"bo",
    fontWeight: "500",
    fontSize: 16,
    lineHeight: 25,
    // lineHeight:20,
    fontFamily: 'Poppins-Regular',
    letterSpacing: 1
  },

  searchButton: {

    backgroundColor: colors.colorWhite,
    ...styles.mt20,
    borderRadius: moderateScale(10),
  },
  searchButton1: {

    backgroundColor: colors.greenShade4,
    ...styles.mt20,
    borderRadius: moderateScale(10),
  },
  nextButton: {

    marginTop: moderateScale(0),
    width: moderateScale(170),
  },
  searchText: {
    ...Typography.fontSizes.f16,
    ...Typography.fontWeights.MediumAvenir,
    color: colors.colorBlack,
  },
  searchText1: {
    ...Typography.fontSizes.f16,
    ...Typography.fontWeights.MediumAvenir,
    color: colors.colorWhite,
  },






  imageBackground: {
    width: '100%',
    height: '100%',
    flex: 1,
    resizeMode: 'cover',
  },
  logoContainer: {
    flex: .35,
    ...styles.columnCenter,
    marginTop: getHeight(20),
  },
  formContainer: {
    flex: .65,
    // width:'100%',
    // backgroundColor:'red',
    // height:300,
    // padding:100,
    width: "90%",
    // marginTop: getHeight(10),
  },
  inputContainer: {
    marginTop: getHeight(28),
  },
  loginButton: {
    backgroundColor: colors.colorWhite,
    borderRadius: moderateScale(24),
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

export default ChooseRegisterSign;
