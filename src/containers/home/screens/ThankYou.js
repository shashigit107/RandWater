import {View, SafeAreaView, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import WHeader from '../../../components/common/WHeader';
import FastImage from 'react-native-fast-image';
import {Close} from '../../../assets/svgs';
import {colors, styles} from '../../../themes';
import {moderateScale} from '../../../common/constants';
import images from '../../../assets/images';
import WText from '../../../components/common/WText';
import {TabBarString} from '../../../navigation/NavigationKeys';
import { StackNavStrings } from '../../../navigation/NavigationKeys';

const ThankYou = ({navigation}) => {
  const thanku=true
  const onPressCloseIcon = () => {
    // navigation.navigate(TabBarString.Report);
    navigation.navigate(TabBarString.Home);

    // StackNavStrings.WaterLeaks
    // StackNavStrings.Report
  };
  return (
    <SafeAreaView style={localStyles.mainContainer}>
      <WHeader title={'Report'} />
      <FastImage
        source={images.mapBackground}
        style={localStyles.innerContainer}>
        <View style={localStyles.innerMainContainer}>
          <TouchableOpacity onPress={onPressCloseIcon}>
            <Close style={localStyles.closeIcon} />
          </TouchableOpacity>
          <View style={localStyles.innerTextContainer}>
            <WText
              type={'MA36'}
              color={colors.colorWhite}
              style={localStyles.homeHeadingTitle}>
              {'Thank You!'}
            </WText>
            <WText
              type={'MA18'}
              color={colors.colorWhite}
              style={localStyles.subTitle}>
              {
                'Your Report has been submitted, and we will attend to the issue as soon as possible.'
              }
            </WText>
          </View>
        </View>
      </FastImage>
    </SafeAreaView>
  );
};
const localStyles = StyleSheet.create({
  mainContainer: {
    backgroundColor: colors.colorWhite,
    ...styles.flex,
  },
  innerContainer: {
    ...styles.flex,
    alignItems: 'center',
  },
  innerMainContainer: {
    backgroundColor: colors.greenShade,
    width: moderateScale(315),
    height: moderateScale(343),
    borderRadius: moderateScale(30),
    ...styles.mt100,
    ...styles.pv20,
  },
  closeIcon: {
    ...styles.selfEnd,
    ...styles.mr20,
  },
  innerTextContainer: {
    ...styles.center,
    ...styles.mt40,
    ...styles.mh15,
  },
  subTitle: {
    ...styles.mt20,
  },
});

export default ThankYou;
