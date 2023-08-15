import React, { useEffect, useState } from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import moment from 'moment';

import WText from '../../components/common/WText';
import WHeader from '../../components/common/WHeader';

import { openUrl } from '../../utils/helpers';

import images from '../../assets/images';
import { colors, styles } from '../../themes';
import { getHeight, getWidth, moderateScale } from '../../common/constants';
import { StackNavStrings } from '../../navigation/NavigationKeys';

import RenderLatestNews from '../home/components/RenderLatestNews';
import TwitterFeedsCard from '../home/components/TwitterFeedsCard';
import ChannelCard from '../home/components/ChannelCard';
import { getNews } from '../../redux/actions/settingsAction';
import {useDispatch, useSelector} from 'react-redux';
import WLoader from '../../components/common/WLoader';

// const latestNews = [
//   {
//     id: 1,
//     newsImage:images.news4,
//     title: 'Launch of Vlakfontein Reservoir',
//     description:
//       'Rand Water launched a mega Reservoir in the city of Ekurhuleni on Friday, 17 February 2023.  The newly built 210 megalitre Vlakfontein reservoir is the largest cylindrical post-tensioned reservoir in the country. To our knowledge, this is also the largest circular post-tensioned reservoir in the world.',
//     date: moment(),
//   },
//   {
//     id: 2,
//     newsImage:images.news2,
//     title: 'Rand Water to Implement 30-Hour Planned Maintenance on the R1, S1 and R5 Pipelines',
//     description:
//       ' Rand Water has scheduled the planned maintenance on its S1, R1 and R5 pipelines to tie-in a portion of the S4 pipeline to the existing S1, R1 and R5 pipelines. The 30-hour project will commence from 03:00am on 24 February until 09:00am on 25 February 2023. The project will entail the implementation of various cross-connections.',
//     date: moment(),
//   },
//   {
//     id: 3,
//     newsImage:images.news3,
//     title: 'National Water Week 20 – 26 March 2023',
//     description:
//       'The National Water Week celebrates water and raises awareness of the 2.2 billion people living without access to safe water. It is about taking action to tackle the global water crisis and achieving Sustainable Development Goal 6: water and sanitation for all by 2030.',
//     date: moment(),
//   },
//   {
//     id: 4,
//     newsImage:images.news1,
//     title: 'Rand Water launches new campaign: Think Before You Open',
//     description:
//       'With a new campaign featuring the wise Gogo Nomanzi, we are urging consumers to use water sparingly as rising temperatures are putting a severe strain on our distribution network. The continued high consumption may lead to serious water shortages in Rand Water’s areas of supply.',
//     date: moment(),
//   },
// ];

const twitterFeeds = [
  {
    id: 1,
    newsImage: images.logo,
    title: 'rand water',
    HeaderDes:'IMPORTANT NOTICE',
    description:'#RandWater #ScheduledMaintenance #WaterDemand #WaterSupplyInterruption #WaterWise #WaterConservation',
    date: moment(),
    url: 'https://twitter.com/Rand_Water/status/1627604537681870848?cxt=HHwWgIC89YPttJYtAAAA',
  },
  {
    id: 2,
    newsImage: images.logo,
    title: 'rand water',
    HeaderDes:'MEDIA STATEMENT',
    description:
      'Rand Water has scheduled the planned maintenance on its S1, R1, and R5 pipelines to tie-in a portion of the S4 pipeline to the existing S1, R1, and R5 pipelines.',
    date: moment(),
    url: 'https://twitter.com/Rand_Water/status/1627641579992129536?cxt=HHwWgICx0ZbZxZYtAAAA',
  },
  {
    id: 3,
    newsImage: images.logo,
    title: 'rand water',
    HeaderDes:'WATER SAFETY',
    description:
      '[In pictures] The raised water levels of the Vaal River taken in front of the Riviera Hotel in Vereeniging. Residents are urged to take safety precautions during this time.  ',
    date: moment(),
    url: 'https://twitter.com/Rand_Water/status/1627604537681870848?cxt=HHwWgIC89YPttJYtAAAA',
  },
  
];

