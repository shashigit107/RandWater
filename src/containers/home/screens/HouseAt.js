import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {colors, styles} from '../../../themes';
import WHeader from '../../../components/common/WHeader';
import {House, LogoBlue} from '../../../assets/svgs';
import FastImage from 'react-native-fast-image';
import images from '../../../assets/images';
import WText from '../../../components/common/WText';
import WaterOption from '../components/WaterOption';
import {moderateScale} from '../../../common/constants';
import RadioOption from '../components/RadioOption';
import {useDispatch, useSelector} from 'react-redux';
import WKeyBoardAvoidWrapper from '../../../components/common/WKeyBoardAvoidWrapper';
import {StackNavStrings} from '../../../navigation/NavigationKeys';
import {water_Problem_type} from '../../../redux/actions/home';

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

const HouseAt = ({navigation}) => {
  const dispatch = useDispatch();
  const [waterProblems, setWaterProblems] = React.useState(
    JSON.parse(JSON.stringify(Options)),
  );

  const onPressAtHouse = () => {
    navigation.goBack();
  };

  const onPressSelectOption = item => {
    console.log("sending from radio",item)
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

  return (
    <SafeAreaView style={styles.mainContainer}>
      <WHeader title={'Welcome'} />
      <FastImage source={images.tutorial1} style={localStyles.innerContainer}>
        <WKeyBoardAvoidWrapper>
          <View>
            <LogoBlue style={localStyles.logo} />
            <WText
              type={'BB24'}
              color={colors.homeHeadingTitle}
              style={localStyles.homeHeadingTitle}>
              {'Where is the water incident?'}
            </WText>
          </View>
          <WaterOption
            title={'At my House'}
            svgIcon={() => <House />}
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
    ...styles.ph20,
  },
  logo: {
    ...styles.mt20,
    ...styles.selfCenter,
  },
  homeHeadingTitle: {
    ...styles.mt20,
  },
  radioContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.80)',
    width: moderateScale(285),
    ...styles.mt10,
    ...styles.p5,
    borderRadius: moderateScale(24),
  },
});

export default HouseAt;
