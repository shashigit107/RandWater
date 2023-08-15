import React, {useEffect} from 'react';
import {View, StyleSheet, SafeAreaView} from 'react-native';
import {colors, styles} from '../../themes';
import WHeader from '../../components/common/WHeader';
import {WebView} from 'react-native-webview';
import {useDispatch, useSelector} from 'react-redux';
import WLoader from '../../components/common/WLoader';
import {
  GET_STATIC_PAGES_FAILED,
  GET_STATIC_PAGES_SUCCESS,
  UNAUTHORIZED,
} from '../../redux/types';
import {showPopupWithOk} from '../../utils/helpers';
import strings from '../../i18n/strings';
import {
  clearSettingsData,
  getStaticPages,
} from '../../redux/actions/settingsAction';
import {getHeight} from '../../common/constants';

const PrivacySettings = () => {
  const settings = useSelector(state => state.settings);
  const dispatch = useDispatch();
  //Loading State
  let isLoading = settings && settings.isLoading;
  const [privacyPolicyUrl, setPrivacyPolicyUrl] = React.useState('');

  useEffect(() => {
    dispatch(getStaticPages());
  }, []);

  useEffect(() => {
    let {actions} = settings;
    if (actions) {
      let {type, message, data} = actions;
      if (type === GET_STATIC_PAGES_FAILED) {
        //Show Popup Message Of Error
        showPopupWithOk(strings.randWater, message);
        //Clear settings Data
        dispatch(clearSettingsData());
      } else if (type === GET_STATIC_PAGES_SUCCESS) {
        setPrivacyPolicyUrl(data?.data?.privacy_policy);
        //do something for success
        dispatch(clearSettingsData());
      } else if (type === UNAUTHORIZED) {
        //Show Error Message For Unauthorized
        showPopupWithOk(strings.randWater, message);
        //Clear settings Data
        dispatch(clearSettingsData());
      }
    }
  }, [settings]);

  return (
    <SafeAreaView style={styles.mainContainer}>
      <WHeader title={'Privacy Policy'} close />
      <View style={localStyles.separator} />
      <WebView
        startInLoadingState={true}
        source={{uri: privacyPolicyUrl}}
        containerStyle={localStyles.containerStyle}
        showsVerticalScrollIndicator={false}
      />
      {isLoading && <WLoader />}
    </SafeAreaView>
  );
};

const localStyles = StyleSheet.create({
  separator: {
    width: '100%',
    borderWidth: 2,
    borderColor: colors.secondary,
  },
  containerStyle: {
    ...styles.mt20,
    ...styles.mr20,
    // paddingBottom: getHeight(1),
  },
});

export default PrivacySettings;
