import { View, Text, SafeAreaView, StyleSheet, Dimensions, FlatList, ScrollView, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import React, { useEffect, useState, useRef, useCallback } from 'react';
import WHeader from '../../components/common/WHeader';
import FastImage from 'react-native-fast-image';
import images from '../../assets/images';
import { colors, styles } from '../../themes';
import { getHeight, getWidth, moderateScale } from '../../common/constants';
import WText from '../../components/common/WText';
import { StackNavStrings } from '../../navigation/NavigationKeys';
import { useSelector } from 'react-redux';
import WebView from 'react-native-webview';
import RenderHtml from 'react-native-render-html';
import { useWindowDimensions } from 'react-native';
import CustomPopup from '../../components/common/CustomPopup';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import { CloseBlueIcon } from '../../assets/svgs';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import { useFocusEffect } from '@react-navigation/native'

// import { useSelector } from 'react-redux';

const NewsDetail = ({ route }) => {
  const newsData = useSelector(state => state.settings.newsData);
  const { width, height } = useWindowDimensions();
  const [image, setImage] = useState({})
  const [webViewHeight, setWebViewHeight] = useState(0);
  const [indextoScroll, setIndex] = useState(2)
  const { isReadAll = false, index } = route.params.data
  const inputRef = useRef(null)
  const ref = useRef(null)
  const [load, setLoad] = useState(false)

  const onPressBack = () => {
    if (isReadAll) {
      navigation.navigate(StackNavStrings.ReadAllNews);
    } else {
      navigation.navigate(StackNavStrings.News);
      // navigation.goBack()
    }
  };

  useFocusEffect(
    useCallback(() => {
      setIndex(index)
    }, [])
  )


  const openPop = (items) => {
    setImage(items)
    inputRef.current.show()
  }

  const closePopup = () => {
    inputRef.current.close()
  }
  const Component = () => {
    // console.log("image",image)
    return (
      <View >
        <View style={{}}>
          <View style={{ alignSelf: "flex-end", paddingEnd: 20, marginTop: -20 }}>
            <TouchableOpacity style={{}} onPress={closePopup}>
              <CloseBlueIcon />
            </TouchableOpacity>
          </View>
          <FastImage resizeMode='contain'
            style={{ width: windowWidth, height: windowHeight / 2 }}
            source={{ uri: image.image }} />
          {/* <Image
            resizeMode='contain'
            style={{ width: windowWidth, height: windowHeight/2 }}
            source={{ uri: image.image }}
          /> */}
        </View>
      </View>
    )
  }
  const renderSlider = ({ item, index }) => {
    console.log("heyData1", item)
    return (
      <ScrollView style={{ flex: 1 }}>
        <View style={localStyles.latestnewsWrapper}>
          <WText
            color={colors.primary}
            style={{ fontFamily: 'Poppins-Medium', fontSize: 20 }}>
            {item.title}
          </WText>
          <TouchableOpacity style={{
            width: getWidth(250),
            height: getHeight(200)
          }}
            onPress={() => openPop(item)}>
            <FastImage
              source={{ uri: item.image }}
              onLoadStart={(e) => setLoad(true)}
              onLoadEnd={(e) => setLoad(false)}
              resizeMode="contain"
              style={{
                width: getWidth(250),
                height: getHeight(200),
                alignSelf: 'center'
              }} />
            {load ? <ActivityIndicator
              style={{
                position: 'absolute',
                // justifyContent:'center',
                // alignSelf:'center'
                // alignItems:'center'
                //  left:25,
                // top:5,
                width: getWidth(250),
                height: getHeight(200)
              }}
              size="large"
              color={colors.homeHeadingTitle} ></ActivityIndicator> : null}


          </TouchableOpacity>

          <RenderHtml
            contentWidth={width}
            source={{ html: item.description }}
          />
        </View>
      </ScrollView>
    )
  }

  return (

    <SafeAreaView style={{ flex: 1 }}>

      <WHeader title={'News & Notifications'} settingIcon={false} backIcon={true} onPress={onPressBack} />

      <FastImage source={images.tutorial1} style={localStyles.imageBackground}>

        {/* <ScrollView showsVerticalScrollIndicator={false}> */}
        <View style={{ height: windowHeight - getHeight(240) }}>
          <FlatList

            ref={ref}
            showsHorizontalScrollIndicator={false}
            initialScrollIndex={indextoScroll}
            // onScrollToIndexFailed={()=>{}}
            onScrollToIndexFailed={info => {
              const wait = new Promise(resolve => setTimeout(resolve, 500));
              wait.then(() => {
                ref.current?.scrollToIndex({ index: info.index, animated: true });
              });
            }}
            horizontal={true}
            pagingEnabled={true}
            data={newsData?.data}
            renderItem={renderSlider}
            keyExtractor={item => item.id}
          />
        </View>
       
        <CustomPopup inputRef={inputRef}
          component={Component}
          transparent={true}
        >
        </CustomPopup>
      </FastImage>


    </SafeAreaView>



  );
};

export default NewsDetail;

const localStyles = StyleSheet.create({
  imageBackground: {
    width: '100%',
    height: '100%',
    flex: 1,
    resizeMode: 'cover',
  },
  screenWrappper: {
    flex: 1
  },
  latestnewsWrapper: {
    width: windowWidth - 40,

    backgroundColor: colors.colorWhite,
    shadowColor: 'rgba(0, 0, 0, 0.16)',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    borderRadius: moderateScale(20),
    shadowRadius: moderateScale(30),
    shadowOpacity: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: getWidth(20),
    paddingHorizontal: getWidth(20),
    marginHorizontal: 20,
    ...styles.mt20,
  },
});
