import { AppState, Text, SafeAreaView, StyleSheet, ScrollView, Dimensions, TouchableOpacity, View, Animated } from 'react-native';
import React, { Component, useEffect, useRef, useState } from 'react';
import WHeader from '../../components/common/WHeader';
import { colors, styles } from '../../themes';
import images from '../../assets/images';
import FastImage from 'react-native-fast-image';
import {
  CommunityIcon,
  EncroachmentsDark,
  LogoWithText,
  Waterdrops,
  House
} from '../../assets/svgs';
import WText from '../../components/common/WText';
import { moderateScale } from '../../common/constants';
// import WaterOption from './components/WaterOption';
import WaterOption from '../home/components/WaterOption';
import { StackNavStrings } from '../../navigation/NavigationKeys';
import { useDispatch, useSelector } from 'react-redux';
import {
  clear_problem_data,
  water_Problem_action,
} from '../../redux/actions/home';
import notifee, { EventType } from '@notifee/react-native';
import { getReports } from '../../redux/actions/settingsAction';
import RadioOption from '../home/components/RadioOption';
import { water_Problem_type } from '../../redux/actions/home';


const { height, width } = Dimensions.get('window')

const Options = [
  {
    id: 1,
    title: 'My tap is leaking',
    isSelect: false,
  },
  {
    id: 2,
    title: 'There is burst pipe',
    isSelect: false,
  },
  {
    id: 3,
    title: 'There is Water leaking in my yard',
    isSelect: false,
  },
  {
    id: 4,
    title: 'My toilet is leaking',
    isSelect: false,
  },
  {
    id: 5,
    title: 'Other',
    isSelect: false,
  },
];

const Com_Options = [
  {
    id: 1,
    title: 'There is a burst pipe in the street',
    isSelect: false,
  },
  {
    id: 2,
    title: 'There is sewage water in the street',
    isSelect: false,
  },
  {
    id: 3,
    title: 'Someone is vandalising water pipes',
    isSelect: false,
  },
  {
    id: 4,
    title: `My neighbour's water is leaking`,
    isSelect: false,
  },
  {
    id: 5,
    title: 'Other',
    isSelect: false,
  },
];

const ReportScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const appState = useRef(AppState.currentState);
  const [value, setValue] = useState(false);
  const [animationVal, setAnimatedVal] = useState(0)
  const [value2, setValue2] = useState(false);
  const [isbutton, setButton] = useState(false)
  const [waterProblems, setWaterProblems] = React.useState(
    JSON.parse(JSON.stringify(Options)),
  );

  const [waterProblems1, setWaterProblems1] = React.useState(
    JSON.parse(JSON.stringify(Com_Options)),
  );
  const { reportFocus } = useSelector(state => state.home);
  
  const OnPressHouse = (screen, type, data) => {
    dispatch(water_Problem_action(type));
    dispatch(clear_problem_data());
    navigation.navigate(screen, data);
  };

  const onPressSelectOption = item => {
    let filterdWaterProblem = waterProblems.map(problem => {
      if (problem.id === item.id) {
        problem.isSelect = true;
      } else {
        problem.isSelect = false;
      }
      return problem;
    });
    setWaterProblems(filterdWaterProblem);
    dispatch(water_Problem_type(item.title));
    navigation.navigate(StackNavStrings.Report, {
      from: 'At my House',
    });
  };

  // useFocusEffect(React.useCallback(() => { setValue(false) }, []))

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setValue(false)
      // setAnimatedVal(0)
      // setButton(false)
      // clickme()
      // console.log("----------------<<<<<<<<<<<<<<<<",animationVal)

    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);


  const onPressSelectOption1 = item => {
    let filterdWaterProblem = waterProblems1.map(problem => {
      if (problem.id === item.id) {
        problem.isSelect = true;
      } else {
        problem.isSelect = false;
      }
      return problem;
    });
    setWaterProblems1(filterdWaterProblem);
    dispatch(water_Problem_type(item.title));
    navigation.navigate(StackNavStrings.Report, {
      from: 'In the Community',
    });
  };

  const collapse = () => {
    setValue(true)
    setValue2(false);
  }

  const collapse2 = () => {
    setValue2(true)
    setValue(false);
  }

  useEffect(() => {
    setValue(false)
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
  const component = () => {

  }

  const animation = useRef(new Animated.Value(0)).current;

  let toValue = reportFocus ? 1 : 0;
  Animated.spring(animation, {
    toValue: toValue,
    friction: 5,
    useNativeDriver: true
  }).start();



  const button1Style = {
    transform: [
      { scale: animation },
      {
        translateX: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -100]
        })
      },
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -80]
        })
      }
    ]
  }
  const button2Style = {
    transform: [
      { scale: animation },
      {
        translateX: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 100]
        }

        )
      },
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -80]
        })
      }
    ]
  }

  //marginTop:"40%"
  return (
    <SafeAreaView style={styles.mainContainer}>
      <ScrollView>
        <WHeader title={'Welcome'} />
        <FastImage source={images.tutorial1} style={localStyles.innerContainer}>
          <LogoWithText style={localStyles.logo} height="121" width="179" />
          <WText
            color={colors.homeHeadingTitle}
            style={localStyles.homeHeadingTitle}>
            {'What do you want to report on?'}
          </WText>
          <WaterOption
            title={'Water Leaks'}
            svgIcon={() => <Waterdrops />}
            onPress={() => OnPressHouse(StackNavStrings.WaterLeaks, 'WaterLeaks', { Id: "report" })}
          />

          <WaterOption
            title={`Encroachment on`}
            title2={"the servitude"}
            svgIcon={() => <EncroachmentsDark />}
            onPress={() =>
              OnPressHouse(StackNavStrings.Encroachments, 'Encroachments', { Id: "report" })
            }
          />
          {/* <TouchableOpacity onPress={()=>clickme()}><Text>click me</Text></TouchableOpacity> */}
          {/* <View style={{ flex: 1, marginTop: "60%", marginRight: 10 }}>

            <TouchableOpacity style={{ justifyContent: "center", alignItems: 'center', position: "relative" }}>
              <Animated.View style={[{ justifyContent: "center", alignItems: 'center' }, button1Style]}>

                <View style={{
                  justifyContent: "center", alignItems: 'center', backgroundColor: 'white',
                  height: 60, width: 60, borderRadius: 30, padding: 10
                }}>
                  <Text style={{}}>Icon</Text>
                </View>

                <Text >View Report</Text>
              </Animated.View>

            </TouchableOpacity>

            <TouchableOpacity style={{ justifyContent: "center", alignItems: 'center', position: "absolute" }}>
              <Animated.View style={[{ justifyContent: "center", alignItems: 'center' }, button2Style]}>

                <View style={{
                  justifyContent: "center", alignItems: 'center', backgroundColor: 'white',
                  height: 60, width: 60, borderRadius: 30, padding: 10
                }}>
                  <Text style={{}}>Icon</Text>
                </View>

                <Text >Add New Incident</Text>
              </Animated.View>

            </TouchableOpacity>
          </View> */}
        </FastImage>
      </ScrollView>
    </SafeAreaView>
  );
};

const localStyles = StyleSheet.create({
  innerContainer: {
    ...styles.flex,
    alignItems: 'center',
    height: height,
    width: width
  },
  logo: {
    ...styles.mt10,
  },
  homeHeadingTitle: {
    ...styles.mt15,
    marginLeft: 40,
    fontSize: 18,
    alignSelf: 'flex-start',
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
});

export default ReportScreen;