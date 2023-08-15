import {moderateScale} from '../common/constants';

// App Font-Family:
const fontWeights = {
  Regular: {
    fontFamily: 'Optima-Regular',
  },
  MediumOptima: {
    fontFamily: 'Optima-Medium',
  },
  Bold: {
    fontFamily: 'Optima-Bold',
  },
  // BoldItalic: {
  //   fontFamily: 'Optima-Bold-Italic',
  // },
  Italic: {
    fontFamily: 'Optima-Italic',
  },
  MediumAvenir: {
    fontFamily: 'Avenir-Medium',
  },
  LightAvenir: {
    fontFamily: 'Avenir-Light',
  },
  //Poppins
  PoppinsBlack: {
    fontFamily: 'poppins-black',
  },
  PoppinsBold: {
    fontFamily: 'poppins-bold',
  },
  PoppinsExtraBold: {
    fontFamily: 'poppins-extrabold',
  },
  PoppinsLight: {
    fontFamily: 'poppins-light',
  },
  PoppinsExtraLight: {
    fontFamily: 'poppins-extralight',
  },
  PoppinsRegular: {
    fontFamily: 'poppins-regular',
  },
  PoppinsMedium: {
    fontFamily: 'poppins-medium',
  },
  PoppinsThin: {
    fontFamily: 'poppins-thin',
  },
  PoppinsSemiBold: {
    fontFamily: 'poppins-semibold',
  }
};

// App font sizes:
const fontSizes = {
  f12: {
    fontSize: moderateScale(12),
  },
  f14: {
    fontSize: moderateScale(14),
  },
  f16: {
    fontSize: moderateScale(16),
  },
  f18: {
    fontSize: moderateScale(18),
  },
  f20: {
    fontSize: moderateScale(20),
  },
  f22: {
    fontSize: moderateScale(22),
  },
  f24: {
    fontSize: moderateScale(24),
  },
  f26: {
    fontSize: moderateScale(26),
  },
  f28: {
    fontSize: moderateScale(28),
  },
  f30: {
    fontSize: moderateScale(30),
  },
  f32: {
    fontSize: moderateScale(32),
  },
  f36: {
    fontSize: moderateScale(36),
  },
};

const Typography = {fontWeights, fontSizes};

export default Typography;
