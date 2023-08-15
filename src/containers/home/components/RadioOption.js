import {View, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import WText from '../../../components/common/WText';
import {colors, styles} from '../../../themes';
import {moderateScale} from '../../../common/constants';

const RadioOption = ({optionText, isSelected, onPress}) => {
  return (
    <TouchableOpacity style={localStyles.radioContainer} onPress={onPress}>
      <View style={localStyles.radioBtn}>
        {isSelected && <View style={localStyles.innerRadioBtn} />}
      </View>
      {/* <View style={{flex:1}}> */}
      <WText
        color={colors.homeHeadingTitle}
        style={localStyles.radioOptionText}>
        {optionText}
      </WText>
      {/* </View> */}
    </TouchableOpacity>
  );
};

const localStyles = StyleSheet.create({
  radioContainer: {
    // flex:1,
    backgroundColor: 'rgba(255, 255, 255, 0.80)',
    width: moderateScale(305),
    ...styles.mt10,
    ...styles.p5,
    // ...styles.pr10,
    paddingRight:10,
    // paddingLeft:10,
    ...styles.pv10,
    borderRadius: moderateScale(10),
    ...styles.flexRow,
    // ...styles.ml30
  },
  radioBtn: {
    // flex:1,
    width: moderateScale(20),
    height: moderateScale(20),
    borderRadius: moderateScale(10),
    borderColor: colors.placeHolder,
    borderWidth: 1,
    ...styles.mh10,
    justifyContent: 'center',
  },
  innerRadioBtn: {
    backgroundColor: colors.placeHolder,
    width: moderateScale(6),
    height: moderateScale(6),
    borderRadius: moderateScale(3),
    ...styles.selfCenter,
  },
  radioOptionText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 13,
    
  }
});

export default RadioOption;
