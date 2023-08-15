import React, { useState, useEffect, useRef } from 'react';
import { View, SafeAreaView, StyleSheet, FlatList, AppState } from 'react-native';
import AutoHeightWebView from 'react-native-autoheight-webview';
import notifee, { EventType } from '@notifee/react-native';
import FastImage from 'react-native-fast-image';
import RenderHtml from 'react-native-render-html';

import WText from '../../components/common/WText';
import WHeader from '../../components/common/WHeader';
import WLoader from '../../components/common/WLoader';

import {
  WaterDrops,
  WaterInprogress,
  WaterInvestigationComplete,
} from '../../assets/svgs';
import images from '../../assets/images';
import { colors, styles } from '../../themes';
import Typography from '../../themes/typography';
import strings from '../../i18n/strings';

import {
  getHeight,
  getWidth,
  moderateScale,
  screenHeight,
} from '../../common/constants';
import { showPopupWithOk } from '../../utils/helpers';

import {
  GET_REPORTS_FAILED,
  GET_REPORTS_SUCCESS,
  UNAUTHORIZED,
} from '../../redux/types';
import {
  clearSettingsData,
  getReports,
} from '../../redux/actions/settingsAction';
import { useDispatch, useSelector } from 'react-redux';
import flex from '../../themes/flex';

