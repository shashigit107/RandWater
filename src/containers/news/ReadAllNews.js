import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, SafeAreaView, StyleSheet, TouchableOpacity, ActivityIndicator, Image } from "react-native";
import TwitterFeedsCard from "../home/components/TwitterFeedsCard";
import images from "../../assets/images";
import moment from "moment";
// import { getWidth } from '../../common/constants';
import WHeader from "../../components/common/WHeader";
import { StackNavStrings } from '../../navigation/NavigationKeys';
import { openUrl } from '../../utils/helpers';
import FastImage from 'react-native-fast-image';
// import { getWidth, moderateScale } from '../../../common/constants';
import { moderateScale, getWidth } from "../../common/constants";
import WText from "../../components/common/WText";
import { colors } from "../../themes";
import { useDispatch, useSelector } from 'react-redux';
import WebView from "react-native-webview";

// const RealAllNews = [
// const RealAllNews = [
//   {
//     id: 1,
//     newsImage: images.news1,
//     title: 'Launch of Vlakfontein Reservoir',
//     description:
//       'Rand Water launched a mega Reservoir in the city of Ekurhuleni on Friday, 17 February 2023.  The newly built 210 megalitre Vlakfontein reservoir is the largest cylindrical post-tensioned reservoir in the country. To our knowledge, this is also the largest circular post-tensioned reservoir in the world.',
//     date: moment(),
//   },
//   {
//     id: 2,
//     newsImage: images.news2,
//     title: 'Rand Water to Implement 30-Hour Planned Maintenance on the R1, S1 and R5 Pipelines',
//     description:
//       ' Rand Water has scheduled the planned maintenance on its S1, R1 and R5 pipelines to tie-in a portion of the S4 pipeline to the existing S1, R1 and R5 pipelines. The 30-hour project will commence from 03:00am on 24 February until 09:00am on 25 February 2023. The project will entail the implementation of various cross-connections.',
//     date: moment(),
//   },
//   {
//     id: 3,
//     newsImage: images.news3,
//     title: 'National Water Week 20 – 26 March 2023',
//     description:
//       'The National Water Week celebrates water and raises awareness of the 2.2 billion people living without access to safe water. It is about taking action to tackle the global water crisis and achieving Sustainable Development Goal 6: water and sanitation for all by 2030.',
//     date: moment(),
//   },
//   {
//     id: 4,
//     newsImage: images.news4,
//     title: 'Rand Water launches new campaign: Think Before You Open',
//     description:
//       'With a new campaign featuring the wise Gogo Nomanzi, we are urging consumers to use water sparingly as rising temperatures are putting a severe strain on our distribution network. The continued high consumption may lead to serious water shortages in Rand Water’s areas of supply.',
//     date: moment(),
//   },

// ];







function ReadAllNews() {
  const [isReadAll] = useState(true)
  const newsData = useSelector(state => state.settings.newsData);
  const [load, setLoad] = useState(false)
  console.log("hey==========", newsData)
  const onPressBack = () => {
    // navigation.goBack();
    navigation.navigate(StackNavStrings.News);
  };
  const [webViewHeight, setWebViewHeight] = useState(0);
  const onMessage = event => {
    setWebViewHeight(Number(event.nativeEvent.data));
  };
  useEffect(() => {

  }, [])
  return (
    <>
      <SafeAreaView style={localStyles.mainContainer}>
        <WHeader title={'News & Notifications'} settingIcon={false} backIcon={true} onPress={onPressBack} />
        <View >
          <ScrollView nestedScrollEnabled={true} showsVerticalScrollIndicator={false} style={{ height: "75%", backgroundColor: 'white' }}>
            <View style={{ backgroundColor: 'white' }}>
              {newsData?.data.map((item, index) => {
                return (
                  <TouchableOpacity key={item.id}
                    onPress={() => navigation.push(StackNavStrings.NewsDetail, { data: { index, isReadAll } })}
                    activeOpacity={0.7}>
                    <View style={localStyles.wrapper}>
                      <View style={localStyles.imageInnerWrapper}>
                        <FastImage
                          resizeMode="cover"
                          // onLoadStart={(e)=>setLoad(true)}
                          // onLoad={(e)=>setLoad(true)}
                          // onLoadEnd={(e)=>setLoad(false)}
                          source={{ uri: item.image }}
                          style={localStyles.image} />
                        {/* {load ? <ActivityIndicator
                        style={{position:'absolute' ,left:25, top:5}}
                         size="large"
                          color="#0000ff" ></ActivityIndicator> : null} */}
                      </View>
                      <View style={{ flex: .8 }}>
                        <View style={{ flexDirection: "row" }}>
                          <View style={{ flex: .7 }}>
                            <WText
                              type={'MA18'}
                              // numberOfLines={2}
                              style={localStyles.title}>
                              {item?.title}
                            </WText>
                          </View>
                          <View style={{ flex: .3, height: 50 }}>
                            <WText type={'MA14'} color={colors.colorRed} style={localStyles.date}>
                              {item.publish_date}
                            </WText>
                          </View>
                        </View>
                        <View style={{ paddingBottom: 10 }}>
                          {/* <Text> */}
                          {/* <WebView
                              originWhitelist={['*']}
                              style={{ height: webViewHeight }}
                              scrollEnabled={false}
                              onMessage={onMessage}
                              // onNavigationStateChange={navigationChanged}
                              injectedJavaScript="window.ReactNativeWebView.postMessage(Math.max(document.body.offsetHeight, document.body.scrollHeight));"
                              // source={{html: data}}
                              source={{ html: `<html><head><meta name="viewport" content="width=device-width, initial-scale=1.0"></head><body>${item.description}</body></html>` }}
                            /> */}

                          {/* <WText

                            type={'MA12'}
                            color={colors.gray}
                            numberOfLines={3}
                            style={localStyles.description}> 
                            {item.description}
                           
                           </WText> */}
                        </View>
                        <View style={localStyles.itemSeparatorComponent} ></View>
                      </View>
                      <View>
                      </View>
                    </View>

                  </TouchableOpacity>

                )

              })}
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </>
  )
}
export default ReadAllNews

const localStyles = StyleSheet.create({
  width: getWidth(10),
  mainContainer: {
    flex: 1,
    backgroundColor: colors.colorWhite
  },
  title: {
    fontSize: 17,
  },
  image: {
    height: getWidth(60),
    width: getWidth(60),
    borderRadius: moderateScale(100),
    elevation: 7,
  },
  wrapper: {
    padding: 10,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: colors.colorWhite,
  },
  itemSeparatorComponent: {
    // paddingTop:10,
    height: 1,
    backgroundColor: "grey"
  },
  imageInnerWrapper: {
    justifyContent: 'center',
    // alignItems:'center',
    paddingLeft: 10,
    alignSelf: 'center',
    flex: .2,
    height: getWidth(50),
    width: getWidth(50),
    shadowColor: 'rgba(0, 0, 0, 0.16)',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    // elevation: 7,

    shadowRadius: moderateScale(10),
    shadowOpacity: 1,
    // backgroundColor: colors.colorWhite,
    borderRadius: moderateScale(100),
  },
})
