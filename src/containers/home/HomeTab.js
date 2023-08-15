//------------react-native Import-----------
import {
  AppState,
  SafeAreaView,
  StyleSheet,
  View,
  useWindowDimensions,
  Text,
  TouchableOpacity,
  Platform
} from 'react-native';
import React, {
  useEffect,
  useRef
} from 'react';
//-------------library Import-----------
import FastImage from 'react-native-fast-image';
import notifee, { EventType } from '@notifee/react-native';
import Swiper from 'react-native-swiper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import InAppReview from "react-native-in-app-review";
import moment from 'moment';
import analytics from '@react-native-firebase/analytics';
import {
  useDispatch,
  useSelector
} from 'react-redux';
//-------------reusable component import------------
import WHeader from '../../components/common/WHeader';
import { colors, styles } from '../../themes';
import images from '../../assets/images';
import WLoader from '../../components/common/WLoader';
import {
  EncroachmentsDark,
  LogoWithText,
  Waterdrops,
  QuestionThink
} from '../../assets/svgs';
import WText from '../../components/common/WText';
import { moderateScale } from '../../common/constants';
import WaterOption from './components/WaterOption';
import { StackNavStrings } from '../../navigation/NavigationKeys';
import { USER } from '../../common/constants';
import {
  clear_problem_data,
  water_Problem_action,
} from '../../redux/actions/home';
import { getReports, getQuickFactsData } from '../../redux/actions/settingsAction';
import ReportPopup from '../../components/common/ReportPopup';


