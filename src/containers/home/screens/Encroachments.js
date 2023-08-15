import {View, SafeAreaView, StyleSheet} from 'react-native';
import React from 'react';
import {colors, styles} from '../../../themes';
import WHeader from '../../../components/common/WHeader';
import {EncroachmentsDark, LogoWithText} from '../../../assets/svgs';
import FastImage from 'react-native-fast-image';
import images from '../../../assets/images';
import WText from '../../../components/common/WText';
import WaterOption from '../components/WaterOption';
import RadioOption from '../components/RadioOption';
import WKeyBoardAvoidWrapper from '../../../components/common/WKeyBoardAvoidWrapper';
import {StackNavStrings} from '../../../navigation/NavigationKeys';
import {useDispatch, useSelector} from 'react-redux';
import {water_Problem_type} from '../../../redux/actions/home';
import {moderateScale} from '../../../common/constants';

const Options = [
  {
    id: 1,
    title: 'Digging next to/on top of pipeline',
    isSelect: false,
  },
  {
    id: 2,
    title: 'Building next to/on top of pipeline',
    isSelect: false,
  },
  {
    id: 3,
    title: 'Someone living inside the valve box',
    isSelect: false,
  },
  {
    id: 4,
    title: 'Other',
    isSelect: false,
  },
];

const Encroachments = ({route, navigation}) => {
  const dispatch = useDispatch();

  const [waterProblems, setWaterProblems] = React.useState(
    JSON.parse(JSON.stringify(Options)),
  );

  const onPressAtHouse = () => {
    if(route.params.Id=="report"){
        navigation.navigate(StackNavStrings.ReportScreen)
    }
    navigation.goBack();
  };

  const onPressSelectOption = item => {
    console.log("shashiranjan",item,waterProblems)
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
      from: 'Encroachments',
    });
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <WHeader title={'Welcome'} settingIcon={false} backIcon={true} onPress={()=>navigation.goBack()}/>
      <FastImage source={images.tutorial1} style={localStyles.innerContainer}>
        <WKeyBoardAvoidWrapper>
        <LogoWithText style={localStyles.logo} height="121" width="179" />
          <WText
            type={'BB24'}
            color={colors.homeHeadingTitle}
            style={localStyles.homeHeadingTitle}>
            {'What is the Encroachment?'}
          </WText>
          <WaterOption
            title='Encroachments on'
            title2="the servitude"//we did this beacuse flex and \n doesnot support in XR ios device
            svgIcon={() => <EncroachmentsDark />}
            down
            onPress={onPressAtHouse}
          />
          <View
            style={{
              marginBottom: moderateScale(150),
              alignSelf: 'flex-end',
            }}>
            {waterProblems.map(item => {
              return (
                <RadioOption
                  key={item.id}
                  optionText={item.title}
                  isSelected={item.isSelect}
                  onPress={() => onPressSelectOption(item)}
                />
              );
            })}
          </View>
        </WKeyBoardAvoidWrapper>
      </FastImage>
    </SafeAreaView>
  );
};

const localStyles = StyleSheet.create({
  innerContainer: {
    ...styles.flex,
    alignItems: 'center',
  },
  belowLogo: {
    fontWeight: '900'
  },
  logo: {
    ...styles.mt20,
    ...styles.selfCenter,
  },
  homeHeadingTitle: {
    marginTop: 10,
    
    fontWeight: '900',
    fontSize: 20,
    alignSelf: 'flex-start',
  },
});

export default Encroachments;
