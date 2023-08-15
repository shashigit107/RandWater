import React from 'react';
import { Text } from 'react-native';
import { colors } from '../../themes';
import Typography from '../../themes/typography';

//Text Component
const WText = ({ type, style, align, color, children, ...props }) => {
  const fontWeights = () => {
    switch (type.charAt(0).toUpperCase() + type.charAt(1).toUpperCase()) {
      case 'RR':
        return Typography.fontWeights.Regular;
      case 'MO':
        return Typography.fontWeights.MediumOptima;
      case 'MA':
        return Typography.fontWeights.MediumAvenir;
      case 'BB':
        return Typography.fontWeights.Bold;
      case 'BI':
        return Typography.fontWeights.Regular;
      case 'LA':
        return Typography.fontWeights.LightAvenir;
      case 'BL':
        return Typography.fontWeights.PoppinsBlack;
      case 'PB':
        return Typography.fontWeights.PoppinsBold;
      case 'PX':
        return Typography.fontWeights.PoppinsExtraBold;
      case 'PL':
        return Typography.fontWeights.PoppinsLight;
      case 'PE':
        return Typography.fontWeights.PoppinsExtraLight;
      case 'PR':
        return Typography.fontWeights.PoppinsRegular;
      case 'PM':
        return Typography.fontWeights.PoppinsMedium;
      case 'PT':
        return Typography.fontWeights.PoppinsThin;
      case 'PS':
        return Typography.fontWeights.PoppinsSemiBold;
      default:
        return Typography.fontWeights.PoppinsRegular;
    }
  };

  const fontSize = () => {
    switch (type.slice(2)) {
      case '10':
        return Typography.fontSizes.f10;
      case '12':
        return Typography.fontSizes.f12;
      case '14':
        return Typography.fontSizes.f14;
      case '16':
        return Typography.fontSizes.f16;
      case '18':
        return Typography.fontSizes.f18;
      case '20':
        return Typography.fontSizes.f20;
      case '22':
        return Typography.fontSizes.f22;
      case '24':
        return Typography.fontSizes.f24;
      case '26':
        return Typography.fontSizes.f26;
      case '28':
        return Typography.fontSizes.f28;
      case '30':
        return Typography.fontSizes.f30;
      case '32':
        return Typography.fontSizes.f32;
      case '36':
        return Typography.fontSizes.f36;
      default:
        return Typography.fontSizes.f14;
    }
  };

  return (
    <Text
      style={[
        type && { ...fontWeights(), ...fontSize() },
        { color: color ? color : colors.Bastille },
        align && { textAlign: align },
        style,
      ]}
      {...props}>
      {children}
    </Text>
  );
};

export default React.memo(WText);
