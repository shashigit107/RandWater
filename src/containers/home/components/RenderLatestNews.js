import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Text } from 'react-native';
import moment from 'moment';

import WText from '../../../components/common/WText';
import { getHeight, getWidth, moderateScale } from '../../../common/constants';
import { colors, styles } from '../../../themes';
import images from '../../../assets/images';

const RenderLatestNews = ({ item, index, onPress }) => {
  console.log("item", item)
  return (
    <TouchableOpacity key={item.id} style={localStyles.latestNewsItemWrapper} onPress={onPress} activeOpacity={0.7}>
      <Image source={{ uri: item.image }} resizeMode="contain" style={localStyles.newsImage} />
      <View style={localStyles.content}>
        <View style={localStyles.dateText}>
          <Text style={localStyles.latestNewsDate}>{item.publish_date}</Text>
          <Text style={localStyles.divider}>|</Text>
          <Text style={localStyles.latestNewsText}>Latest News</Text>
        </View>
        <Text style={localStyles.latestNewsTitle} numberOfLines={2}>Rand Water exhibitation news</Text>
        <Text style={localStyles.latestNewsDescription} numberOfLines={4}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default RenderLatestNews;

const localStyles = StyleSheet.create({
  latestNewsItemWrapper: {
    width: '46%',
    borderRadius: moderateScale(10),
    backgroundColor: colors.newsBackground,
    ...styles.mv5,
    overflow: 'hidden'
  },
  newsImage: {
    width: '100%', height: 104
  },
  content: {
    ...styles.mv15,
    ...styles.mh10,
  },
  dateText: {
    flexDirection: 'row',
    ...styles.mb10
  },
  divider: {
    color: colors.blueShade,
    fontSize: 8
  },
  latestNewsTitle: {
    color: colors.greenShade5,
    fontSize: 11,
    ...styles.mb10,
    fontWeight: '600'
  },
  latestNewsDescription: {
    lineHeight: getHeight(17),
    color: colors.colorWhite,
    fontSize: 12,
    letterSpacing: 0.5,
  },
  latestNewsDate: {
    color: colors.blueShade,
    fontSize: 8,
    ...styles.mr10
  },
  latestNewsText: {
    color: colors.greenShade5,
    fontSize: 8,
    ...styles.ml10
  },
});