const channels = [
  {
    id: 1,
    image: images.Facebook,
    title: 'facebook',
    // url: 'https://www.facebook.com/423727889891945/',
    // url: `fb://page/423727889891945`,
    url: 'https://www.facebook.com/RandWater/',
  },
  {
    id: 2,
    image: images.Twitter,
    title: 'twitter',
    // url: 'https://twitter.com/Rand_Water?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor',
    // url: 'twitter://user?screen_name=Rand_Water',
    url: 'https://twitter.com/Rand_Water',
  },
  {
    id: 3,
    image: images.Linkedin,
    title: 'LinkedIn',
    url: 'https://www.linkedin.com/company/rand-water/',
  },
  {
    id: 4,
    image: images.Youtube,
    title: 'youtube',
    url: 'https://www.youtube.com/channel/UC-V1DiwkJyG9JDkIlL_pUQA',
  },
];
const onclickReadAllNew=()=>{
    navigation.navigate("ReadAllNews",{})
}




const NewsTab = ({ navigation }) => {
  const dispatch= useDispatch()
  // const home = useSelector(state => state.home)
  const newsData = useSelector(state => state.settings.newsData);
  const isLoading = useSelector(state => state.settings.isLoading);
  const[latestSortListedNews,setLatestNews]=useState([])

  // console.log('settings',settings)
  useEffect(()=>{
    console.log("step1")
    // console.log("checkDate",latestNews)
    dispatch(getNews())
  },[])

  useEffect(()=>{
    
   const data= newsData?.data.filter((element,index)=>index<4)
    //  console.log("newsData.data",newsData.data)
    setLatestNews(data)
  },[newsData])


  return (
    <SafeAreaView style={styles.mainContainer}>
      <WHeader title={'News & Notifications'}/>
      <FastImage source={images.tutorial1} style={localStyles.imageBackground}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={localStyles.screenWrappper}>
            <View style={localStyles.latestnewsWrapper}>
              <View style={styles.rowSpaceBetween}>
                <WText
                  style={localStyles.latestNews}
                  color={colors.greenShade4}>
                  latest news
                </WText>
                <TouchableOpacity style={localStyles.readAllBtn} onPress={()=>onclickReadAllNew()}>
                  <Text style={localStyles.BtnText}>Read All</Text>
                </TouchableOpacity>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', flexWrap: 'wrap', }}>
                {latestSortListedNews?.map((item, index) => {
                   
                    return (
                      <RenderLatestNews
                        item={item}
                        index={index}
                        onPress={() =>
                          navigation.push(StackNavStrings.NewsDetail,{data:{index}})
                        } />
                    );
                   
                
                })}
              </View>
            </View>
            <View style={localStyles.twitterFeedWrapper}>
              <WText
                style={localStyles.latestNews}
                color={colors.greenShade4}>
                Twitter Feeds
              </WText>
              <ScrollView nestedScrollEnabled={true} showsVerticalScrollIndicator={false}>
                {twitterFeeds.map((item, index) => {
                  return (
                    <>
                      <TwitterFeedsCard
                        index={index}
                        item={item}
                        onPress={() => navigation.navigate('NewsWebView',{item})}
                      />
                      <View style={localStyles.itemSeparatorComponent} />
                    </>
                  );
                })}
              </ScrollView>
            </View>
            <View style={localStyles.otherChannelWrapper}>
              <WText
                style={localStyles.latestNews}
                color={colors.greenShade4}>
                Other Channels
              </WText>
              <View style={[styles.flexRow, styles.justifyEvenly]}>
                {channels.map((item, index) => {
                  return (
                    <ChannelCard item={item} index={index} onPress={() => openUrl(item?.url)}/>
                  )
                })}
              </View>
            </View>
          </View>
        </ScrollView>
        {isLoading && <WLoader />}
      </FastImage>
      
    </SafeAreaView>
  );
};

