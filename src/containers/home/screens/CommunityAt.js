//-------------- react native import -------
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image
} from 'react-native';
import React from 'react';

//--------------- library import ----------
import { useDispatch, useSelector } from 'react-redux';
import FastImage from 'react-native-fast-image';

//-------------- reusable component import --------
import { colors, styles } from '../../../themes';
import WHeader from '../../../components/common/WHeader';
import { CommunityIcon, House, LogoBlue } from '../../../assets/svgs';
import images from '../../../assets/images';
import WText from '../../../components/common/WText';
import WaterOption from '../components/WaterOption';
import RadioOption from '../components/RadioOption';
import WInput from '../../../components/common/WInput';
import WKeyBoardAvoidWrapper from '../../../components/common/WKeyBoardAvoidWrapper';
import { StackNavStrings } from '../../../navigation/NavigationKeys';
import { water_Problem_type } from '../../../redux/actions/home';
import { moderateScale } from '../../../common/constants';
//--------------- component constent ----------------
const Options = [
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

const CommunityAt = ({ navigation }) => {
  const dispatch = useDispatch();

  const [waterProblems, setWaterProblems] = React.useState(
    JSON.parse(JSON.stringify(Options)),
  );

  const onPressAtHouse = () => {
    navigation.goBack();
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
      from: 'In the Community',
    });
  };
//-------------component return ----------------------
  return (
    <SafeAreaView style={styles.mainContainer}>
      <WHeader title={'Welcome'} />
      <FastImage source={images.tutorial1} style={localStyles.innerContainer}>
        <WKeyBoardAvoidWrapper>
          <LogoBlue style={localStyles.logo} />
          <WText
            type={'BB24'}
            color={colors.homeHeadingTitle}
            style={localStyles.homeHeadingTitle}>
            {'Where is the water incident?'}
          </WText>
          <WaterOption
            title={'In the Community'}
            svgIcon={() => <CommunityIcon />}
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
  logo: {
    ...styles.mt20,
    ...styles.selfCenter,
  },
  homeHeadingTitle: {
    ...styles.mt20,
  },
});

export default CommunityAt;
