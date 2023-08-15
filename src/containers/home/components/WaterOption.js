import { View, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { BottomArrow, House, RightArrow } from '../../../assets/svgs';
import WText from '../../../components/common/WText';
import { colors, styles } from '../../../themes';
import { moderateScale } from '../../../common/constants';
// const 

const WaterOption = ({ title, svgIcon, onPress, down = false, title2 = false }) => {
  return (
    <TouchableOpacity style={localStyles.incidentOption} onPress={onPress}>
      <View style={localStyles.innerContainer}>
        {svgIcon()}
        {!title2 && <WText
          color={colors.placeHolder}
          style={localStyles.optionText}>
          {title}
        </WText>}
        {title2 &&  //we did this beacuse flex and \n doesnot support in XR ios device
          <View style={{ width:"80%"}}>
            <WText
              color={colors.placeHolder}
              style={{
                letterSpacing: 1,
                fontFamily: 'Poppins-Medium',
                fontSize: 18,
                marginLeft:15
                }}>
              {title}
            </WText>
            <WText
          color={colors.placeHolder}
          style={{letterSpacing: 1,
            fontFamily: 'Poppins-Medium',
            fontSize: 18,
            marginLeft:15}}>
          {title2}
       </WText>
          </View>
          
          }


      </View>
      {down ? (
        <BottomArrow style={styles.mr10} />
      ) : (
        <RightArrow style={styles.mr10} />
      )}
    </TouchableOpacity>
  );
};

const localStyles = StyleSheet.create({
  incidentOption: {
    ...styles.rowSpaceBetween,
    backgroundColor: 'rgba(255, 255, 255, 0.80)',
    height: moderateScale(72),
    width: moderateScale(320),
    ...styles.p10,
    borderRadius: moderateScale(12),
    ...styles.mt10,
  },
  innerContainer: {
    ...styles.rowCenter,
    ...styles.ml5,
  },
  optionText: {
    ...styles.ml15,
    // flexWrap:"nowrap",
    width: '72%',
    letterSpacing: 1,
    fontFamily: 'Poppins-Medium',
    fontSize: 18
  },
});

export default WaterOption;
