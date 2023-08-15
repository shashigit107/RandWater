import { AppState, SafeAreaView, StyleSheet, ScrollView, Dimensions } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import WHeader from '../../components/common/WHeader';
import { colors, styles } from '../../themes';
import images from '../../assets/images';
import FastImage from 'react-native-fast-image';
import {
  CommunityIcon,
  // EncroachmentsDark,
  LogoWithText,
  
  House
} from '../../assets/svgs';
import WText from '../../components/common/WText';
import { moderateScale } from '../../common/constants';
import WaterOption from './components/WaterOption';
import { StackNavStrings } from '../../navigation/NavigationKeys';
import { useDispatch } from 'react-redux';
import {
  clear_problem_data,
  water_Problem_action,
} from '../../redux/actions/home';
import notifee, { EventType } from '@notifee/react-native';
import { getReports } from '../../redux/actions/settingsAction';
import RadioOption from './components/RadioOption';
import { water_Problem_type } from '../../redux/actions/home';
import finalPropsSelectorFactory from 'react-redux/es/connect/selectorFactory';
import HomeTab from './HomeTab';


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

const WaterLeaks = ({route, navigation }) => {
  const dispatch = useDispatch();
  const appState = useRef(AppState.currentState);
  const [value, setValue] = useState(false);
  const [value2, setValue2] = useState(false);
  const [waterProblems, setWaterProblems] = React.useState(
    JSON.parse(JSON.stringify(Options)),
  );

  const [waterProblems1, setWaterProblems1] = React.useState(
    JSON.parse(JSON.stringify(Com_Options)),
  );

  const OnPressHouse = (screen, type) => {
    dispatch(water_Problem_action(type));
    dispatch(clear_problem_data());
    navigation.navigate(screen);
  };

  const onPressSelectOption = item => {
    console.log("in my house",item)
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
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);


  const onPressSelectOption1 = item => {
    // console.log()
    console.log("In the community",item)
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
const navigate=()=>{
  // console.log("route.params.Id",route.params.Id)
  // if(route.params.Id=="report"){
  //   navigation.navigate("ReportScreen")
  // }else{
    navigation.navigate("Home")
  // }
}

  return (
    <SafeAreaView style={styles.mainContainer}>
      <ScrollView>
        <WHeader title={'Welcome'} />
        <FastImage source={images.tutorial1} style={localStyles.innerContainer}>
          <LogoWithText style={localStyles.logo} height="121" width="179" />
          {value || value2 ? <WText
            color={colors.homeHeadingTitle}
            style={localStyles.homeHeadingTitle}>
            {'What is the nature of the water incident?'}
          </WText> :  <WText
            color={colors.homeHeadingTitle}
            style={localStyles.homeHeadingTitle}>
            {'Where is the water incident?'}
          </WText>}

          <WaterOption
            down={value2}
            title={'In the Community'}
            svgIcon={() => <CommunityIcon />}
            onPress={() => {
              if (value2 === false) { collapse2() }
              else { navigate() }//Home
            }}
          // onPress={() =>
          // OnPressHouse(StackNavStrings.Encroachments, 'Encroachments'
          //   OnPressHouse(StackNavStrings.CommunityAt, 'In the Community')
          // }
          />
          {value2 ?
            (
              waterProblems1.map(item => {
                return (
                  <RadioOption
                    key={item.id}
                    optionText={item.title}
                    isSelected={item.isSelect}
                    onPress={() => onPressSelectOption1(item)}
                  />
                );
              })
            ) : null}
            <WaterOption
            down={value}
            title={'At my House'}
            svgIcon={() => <House/>}
            onPress={() => {
              if (value === false) { collapse() }
              else { navigate() }
            }}
          />
          {value ?
            (
              waterProblems.map(item => {
                return (
                  <RadioOption
                    key={item.id}
                    optionText={item.title}
                    isSelected={item.isSelect}
                    onPress={() => onPressSelectOption(item)}
                  />
                );
              })
            ) : null}
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

export default WaterLeaks;