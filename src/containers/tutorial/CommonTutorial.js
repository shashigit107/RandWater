import {View, Text, StyleSheet, Dimensions} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';
import images from '../../assets/images';
import {colors, styles} from '../../themes';
import WText from '../../components/common/WText';
import {moderateScale} from '../../common/constants';
import {LogoWithText, LogoWhite} from '../../assets/svgs';

const {width} = Dimensions.get('window');

const CommonTutorial = ({backImage, text, secondSlide = false, logoWhite}) => {
  return (
    <FastImage source={backImage} style={localStyles.imageBackground}>
      <View style={[styles.flex, styles.flexCenter]}>
        {logoWhite ? <LogoWhite /> : <LogoWithText  height="25%" width="80%"/>}
        <View style={localStyles.bottomView}>
          <WText
            type={'MA16'}
            style={localStyles.tutorialText}
            color={secondSlide ? '#004893' : colors.colorWhite}>
            {text.title}
          </WText>
          <WText
            type={'MA16'}
            style={localStyles.subtitleText}
            color={secondSlide ? '#004893' : colors.colorWhite}>
            {text.subtitle}
          </WText>
        </View>
      </View>
    </FastImage>
  );
};

const localStyles = StyleSheet.create({
  tutorialText:{
  fontSize:20,
  fontWeight:'bold'
  },
  imageBackground: {
    width: '100%',
    height: '100%',
    borderRadius: moderateScale(10),
    justifyContent: 'flex-end',
    flex: 1,
    resizeMode: 'cover',
  },
  bottomView: {
    ...styles.columnCenter,
    marginTop: moderateScale(200),
    width: moderateScale(300),
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: moderateScale(10),
    ...styles.p10,
  },
  subtitleText: {
    textAlign: 'center',
    ...styles.mt15,
  },
});

export default CommonTutorial;
