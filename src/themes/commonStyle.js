import {StyleSheet} from 'react-native';
import {moderateScale} from '../common/constants';
import {colors} from './colors';
import flex from './flex';
import margin from './margin';

// App Common Styles
export default StyleSheet.create({
  mainContainer: {
    backgroundColor: colors.colorWhite,
    ...flex.flex,
  },
  innerContainer: {
    paddingHorizontal: moderateScale(20),
    ...margin.mt20,
  },
  generalTitleText: {
    fontSize: moderateScale(24),
    color: colors.secondary,
  },
  underLineText: {
    textDecorationLine: 'underline',
  },
});
