import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';
import {getHeight, getWidth, moderateScale} from '../../../common/constants';
import {styles} from '../../../themes';
import {openUrl} from '../../../utils/helpers';

const ChannelCard = ({item, index, onPress}) => {
  return (
    <TouchableOpacity key={item.id}
      onPress={onPress}
      activeOpacity={0.7}
      style={localeStyles.imageWrapper}>
      <FastImage style={localeStyles.image} source={item?.image} />
    </TouchableOpacity>
  );
};

export default ChannelCard;

const localeStyles = StyleSheet.create({
  imageWrapper: {
    width: getWidth(50),
    shadowColor: 'rgba(0, 0, 0, 0.16)',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowRadius: moderateScale(10),
    shadowOpacity: 1,
    borderRadius: moderateScale(100),
    paddingVertical: getHeight(10),
    elevation: 15,
  },
  image: {
    height: getWidth(50),
    width: getWidth(50),
    borderRadius: moderateScale(100),
  },
});
