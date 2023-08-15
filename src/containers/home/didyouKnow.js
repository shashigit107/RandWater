//------------------react-native Import------------
import {
  View,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  FlatList,
  ScrollView,
  useWindowDimensions
} from 'react-native';
import React, {
  useState,
  useRef,
  useCallback
} from 'react';

//---------------Library Import---------------
import { useSelector } from 'react-redux';
import RenderHtml from 'react-native-render-html';
import FastImage from 'react-native-fast-image';
import { useFocusEffect } from '@react-navigation/native'

//------------reusable Component Import-----------
import images from '../../assets/images';
import WHeader from '../../components/common/WHeader';
import { colors, styles } from '../../themes';
import {
  getHeight,
  getWidth,
  moderateScale
} from '../../common/constants';
import WText from '../../components/common/WText';

//---------component Constant -----------------------
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;




const didyouKnow = ({ route, navigation }) => {
  const getFactData = useSelector(state => state.settings.QuickFactData)
  const { width, height } = useWindowDimensions();
  const [indextoScroll, setIndex] = useState(0)
  const { data } = route.params
  const ref = useRef(null)
  const onPressBack = () => {
    console.log("jeyeyye")
    navigation.navigate("Home");
    // navigation.navigate()
  };

  useFocusEffect(
    useCallback(() => {
      console.log("index-----", data)
      setIndex(data)
    }, [])
  )



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
          <View style={{ paddingTop: -10 }}>
            <RenderHtml
              contentWidth={width}
              source={{ html: item.description }}
            />
          </View>
        </View>
      </ScrollView>
    )
  }

  //---------------DidYouKnow component Return ----------------
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* <Text>hey</Text> */}

      <WHeader title={'Did you know?'} settingIcon={false} backIcon={true} onPress={onPressBack} />

      <FastImage source={images.tutorial1} style={localStyles.imageBackground}>
        <View style={{ height: windowHeight - getHeight(240) }}>
          <FlatList
            ref={ref}
            showsHorizontalScrollIndicator={false}
            initialScrollIndex={indextoScroll}
            onScrollToIndexFailed={info => {
              const wait = new Promise(resolve => setTimeout(resolve, 500));
              wait.then(() => {
                ref.current?.scrollToIndex({ index: info.index, animated: true });
              });
            }}
            horizontal={true}
            pagingEnabled={true}
            data={getFactData?.data}
            renderItem={renderSlider}
            keyExtractor={item => item.id}
          />
        </View>


      </FastImage>


    </SafeAreaView>



  );
};

export default didyouKnow;

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