const Reports = ({ route, navigation }) => {
  const settings = useSelector(state => state.settings);
  // const [thanku, setthanku]=useState(false)
  const dispatch = useDispatch();


  //Loading State
  let isLoading = settings && settings.isLoading;

  const [reports, setReports] = useState('');

  useEffect(() => {
    dispatch(getReports());
  }, []);

  useEffect(() => {
    return notifee.onForegroundEvent(({ type, detail }) => {
      if (type === EventType.PRESS) {
        dispatch(getReports());
      }
    });
  }, []);



  useEffect(() => {
    let { actions } = settings;
    if (actions) {
      let { type, message, data } = actions;
      if (type === GET_REPORTS_FAILED) {
        //Show Popup Message Of Error
        showPopupWithOk(strings.randWater, message);
        //Clear settings Data
        dispatch(clearSettingsData());
      } else if (type === GET_REPORTS_SUCCESS) {
        setReports(data.data);
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

  const InvestigationInProgress = ({ item }) => {
    return (
      <View style={localStyles.progressReport}>
        <WaterInprogress />
        <View style={[styles.mt10, styles.center]}>
          <WText type={'BB12'} color={colors.colorWhite}>
            {'INVESTIGATION IN PENDING'}
          </WText>
          <WText type={'BB12'} color={colors.placeHolder}>
            {`INCIDENT "${item?.sub_type}"`}
          </WText>
          <View>
            {item?.remark && (
              <RenderHtml
                contentWidth={getWidth(100)}
                source={{ html: item?.remark }}
                baseStyle={{ textAlign: 'center', marginHorizontal: getWidth(20) }}
              />
            )}
          </View>
          {item?.title && (
            <WText
              type={'BB14'}
              color={colors.placeHolder}
              style={{
                width: moderateScale(250),
                textAlign: 'center',
                ...styles.mt10,
                textTransform: 'uppercase',
                fontWeight: 'bold',
              }}>
              {item?.title}
            </WText>
          )}
          <WText
            type={'LA16'}
            color={colors.colorWhite}
            style={{
              width: moderateScale(250),
              textAlign: 'center',
              ...styles.mt10,
              fontStyle: 'italic',
            }}>
            {'We are currently investigating Thank You!'}
          </WText>
        </View>
      </View>
    );
  };

  const InvestigationComplete1 = ({ item }) => {
    return (
      <View
        style={[
          localStyles.progressReport,
          {
            backgroundColor: colors.colorWhite,
          },
        ]}>
        <WaterInvestigationComplete />
        <View style={[styles.mt10, styles.center]}>
          <WText type={'BB12'} color={colors.placeHolder}>
            {item?.status === '3'
              ? 'INVESTIGATION INVALID'
              : 'INVESTIGATION IN PROCESS'}
          </WText>
          <WText type={'BB12'} color={colors.placeHolder}>
            {`INCIDENT "${item?.sub_type}"`}
          </WText>
          {item?.title && (
            <WText
              type={'BB14'}
              color={colors.placeHolder}
              style={{
                width: moderateScale(250),
                textAlign: 'center',
                textTransform: 'uppercase',
                fontWeight: '800',
              }}>
              {item?.title}
            </WText>
          )}

          <View style={{ flexDirection: "row",width:"60%" }}>
            <WText type={'BB13'} color={colors.placeHolder} >
              {'Remarks :'}
            </WText>
            <View style={{ marginLeft: -15  }}>
              {item?.remark && (
                <RenderHtml
                  contentWidth={getWidth(100)}
                  source={{ html: item?.remark }}
                  baseStyle={{ textAlign: 'center', marginHorizontal: getWidth(20) }}
                />
              )}
            </View>
          </View>
          
          {item?.status !== '3' && (
            <WText
              type={'LA14'}
              color={colors.placeHolder}
              style={{
                width: moderateScale(250),
                textAlign: 'center',
                ...styles.mt8,
                fontWeight: 'bold'
              }}>
              {'THANK YOU FOR YOUR REPORT!'}
            </WText>
          )}
          <View style={styles.mt10}>
            <WaterDrops />
          </View>
          <WText
            type={'BB12'}
            color={colors.placeHolder}
            style={{
              width: moderateScale(250),
              textAlign: 'center',
              ...styles.mt10,
              fontWeight: '700',
            }}>
            {'You’ve earned 5 valuable droplets.'}
          </WText>
          <WText
            type={'BB12'}
            color={colors.placeHolder}
            style={{
              width: moderateScale(250),
              textAlign: 'center',
              fontWeight: '700',
            }}>
            {'Collect droplets to help us SAVE OUR WATER! '}
          </WText>
        </View>
      </View>
    );
  };

  const InvestigationComplete2 = ({ item }) => {
    return (
      <View
        style={[
          localStyles.progressReport,
          {
            backgroundColor: colors.colorWhite,
          },
        ]}>
        <WaterInvestigationComplete />
        <View style={[styles.mt10, styles.center]}>
          <WText type={'BB12'} color={colors.placeHolder}>
            {'INVESTIGATION COMPLETE'}
          </WText>
          <WText type={'BB12'} color={colors.placeHolder}>
            {`INCIDENT "${item?.sub_type}"`}
          </WText>
          {item?.title && (
            <WText
              type={'BB14'}
              color={colors.placeHolder}
              style={{
                width: moderateScale(250),
                textAlign: 'center',
                textTransform: 'uppercase',
                fontWeight: 'bold',
              }}>
              {item?.title}
            </WText>
          )}
          <View style={{ flexDirection:"row",width:"60%"}}>
            <WText type={'BB13'} color={colors.placeHolder} >
              {'Remarks :'}
            </WText>
            <View style={{ marginLeft: -15 }}>
              {item?.remark && (
                <RenderHtml
                  contentWidth={getWidth(100)}
                  source={{ html: item?.remark }}
                  baseStyle={{ textAlign: 'center', marginHorizontal: getWidth(20) }}
                />
              )}
            </View>
          </View>
         
          <WText
            type={'LA14'}
            color={colors.placeHolder}
            style={{
              width: moderateScale(250),
              textAlign: 'center',
              ...styles.mt8,
              fontWeight: "bold"
            }}>
            {'THANK YOU FOR YOUR REPORT!'}
          </WText>
         
          <View style={styles.mt10}>
            <WaterDrops />
          </View>
          <WText
            type={'BB12'}
            color={colors.placeHolder}
            style={{
              width: moderateScale(250),
              textAlign: 'center',
              ...styles.mt10,
              fontWeight: '700',
            }}>
            {'You’ve earned 5 valuable droplets.'}
          </WText>
          <WText
            type={'BB12'}
            color={colors.placeHolder}
            style={{
              width: moderateScale(250),
              textAlign: 'center',
              fontWeight: '700',
            }}>
            {'Collect droplets to help us SAVE OUR WATER! '}
          </WText>
        </View>
      </View>
    );
  };

  const RenderReports = ({ item }) => {
    // return <InvestigationComplete1 item={item} />;
    console.log("item+++++++++++++", item)
    if (item?.status === '1' || item?.status === '3') {
      return <InvestigationComplete1 item={item} />;
    } else if (item?.status === '2') {
      return <InvestigationComplete2 item={item} />;
    } else {
      return <InvestigationInProgress />;
    }
  };

  const ListEmptyComponent = () => {
    if (isLoading) {
      return <></>;
    }
    return (
      <View style={localStyles.noResultsView}>
        <WText style={localStyles.oopsText}>{'No Result Found'}</WText>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <WHeader title={'Your Reports'} close isbackFromThankYou={false} />
      <FastImage source={images.tutorial1} style={localStyles.innerContainer}>
        <WText type={'BB18'} color={colors.placeHolder}>
          {'All Your Reports'}
        </WText>
        <FlatList
          data={reports}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => <RenderReports item={item} />}
          style={{
            width: '100%',
            height: '100%',
          }}
          ListEmptyComponent={ListEmptyComponent}
        />
      </FastImage>
      {isLoading && <WLoader />}
    </SafeAreaView>
  );
};

const localStyles = StyleSheet.create({
  innerContainer: {
    ...styles.flex,
    ...styles.pt20,
    ...styles.ph20,
    ...styles.itemsCenter,
    paddingBottom: moderateScale(110),
  },
  progressReport: {
    backgroundColor: colors.placeHolder,
    minHeight: moderateScale(200),
    ...styles.mt20,
    borderRadius: moderateScale(20),
    ...styles.itemsCenter,
    ...styles.pv20,
  },
  noResultsView: {
    height: screenHeight / 2.5,
    width: '100%',
    ...styles.nonFlexCenter,
  },
  oopsText: {
    marginVertical: moderateScale(20),
    fontSize: moderateScale(18),
    color: colors.colorWhite,
    ...Typography.fontWeights.Bold,
  },
  webview: {
    height: getHeight(20),
    backgroundColor: 'red',
  },
});

export default Reports;
