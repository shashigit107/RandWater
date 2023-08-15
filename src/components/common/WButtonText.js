//Library Imports
import React from 'react';
import {StyleSheet, Pressable} from 'react-native';

//Local Imports
import {moderateScale} from '../../common/constants';
import {colors, styles} from '../../themes';
import WText from './WText';

const WButtonText = ({
  title,
  onPress,
  containerStyle,
  style,
  icon = null,
  frontIcon = null,
  children,
  ...props
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={[localStyle.btnContainer, styles.rowCenter, containerStyle]}
      {...props}>
      {/* If Icon Added In Button Front Side */}
      {frontIcon}
      {/* Text In Button */}
      <WText style={{...localStyle.btnText, ...style}}>{title}</WText>
      {/* If Icon Added In Button Back Side */}
      {icon}
      {children}
    </Pressable>
  );
};

const localStyle = StyleSheet.create({
  btnContainer: {
    borderRadius: moderateScale(8),
    height: moderateScale(50),
  },
  btnText: {
    color: colors.colorWhite,
  },
});

export default WButtonText;
