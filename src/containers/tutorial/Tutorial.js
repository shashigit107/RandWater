// Library Import
import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import FastImage from 'react-native-fast-image';
import Swiper from 'react-native-swiper';
import images from '../../assets/images';
import {LogoBlue} from '../../assets/svgs';
import {APP_OPEN, moderateScale} from '../../common/constants';
import WButtonText from '../../components/common/WButtonText';
import WText from '../../components/common/WText';

// Local Import
import {StackNavStrings} from '../../navigation/NavigationKeys';
import {colors, styles} from '../../themes';
import Typography from '../../themes/typography';
import CommonTutorial from './CommonTutorial';

const {width} = Dimensions.get('window');
const Tutorial = props => {
  const swiper = React.useRef(null);
  const [slideIndex, setSlideIndex] = React.useState(0);

  const setAppIsOpen = async () => {
    AsyncStorage.setItem(APP_OPEN, 'true');
  };

  // Navigation
  const navigateTo = () => {
    //Navigate to Authentication
    if (slideIndex !== 3) {
      swiper.current.scrollBy(1);
    } else {
      setAppIsOpen();
      props.navigation.reset({
        index: 0,
        routes: [{name: StackNavStrings.AuthNavigator}],
      });
    }
  };
  //Slider Handler
  const handleSlides = index => {
    setTimeout(() => {
      setSlideIndex(index);
    }, 200);
  };

  const tutorialText = {
    tutorial1: {
      title: 'LET’S GET STARTED!',
      subtitle:
        'Report burst pipes, water leaks and other related water issues in your community.',
    },
    tutorial2: {
      title: 'ALL YOU NEED TO KNOW.',
      subtitle:
        'Get the latest news and alerts on water related issues.',
    },
    tutorial3: {
      title: 'DIRECT ACCESS',
      subtitle:
        'Get access to our customer portal, job vacancies and available tenders directly through the App.',
    },
    tutorial4: {
      title: 'DO YOUR PART',
      subtitle:
        "Help save the planet by preserving Earth’s most valuable resource, Water!",
    },
  };
  return (
    <View style={styles.mainContainer}>
      <Swiper
        style={localStyles.wrapper}
        showsButtons={false}
        loop={false}
        ref={swiper}
        onIndexChanged={index => handleSlides(index)}
        activeDotStyle={localStyles.activeDot}
        dotStyle={localStyles.inactiveDot}
        paginationStyle={[
          localStyles.pageStyle,
          // eslint-disable-next-line react-native/no-inline-styles
        ]}>
        <CommonTutorial
          backImage={images.tutorial1}
          text={tutorialText.tutorial1}
          // subText={}
        />
        <CommonTutorial
          backImage={images.tutorial2}
          text={tutorialText.tutorial2}
          secondSlide
        />
        <CommonTutorial
          backImage={images.tutorial3}
          text={tutorialText.tutorial3}
          logoWhite
        />
        <CommonTutorial
          backImage={images.tutorial4}
          text={tutorialText.tutorial4}
          logoWhite
        />
      </Swiper>
      <WButtonText
        title={slideIndex == 3 ? 'Done' : 'Next'}
        onPress={() => navigateTo()}
        containerStyle={localStyles.buttonContainer}
        style={localStyles.btnTxt}
        bold
      />
    </View>
  );
};

const localStyles = StyleSheet.create({
  buttonContainer: {
    position: 'absolute',
    right: moderateScale(28),
    bottom: moderateScale(35),
    width: moderateScale(70),
    height: moderateScale(41),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: moderateScale(50),
    shadowColor: 'rgba(0, 0, 0, 0.16)',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: moderateScale(30),
    shadowOpacity: 1,
  },
  wrapper: {},
  btnTxt: {
    fontSize: moderateScale(18),
  },
  pageStyle: {
    bottom: moderateScale(40),
    position: 'absolute',
  },
  activeDot: {
    width: moderateScale(20),
    height: moderateScale(20),
    borderRadius: moderateScale(10),
    backgroundColor: colors.primary,
  },
  inactiveDot: {
    width: moderateScale(20),
    height: moderateScale(20),
    borderRadius: moderateScale(10),
    backgroundColor: colors.colorWhite,
  },
  tutorialText: {
    fontSize: moderateScale(22),
    ...Typography.fontWeights.Italic,
  },
  imageBackground: {
    width: width,
    borderRadius: moderateScale(10),
    justifyContent: 'flex-end',
    flex: 1,
  },
});

export default Tutorial;
