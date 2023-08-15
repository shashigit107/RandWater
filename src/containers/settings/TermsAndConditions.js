import React, { useEffect } from 'react';
import { View, SafeAreaView, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { WebView } from 'react-native-webview';

import {
  clearSettingsData,
  getStaticPages,
} from '../../redux/actions/settingsAction';
import { showPopupWithOk } from '../../utils/helpers';
import strings from '../../i18n/strings';
import {
  GET_STATIC_PAGES_FAILED,
  GET_STATIC_PAGES_SUCCESS,
  UNAUTHORIZED,
} from '../../redux/types';
import WHeader from '../../components/common/WHeader';
import WLoader from '../../components/common/WLoader';
import { colors, styles } from '../../themes';
import { getHeight } from '../../common/constants';

const TermsAndConditions = ({ navigation }) => {
  const settings = useSelector(state => state.settings);
  const dispatch = useDispatch();

  //Loading State
  let isLoading = settings && settings.isLoading;
  const [termsUrl, setTermsUrl] = React.useState('');

  useEffect(() => {
    dispatch(getStaticPages());
    console.log("termsUrl1", termsUrl)
  }, []);

  useEffect(() => {
    let { actions } = settings;
    console.log("shashiranjan1", actions)
    if (actions) {
      let { type, message, data } = actions;
      console.log("shashi ranjan", data)
      if (type === GET_STATIC_PAGES_FAILED) {
        //Show Popup Message Of Error
        console.log("hey1")
        showPopupWithOk(strings.randWater, message);
        //Clear settings Data
        dispatch(clearSettingsData());
      } else if (type === GET_STATIC_PAGES_SUCCESS) {
        console.log("hey2")
        setTermsUrl(data?.data?.privacy_policy);
        //do something for success
        dispatch(clearSettingsData());
      } else if (type === UNAUTHORIZED) {
        console.log("hey3")
        //Show Error Message For Unauthorized
        showPopupWithOk(strings.randWater, message);
        //Clear settings Data
        dispatch(clearSettingsData());
      }
    }
    console.log("termsUrl", termsUrl)
  }, [settings]);

  const onPressBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={[styles.mainContainer, {}]}>
      <WHeader title={'Privacy Policy'} close />
      {/* Terms and Conditions */}
      <View style={localStyles.separator} />
      {/* <View style={{paddingRight:20}}> */}
      <WebView
        containerStyle={localStyles.containerStyle}
        startInLoadingState={true}
        showsVerticalScrollIndicator={false}
        source={{ uri: termsUrl }} />
      {/* </View> */}
      {isLoading && <WLoader />}
    </SafeAreaView>
  );
};

const localStyles = StyleSheet.create({
  separator: {
    width: '100%',
    borderWidth: 2,
    borderColor: colors.secondary,
    ...styles.mb2,
    // marginRight:5
  },
  containerStyle: {
    marginRight: 20,
    marginTop: 20,
    paddingBottom: getHeight(20),
  },
  headerContainer: {
    ...styles.mv10,
    ...styles.flexRow,
    alignItems: 'center',
    ...styles.mh20,
  },
  headerTitle: {
    ...styles.selfCenter,
    ...styles.ml20,
  },
});

export default TermsAndConditions;
