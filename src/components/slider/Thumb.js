import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';
import { colors } from '../../themes';

const THUMB_RADIUS_LOW = 12;
const THUMB_RADIUS_HIGH = 16;

const Thumb = ({ name }) => {
  return <View style={name === 'high' ? styles.rootHigh : styles.rootLow} />;
};

const styles = StyleSheet.create({
  rootLow: {
    width: 15,//THUMB_RADIUS_LOW * 2,
    height: 40,//THUMB_RADIUS_LOW * 2,
    // borderRadius: THUMB_RADIUS_LOW,
    borderWidth: 3,
    borderColor: 'yellow',//'#7f7f7f',
    backgroundColor: 'rgba(52, 52, 52, 0.5)',//'#aaaaaa',
  },
  rootHigh: {
    width: 15,//THUMB_RADIUS_HIGH * 2,
    height: 40, //THUMB_RADIUS_HIGH * 2,
    // borderRadius: THUMB_RADIUS_HIGH,
    borderWidth: 3,
    borderColor: 'yellow',//'#7f7f7f',
    backgroundColor: 'rgba(52, 52, 52, 0.5)', //'#ffffff',
  },
});

export default memo(Thumb);