const localStyles = StyleSheet.create({
  screenWrappper: {
    flex: 1,
  },
  latestnewsWrapper: {
    width: '90%',
    backgroundColor: colors.colorWhite,
    shadowColor: 'rgba(0, 0, 0, 0.16)',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    borderRadius: moderateScale(20),
    shadowRadius: moderateScale(30),
    shadowOpacity: 1,
    alignSelf: 'center',
    padding: getWidth(10),
    ...styles.mt20,
  },
  imageBackground: {
    width: '100%',
    height: '100%',
    flex: 1,
    resizeMode: 'cover',
  },
  itemSeparatorComponent: {
    width: getWidth(10),
  },

  latestNews: {
    textTransform: 'capitalize',
    fontFamily: 'Poppins-Medium',
    fontSize: 20,
    letterSpacing: 1,
    ...styles.mt10,
    ...styles.ml10,
    ...styles.mb10,
  },
  twitterFeedWrapper: {
    height: getHeight(320),
    width: '90%',
    backgroundColor: colors.colorWhite,
    shadowColor: 'rgba(0, 0, 0, 0.16)',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    borderRadius: moderateScale(20),
    shadowRadius: moderateScale(30),
    shadowOpacity: 1,
    alignSelf: 'center',
    padding: getWidth(10),
    ...styles.mt20,
  },
  twitterFeedContainer: {
    paddingRight: getWidth(15),
  },
  latestNewsContainer: {
    ...styles.mh10,
    paddingRight: getWidth(20),
  },
  otherChannelWrapper: {
    backgroundColor: colors.colorWhite,
    shadowColor: 'rgba(0, 0, 0, 0.16)',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    borderRadius: moderateScale(20),
    shadowRadius: moderateScale(30),
    shadowOpacity: 1,
    alignSelf: 'center',
    ...styles.mt20,
    width: '90%',
    padding: getWidth(10),
    marginBottom: getHeight(160),
  },
  readAllBtn: {
    backgroundColor: colors.btnBackground,
    borderRadius: 10,
    ...styles.ph15,
    ...styles.pv10,
    ...styles.mr10
  },
  BtnText: { color: colors.colorWhite, fontWeight: '400', letterSpacing: 1 },

  // Social Section
  imageWrapper: {
    width: getWidth(50),
    shadowColor: 'rgba(0, 0, 0, 0.16)',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowRadius: moderateScale(10),
    shadowOpacity: 1,
    borderRadius: moderateScale(100),
    paddingVertical: getHeight(10),
    elevation: 15,
  },
  image1: {
    height: getWidth(50),
    width: getWidth(50),
    borderRadius: moderateScale(100),
    marginBottom: 15
  },

  // Render Latest News
  latestNewsItemWrapper: {
    width: '46%',
    borderRadius: moderateScale(10),
    backgroundColor: colors.newsBackground,
    ...styles.mv5,
  },
  newsImage: {
    width: '100%', height: 104
  },
  content: {
    ...styles.mv15,
    ...styles.mh10,
  },
  dateText: {
    flexDirection: 'row',
    ...styles.mb10
  },
  divider: {
    color: colors.blueShade,
    fontSize: 8
  },
  latestNewsTitle: {
    textTransform: 'capitalize',
    color: colors.greenShade5,
    fontSize: 8,
    fontFamily: 'Poppins-Bold',
    ...styles.mb10,
  },
  latestNewsDescription: {
    lineHeight: getHeight(17),
    color: colors.colorWhite,
    fontSize: 12,
    letterSpacing: 0.5,
    fontFamily: 'Poppins-Regular'
  },
  latestNewsDate: {
    color: colors.blueShade,
    fontSize: 7,
    fontFamily: 'Poppins-Regular',
    ...styles.mr10
  },
  latestNewsText: {
    color: colors.greenShade5,
    fontSize: 7,
    fontFamily: 'Poppins-Regular',
    ...styles.ml10
  },
  // Twitter News
  wrapper: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: colors.colorWhite,
  },
  imageWrapper: {
    flex: 2.0,
    alignItems: 'center',
    backgroundColor: colors.colorWhite,
    ...styles.pt10
  },
  imageInnerWrapper: {
    height: getWidth(50),
    width: getWidth(50),
    shadowColor: 'rgba(0, 0, 0, 0.16)',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowRadius: moderateScale(10),
    shadowOpacity: 1,
    backgroundColor: colors.colorWhite,
    borderRadius: moderateScale(100),
  },
  image: {
    height: getWidth(50),
    width: getWidth(50),
    borderRadius: moderateScale(100),
    elevation: 15,
  },
  detailWrapper: {
    borderBottomWidth: getWidth(0.3),
    borderBottomColor: colors.gray,
    flex: 8,
    ...styles.ph10,
    ...styles.pb10
  },
  titleDateWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    textTransform: 'capitalize',
  },
  description: {
    letterSpacing: getWidth(1),
  },
});

export default NewsTab;
