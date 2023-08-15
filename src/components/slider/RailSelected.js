import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';

const RailSelected = () => {
  return (
    <View style={styles.root} />
  );
};

export default memo(RailSelected);

const styles = StyleSheet.create({
  root: {
    height: 31,
    backgroundColor: 'rgba(52, 52, 52, 0.5)',//'#4499ff',
    borderRadius: 2,
  },
});