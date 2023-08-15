import React from 'react';
import {StyleSheet, View} from 'react-native';
import {colors, styles} from '../../themes';

const WDivider = () => {
  return (
    <View>
      <View style={localStyle.line} />
    </View>
  );
};

const localStyle = StyleSheet.create({
  line: {
    borderBottomWidth: 1,
    borderColor: colors.divider,
    ...styles.mh20,
  },
});

export default React.memo(WDivider);
