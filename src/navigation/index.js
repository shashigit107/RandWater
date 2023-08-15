import { StyleSheet, TouchableOpacity, Platform, View, Animated ,Text} from 'react-native';
import React, { useRef, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StackNavStrings, TabBarString } from './NavigationKeys';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StackRoutes, TabBarRoutes } from './Routes';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { colors, styles } from '../themes';
import { getWidth, moderateScale } from '../common/constants';
import {
  Add,
  ConnectDark,
  ConnectLight,
  ContactDark,
  ContactLight,
  HomeDark,
  HomeLight,
  NewsDark,
  NewsLight,
} from '../assets/svgs';
import WText from '../components/common/WText';
import { useDispatch,useSelector } from 'react-redux';
import { clear_problem_data, water_Problem_action, setReportfocus } from '../redux/actions/home';
import { checkPlatform } from '../utils/helpers';
import ReportPopup from '../components/common/ReportPopup';
// import { transform } from '@babel/core';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
let reportFocus = false
let isButtonClick = false
const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name={TabBarString.Home}
        component={TabBarRoutes.HomeTab} />
      <Stack.Screen
        name={StackNavStrings.HouseAt}
        component={StackRoutes.HouseAt}
      />
      <Stack.Screen
        name={StackNavStrings.didyouKnow}//shashi ranjan
        component={StackRoutes.didyouKnow}
      />
      <Stack.Screen
        name={StackNavStrings.CommunityAt}
        component={StackRoutes.CommunityAt}
      />
      <Stack.Screen
        name={StackNavStrings.WaterLeaks}
        component={StackRoutes.WaterLeaks}
      />
    
      <Stack.Screen
        name={StackNavStrings.ReportScreen}
        component={StackRoutes.ReportScreen}
      />
      <Stack.Screen
        name={StackNavStrings.Encroachments}
        component={StackRoutes.Encroachments}
      />
      <Stack.Screen
        name={StackNavStrings.Report}
        component={StackRoutes.Report}
        
      />
      <Stack.Screen
        name={StackNavStrings.AddReportDetail}
        component={StackRoutes.AddReportDetail}
      />
      <Stack.Screen
        name={StackNavStrings.SubmitReport}
        component={StackRoutes.SubmitReport}
      />
      <Stack.Screen
        name={StackNavStrings.ThankYou}
        component={StackRoutes.ThankYou}
      />
      {/* <Stack.Screen
        name={StackNavStrings.Settings}
        component={StackRoutes.Settings}
      /> */}
      <Stack.Screen
        name={StackNavStrings.Reports}
        component={StackRoutes.Reports}
        options={{
          headerShown: false,
          // presentation: 'modal',
          // animationTypeForReplace: 'push',
          animation:'slide_from_right'
        }}
      />
      <Stack.Screen
        name={StackNavStrings.EditProfile}
        component={StackRoutes.EditProfile}
      />
      <Stack.Screen
        name={StackNavStrings.PrivacySettings}
        component={StackRoutes.PrivacySettings}
      />
      {/* <Stack.Screen
        name={StackNavStrings.NotificationScreen}
        component={StackRoutes.NotificationScreen}
      /> */}
      <Stack.Screen
        name={StackNavStrings.ContactUs}
        component={StackRoutes.ContactUs}
      />
      <Stack.Screen
        name={StackNavStrings.EmailUs}
        component={StackRoutes.EmailUs}
      />
      <Stack.Screen
        name={StackNavStrings.ChangePassword}
        component={StackRoutes.ChangePassword}
      />
    </Stack.Navigator>
  );
};

const ConnectStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name={TabBarString.Connect}
        component={TabBarRoutes.ConnectTab}
      />
      <Stack.Screen
        name={StackNavStrings.Webview}
        component={StackRoutes.Webview}
      />
    </Stack.Navigator>
  );
};

const ContactStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name={StackNavStrings.ContactUs}
        component={StackRoutes.ContactUs}
      />
      <Stack.Screen
        name={StackNavStrings.EmailUs}
        component={StackRoutes.EmailUs}
      />
    </Stack.Navigator>
  );
};



const NewsStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name={StackNavStrings.News}
        component={StackRoutes.NewsTab}
      />
      <Stack.Screen
        name={StackNavStrings.ReadAllNews}
        component={StackRoutes.ReadAllNews}
      />
      <Stack.Screen
        name={StackNavStrings.NewsWebView}
        component={StackRoutes.NewsWebView}
      />
      <Stack.Screen
        name={StackNavStrings.NewsDetail}
        component={StackRoutes.NewsDetail}
      />
    </Stack.Navigator>
  );
};

const ReportStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name={StackNavStrings.ReportScreen}
        component={StackRoutes.ReportScreen}
      />
    </Stack.Navigator>
  );
};


//Tab Navigator
const TabNavigator = ({ navigation }) => {
  //----------------------------------------------
  const animation = useRef(new Animated.Value(0)).current;
  // const {reportFocus} = useSelector(state => state.home);
  // const [isButtonClick,setButtonClick]=useState(false)
  const toggleButton = (flag) => {
    // console.log("----------hey-----",reportFocus,flag)
    let tovalue = flag ? 1: 0;
    Animated.spring(animation, {
      toValue: tovalue,
      friction: 5,
      useNativeDriver: true
    }).start();
  }
  const rotation = {
    transform: [
      {
        rotate: animation.interpolate({
          inputRange: [0, 1],
          outputRange: ["0deg", "45deg"],
        }),
      },

    ],
  }
  //_---------------------------------------------


  const dispatch = useDispatch();
  const onPressReport = () => {
    // foucusvar=false
    dispatch(water_Problem_action('At my House'));
    dispatch(clear_problem_data());
    // navigation.navigate(StackNavStrings.ReportScreen);
  };

  const marginBottom = () => {
    if (checkPlatform() === 'ios') {
      if (Platform.isPad) {
        return -20
      } else {
        return 0
      }
    }

    else {
      return moderateScale(25);
    }
  };
const clickme=()=>{
  reportFocus=true
}

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: localStyles.tabBarStyle,
        tabBarHideOnKeyboard: true,
      }}
      initialRouteName={'HomeStack'}>
        
      <Tab.Screen
        name={'HomeStack'}
        component={HomeStack}
        options={{
          tabBarIcon: ({ focused }) => {
            if (focused) {
              return <HomeLight />;
            } else {
              foucusvar = true
              return <HomeDark />;
            }
          },
          tabBarLabel: ({ focused }) => (
            <WText
              style={{
                color: focused ? colors.colorWhite : colors.lightWhite,
                marginBottom: marginBottom(),
              }}>
              {TabBarString.Home}
            </WText>
          ),
        }}
      />
      <Tab.Screen
        name={'NewsStack'}
        component={NewsStack}
        options={{
          tabBarIcon: ({ focused }) => {
            if (focused) {
              return <NewsLight />;
            } else {
              return <NewsDark />;
            }
          },
          tabBarLabel: ({ focused }) => (
            <WText
              style={{
                color: focused ? colors.colorWhite : colors.lightWhite,
                marginBottom: marginBottom(),
              }}>
              {TabBarString.News}
            </WText>
          ),
        }}
      />
      <Tab.Screen
        name={TabBarString.Report}
        component={ReportStack}
        options={{
          // tabBarIcon: ({ focused }) => {
           
          //   return (
          //     <Animated.View
          //       activeOpacity={1}
          //       style={[localStyles.iconContainer] }
          //       >
          //       <Add />
          //     </Animated.View>
          //   )

          // },
          tabBarButton:({})=>{
            // console.log("tabarButton----000000-------")
            return(
              <View >
                {/* <Text>kuch</Text> */}
                <View style={{position:'absolute'}}>
                <ReportPopup/>
                </View>
               <TouchableOpacity activeOpacity={1} style={{marginTop:-15}} onPress={()=>dispatch(setReportfocus(true))} >
                <Add />
              </TouchableOpacity>
              </View>
            )
          },
          tabBarLabel: ({ focused }) => {
            if(focused){
              dispatch(setReportfocus(true));
              toggleButton(true)
            }else{
              toggleButton(false)
              dispatch(setReportfocus(false));
            }
            return (
              <WText
                style={{
                  color: colors.colorWhite,
                  marginBottom: marginBottom(),
                }}>
                {TabBarString.Report}
              </WText>
            )
          }


        }}
      />
      <Tab.Screen
        name={'ConnectStack'}
        component={ConnectStack}
        options={{
          tabBarIcon: ({ focused }) => {
            if (focused) {
              return <ConnectLight />;
            } else {
              return <ConnectDark />;
            }
          },
          tabBarLabel: ({ focused }) => (
            <WText
              style={{
                color: focused ? colors.colorWhite : colors.lightWhite,
                marginBottom: marginBottom(),
              }}>
              {TabBarString.Connect}
            </WText>
          ),
        }}
      />
      <Tab.Screen
        name={'ContactStack'}
        component={ContactStack}
        options={{
          tabBarIcon: ({ focused }) => {
            if (focused) {
              return <ContactLight />;
            } else {
              return <ContactDark />;
            }
          },
          tabBarLabel: ({ focused }) => (
            <WText
              style={{
                color: focused ? colors.colorWhite : colors.lightWhite,
                marginBottom: marginBottom(),
              }}>
              {TabBarString.Contact}
            </WText>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

// Auth Navigator
const AuthNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name={StackNavStrings.ChooseRegisterSign}
        component={StackRoutes.ChooseRegisterSign}
        options={{
          animation: 'none',
        }}
      />
      <Stack.Screen
        name={StackNavStrings.Login}
        component={StackRoutes.Login}
        options={{
          animation: 'none',
        }}
      />

      <Stack.Screen
        name={StackNavStrings.Registration}
        component={StackRoutes.Registration}
        options={{
          animation: 'none',
        }}
      />
      <Stack.Screen
        name={StackNavStrings.TermsAndConditions}
        component={StackRoutes.TermsAndConditions}
        options={{
          animation: 'none',
        }}
      />
      <Stack.Screen
        name={StackNavStrings.ForgotPassword}
        component={StackRoutes.ForgotPassword}
        options={{
          animation: 'none',
        }}
      />
    </Stack.Navigator>
  );
};

// Stack Navigator
const StackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={StackNavStrings.Splash}>
      <Stack.Screen
        name={StackNavStrings.Tutorial}
        component={StackRoutes.Tutorial}
      />
      <Stack.Screen
        name={StackNavStrings.Splash}
        component={StackRoutes.Splash}
      />
      <Stack.Screen
        name={StackNavStrings.NotificationScreen}
        component={StackRoutes.NotificationScreen}
      />
      <Stack.Screen
        name={StackNavStrings.AuthNavigator}
        component={AuthNavigator}
      />
      <Stack.Screen
        name={StackNavStrings.TabNavigator}
        component={TabNavigator}
      />
      <Stack.Screen
        name={StackNavStrings.Settings}
        component={StackRoutes.Settings}
      />
      {/* <Stack.Screen
        name={StackNavStrings.NotificationScreen}
        component={StackRoutes.NotificationScreen}
      /> */}
      <Stack.Screen
        name={StackNavStrings.EmailUs}
        component={StackRoutes.EmailUs}
      />
      <Stack.Screen
        name={StackNavStrings.ContactUs}
        component={StackRoutes.ContactUs}
      />
      <Stack.Screen
        name={StackNavStrings.TermsAndConditions}
        component={StackRoutes.TermsAndConditions}
      />
    </Stack.Navigator>
  );
};

// Main App Navigator
function AppNavigator({ connectivity }) {
     
  return (
    <>
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </>
  );
}

const localStyles = StyleSheet.create({
  tabBarStyle: {
    backgroundColor: colors.placeHolder,
    height: moderateScale(110),
    elevation: 5,
    shadowColor: colors.colorBlack,
    shadowOpacity: 0.3,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 0 },
    borderTopEndRadius: moderateScale(20),
    borderTopStartRadius: moderateScale(20),
    position: 'absolute',
    bottom: 0,
    width: '100%',
    zIndex: 1,
  },
  iconContainer: {
    position: 'absolute',
    top: -moderateScale(20),
    width: moderateScale(80),
    height: moderateScale(80),
    ...styles.center,
    borderRadius: moderateScale(40),
  },
});

export default AppNavigator;
