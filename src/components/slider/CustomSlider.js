import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Platform, Image } from 'react-native';
import Slider from 'rn-range-slider';
import Thumb from './Thumb';
import Rail from './Rail';
import RailSelected from './RailSelected';
import Notch from './Notch';
import Label from './Label';
import moment from 'moment/moment';
import { numberConverter } from '../../utils/helpers'
import images from '../../assets/images';

const CustomSlider = ({ maxVideoDuration, setleftRightSecCallBack, cropedVideo, sizeOfVideo, durationOfVideo }) => {
  const [rangeDisabled, setRangeDisabled] = useState(false);
  const [low, setLow] = useState(0);
  const [high, setHigh] = useState(maxVideoDuration);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(maxVideoDuration);

  const renderThumb = useCallback(
    (name) => <Thumb name={name} />,
    [],
  );
  const renderRail = useCallback(() => <Rail />, []);
  const renderRailSelected = useCallback(() => <RailSelected />, []);
  const renderLabel = useCallback(value => <Label text={value} />, []);
  const renderNotch = useCallback(() => <Notch />, []);
  const handleValueChange = useCallback((lowValue, highValue) => {
    console.log("hey------>", lowValue, highValue)

    setLow(lowValue);
    setHigh(highValue);
  }, []);
  const toggleRangeEnabled = useCallback(
    () => setRangeDisabled(!rangeDisabled),
    [rangeDisabled],
  );
  const cuttingVideo = () => {
    setleftRightSecCallBack(low, high)
  }

  return (
    // <ScrollView>
    <View style={styles.root}>
      <Slider
        style={styles.slider}
        min={min}
        max={max}
        step={1}
        disableRange={rangeDisabled}
        renderThumb={renderThumb}
        renderRail={renderRail}
        renderRailSelected={renderRailSelected}
        renderLabel={renderLabel}
        renderNotch={renderNotch}
        onValueChanged={handleValueChange}
      />
      {/* <View style={styles.horizontalContainer}>
          <Text style={styles.valueText}>{low}</Text>
          <Text style={styles.valueText}>{high}</Text>
        </View> */}

      <View style={{ flex: 1, marginTop: 20, justifyContent: 'space-between', flexDirection: 'row' }}>
        <TouchableOpacity style={{ backgroundColor: 'rgba(52, 52, 52, 0.6)', height: 50, width: 50, borderRadius: 50, justifyContent: 'center', alignItems: 'center' }} onPress={cuttingVideo}>
          {/* <Text style={{ padding: 10 }}>TrimVideo</Text> */}
          <Image resizeMode='contain' source={images.crop} style={{ tintColor: 'white', width: 25 }} />
        </TouchableOpacity>
        <View style={{ borderRadius: 15, backgroundColor: 'rgba(52, 52, 52, 0.6)', height: 35, justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }}>
          <Text style={{ fontSize: 12, color: 'white', paddingHorizontal: 8, }}>{`${moment.duration(Number(durationOfVideo), 'seconds').hours()}:${moment.duration(Number(durationOfVideo), 'seconds').minutes()}:${moment.duration(Number(durationOfVideo), 'seconds').seconds()}   ${numberConverter(sizeOfVideo, 2)} MB`}</Text>
        </View>
        {/* <Text style={{ borderRadius: 15, fontSize: 12, height: 35, color: 'white', backgroundColor: 'rgba(52, 52, 52, 0.6)', paddingHorizontal: 8, alignSelf: 'center', textAlignVertical: 'center' }}>{`${moment.duration(Number(durationOfVideo), 'seconds').hours()}:${moment.duration(Number(durationOfVideo), 'seconds').minutes()}:${moment.duration(Number(durationOfVideo), 'seconds').seconds()}   ${numberConverter(sizeOfVideo, 2)} MB`}</Text> */}
        <TouchableOpacity style={{ backgroundColor: 'rgba(52, 52, 52, 0.6)', height: 50, width: 50, borderRadius: 50, justifyContent: 'center', alignItems: 'center' }} onPress={cropedVideo}>
          {/* <Text style={{ padding: 10 }}>Done</Text> */}
          <Image resizeMode='contain' source={images.done} style={{ tintColor: 'white', width: 25 }} />
        </TouchableOpacity>
      </View>
    </View>
    // </ScrollView>
  );
};

export default CustomSlider;
const styles = StyleSheet.create({
  root: {
    alignItems: 'stretch',
    paddingHorizontal: 12,
    flex: 1,
  },
  slider: {
    zIndex: 999
  },
  button: {
  },
  header: {
    alignItems: 'center',
    backgroundColor: 'black',
    padding: 12,
  },
  horizontalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  text: {
    color: 'white',
    fontSize: 20,
  },
  valueText: {
    // width: 50,
    color: 'white',
    fontSize: 20,
  },
});