//---------HomeComponent----------------------
const HomeTab = ({ navigation }) => {
  const { width, height } = useWindowDimensions();
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.settings.isLoading);
  const getFactData = useSelector(state => state.settings.QuickFactData)
  const { notification } = useSelector(state => state.settings)
  // const [readMore,setReadMore]=useState(false)
  const appState = useRef(AppState.currentState);
  const OnPressHouse = (screen, type, data) => {
    dispatch(water_Problem_action(type));
    dispatch(clear_problem_data());
    navigation.navigate(screen, data);
  };

  useEffect(() => {
    return notifee.onForegroundEvent(({ type, detail }) => {
      switch (type) {
        case EventType.DISMISSED:
          console.log('User dismissed notification', detail.notification);
          break;
        case EventType.PRESS:
          navigation.navigate(StackNavStrings.Reports);
          break;
      }
    });

  }, []);

  useEffect(() => {
    // setCurrentScreenName('Home')
    analytics().logScreenView({ Home: 'Home Screen', Home_class: 'HomeTab.js', });
    dispatch(getQuickFactsData())
    // dispatch(getNotification())
  }, [])

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        dispatch(getReports());

      }

      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };

  }, []);

  useEffect(() => {
    getPopUp()
  }, []);

  const getPopUp = async () => {
    AsyncStorage.multiGet([USER, 'popUpValue'], (error, result) => {
      if (result !== null) {
        let loginUser = result[0][1];
        let popUpValue = result[1][1];
        let user = JSON.parse(loginUser);
        if (popUpValue) {
          console.log(popUpValue)
        } else {
          rateUs(user.created_at)
        }
      }
    });
  }
  // rate app after 2 days
  const rateUs = async (createdAt) => {
    let newDate = new Date();
    var res = newDate.setTime(newDate.getTime());
    let value = (moment(createdAt).unix() * 1000) + 2 * 24 * 60 * 60 * 1000;
    if (res > value) {
      InAppReview.isAvailable();
      InAppReview.RequestInAppReview()
        .then((hasFlowFinishedSuccessfully) => {
          if (hasFlowFinishedSuccessfully) {
            AsyncStorage.setItem('popUpValue', 'true')
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
  //----------------------homeComponentReturn--------------------
  return (
    <SafeAreaView style={styles.mainContainer}>

      <WHeader title={'Welcome'} NotificationIcon={true} awardedPoint={notification?.data?.awarded_points} />
      <FastImage source={images.tutorial1} style={localStyles.innerContainer}>

        <LogoWithText style={localStyles.logo} height='15%' width="179" />

        <View style={{ height: '30%', position: "relative", top: -10 }}>
          <WText
            color={colors.homeHeadingTitle}
            style={[localStyles.homeHeadingTitle, { marginLeft: -4 }]}>
            {'What do you want to report on?'}
          </WText>
          <WaterOption
            title={'Water Leaks'}
            svgIcon={() => <Waterdrops />}
            onPress={() => OnPressHouse(StackNavStrings.WaterLeaks, 'WaterLeaks', { Id: "Home" })}
          />
          <WaterOption
            title={`Encroachment on`}
            title2={'the servitude'}
            svgIcon={() => <EncroachmentsDark />}
            onPress={() =>
              OnPressHouse(StackNavStrings.Encroachments, 'Encroachments', { Id: "Home" })
            }
          />
        </View>
        {getFactData.data ?
          <View style={{ height: '30%', position: 'relative', }}>
            <View style={{ marginLeft: 10, marginBottom: 10 }}>
              <WText
                color={colors.homeHeadingTitle}
                style={localStyles.homeHeadingTitle}>
                {'Did you know?'}
              </WText>
            </View>
            <Swiper
              showsButtons={false}
              paginationStyle={{
                position: 'relative',
                top: moderateScale(5),
              }}
              dotStyle={<View style={{}} />}

            >
              {getFactData?.data?.map((element, index) => {
                let str = element.description.replace(/(<([^>]+)>)/gi, "");
                let str2 = str.replace(/&nbsp;/g, '')
                let readMore = false
                if (str2.length > 202) {
                  readMore = true
                }

                return (
                  <TouchableOpacity
                    disabled={!readMore}
                    onPress={() => navigation.navigate("didyouKnow", { data: index })}
                    activeOpacity={1}
                    style={{ backgroundColor: "#fff", marginHorizontal: moderateScale(20), borderRadius: 15, padding: 10 }}>
                    <View style={localStyles.card}>
                      <View style={{ flex: .2, alignSelf: "center" }}>
                        <QuestionThink />
                      </View>
                      <View style={[localStyles.cardText, { marginLeft: -5 }]}>
                        <WText
                          color={colors.colorText}
                          style={localStyles.cardTitle}>
                          {element.title}
                        </WText>
                        <View style={{ position: 'relative', top: Platform.OS == "android" ? -6 : 0 }}>
                          <Text style={{ fontSize: 14, }} numberOfLines={5}>{str2}</Text>
                          {readMore && <WText
                            color={colors.homeHeadingTitle}
                            style={{ alignSelf: 'flex-end', paddingRight: 5, paddingBottom: 5 }}
                          >
                            {"Read more"}
                          </WText>}

                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                  // </View>
                )
              })}
            </Swiper>
          </View> : null}
        {/* <View style={{ height: 60, width: 60, zIndex: 999, backgroundColor: 'rgba(0, 0, 0, 0.10)', marginTop: 40 }}></View> */}
        {/* <ReportPopup/> */}
        {/* <View ></View> */}
        {isLoading && <WLoader />}

      </FastImage>

    </SafeAreaView>
  );
};

const localStyles = StyleSheet.create({
  innerContainer: {
    flex: 1,
    alignItems: 'center',
  },
  logo: {
    ...styles.mt10,
  },
  homeHeadingTitle: {
    ...styles.mt10,
    marginLeft: 20,
    alignSelf: 'flex-start',
    fontSize: 18,
    fontFamily: 'Poppins-Bold'
  },
  incidentOption: {
    ...styles.rowSpaceBetween,
    backgroundColor: 'rgba(255, 255, 255, 0.80)',
    height: moderateScale(66),
    width: moderateScale(317),
    ...styles.p10,
    borderRadius: moderateScale(20),
    ...styles.mt20,
  },
  optionText: {
    ...styles.ml20,
  },
  cardTitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    // ...styles.mb5,
  },
  card: {
    height: "87%",
    flexDirection: 'row',
    justifyContent: 'center',
  },
  cardText: {
    flex: .8,
    flexDirection: 'column',
  },
  desc: {
    flexWrap: 'wrap',
    fontSize: 12,
    top: -7,
    fontFamily: 'Poppins-Light',

  }
});

export default HomeTab;
