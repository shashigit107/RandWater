import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';
import { getWidth, moderateScale } from '../../../common/constants';
import WText from '../../../components/common/WText';
import moment from 'moment';
import { colors, styles } from '../../../themes';
const TwitterFeedsCard = ({ item, index, onPress }) => {
  return (
    <TouchableOpacity key={item.id}
      onPress={onPress}
      activeOpacity={0.7}
      style={localStyles.wrapper}>




      <View style={localStyles.imageWrapper}>
        <View style={localStyles.imageInnerWrapper}>
          <FastImage source={item?.newsImage} style={localStyles.image} />
        </View>
      </View>

      
      <View style={localStyles.detailWrapper}>
        <View style={localStyles.titleDateWrapper}>
          <View style={{ flexDirection: 'column',alignItems:'center' }}>
            <WText
              type={'MA18'}
              numberOfLines={2}
              style={localStyles.title}>
              {item?.title}
            </WText>
            <WText type={'MA18'} style={localStyles.HeaderDes}>
              {item?.HeaderDes}
            </WText>
          </View>





          <WText type={'MA14'} color={colors.colorRed} style={localStyles.date}>
            {moment(item?.date).format('MMMM D')}
          </WText>
        </View>
        <WText
          type={'MA12'}
          color={colors.gray}
          numberOfLines={3}
          style={localStyles.description}>
          {item?.description}
        </WText>
      </View>
    </TouchableOpacity>
  );
};

export default TwitterFeedsCard;

const localStyles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: colors.colorWhite,
  },
  imageWrapper: {
    flex: 2.0,
    alignItems: 'center',
    backgroundColor: colors.colorWhite,
    ...styles.pt10
  },
  imageInnerWrapper: {
    height: getWidth(50),
    width: getWidth(50),
    shadowColor: 'rgba(0, 0, 0, 0.16)',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowRadius: moderateScale(10),
    shadowOpacity: 1,
    backgroundColor: colors.colorWhite,
    borderRadius: moderateScale(100),
  },
  image: {
    height: getWidth(50),
    width: getWidth(50),
    borderRadius: moderateScale(100),
    elevation: 15,
  },
  detailWrapper: {
    borderBottomWidth: getWidth(0.3),
    borderBottomColor: colors.gray,
    flex: 8,
    ...styles.ph10,
    ...styles.pb10
  },
  titleDateWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  HeaderDes: {
    fontSize: 12
  },
  title: {
    textTransform: 'capitalize',
  },
  description: {
    letterSpacing: getWidth(1),
  },
});
