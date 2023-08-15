import {
  View,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import WHeader from '../../components/common/WHeader';
import { colors, styles } from '../../themes';
import images from '../../assets/images';
import FastImage from 'react-native-fast-image';
import {
  ContactCallIcon,
  OfficeLocation,
  FacebookIcon,
  TelegramIcon,
  TwitterIcon,
  WhatsUpIcon,
} from '../../assets/svgs';
import WText from '../../components/common/WText';
import { moderateScale } from '../../common/constants';
import WButtonText from '../../components/common/WButtonText';
import Typography from '../../themes/typography';
import { StackNavStrings } from '../../navigation/NavigationKeys';
import Share from 'react-native-share';
import analytics from '@react-native-firebase/analytics';

import { useDispatch, useSelector } from 'react-redux';
const ContactUs = ({ navigation }) => {
  const contactus = useSelector(state => state.settings);
  const dispatch = useDispatch();

  const AddressLocation = () => {
    return (
      <View
        style={[
          localStyles.addressContainer,
          {
            ...styles.rowSpaceBetween,
            alignItems: 'flex-start',
          },
        ]}>
        <View>
          <WText type={'RR18'} color={colors.primary}>
            {'Head Office Address'}{' '}
          </WText>
          <View style={styles.mt10}>
            <WText
              type={'MA16'}
              color={colors.colorBlack}
              style={localStyles.addressText}>
              {'522 Impala Road '}{' '}
            </WText>
            <WText
              type={'MA16'}
              color={colors.colorBlack}
              style={localStyles.addressText}>
              {'Glenvista'}{' '}
            </WText>
            <WText
              type={'MA16'}
              color={colors.colorBlack}
              style={localStyles.addressText}>
              {'2058'}{' '}
            </WText>
            <WText
              type={'MA16'}
              color={colors.colorBlack}
              style={localStyles.addressText}>
              {'south Africa'}{' '}
            </WText>
          </View>
        </View>
        <OfficeLocation />
      </View>
    );
  };

  const ContactItem = ({ title, subTitle }) => {
    return (
      <View style={styles.mt15}>
        <WText type={'MA18'} color={colors.colorBlack}>
          {title}
        </WText>
        <WText type={'RR16'} color={colors.colorBlack}>
          {subTitle}
        </WText>
      </View>
    );
  };

  const ContactDetails = () => {
    return (
      <View style={localStyles.addressContainer}>
        <View
          style={[
            styles.rowSpaceBetween,
            {
              alignItems: 'flex-start',
            },
          ]}>
          <View>
            <WText type={'RR18'} color={colors.primary}>
              {'Contact Information'}
            </WText>
            <ContactItem title={'Phone:'} subTitle={'+27 (11) 682 0911'} />
            <ContactItem
              title={'Customer Service Center:'}
              subTitle={'0860 10 10 60'}
            />
            <ContactItem
              title={'Email Us:'}
              subTitle={'customerservice@randwater.co.za'}
            />
          </View>
          <View style={styles.mr10}>
            <ContactCallIcon />
          </View>
        </View>
        <WButtonText
          title={'Get in touch'}
          containerStyle={localStyles.getInTouchButton}
          style={localStyles.getInTouchText}
          onPress={onPressGetInTouch}
        />
      </View>
    );
  };

  // const onPressTelegramIcon = async () => {
  //   await Share.shareSingle({
  //     title: 'Share Rand Water',
  //     message:
  //       'Download the Rand Water - Save Water App to report water incidents in your area today',
  //     url: 'https://www.randwater.co.za/',
  //     social: Share.Social.TELEGRAM,
  //   });
  // };

  // const onPressFacebookIcon = async () => {
  //   await Share.shareSingle({
  //     title: 'Share Rand Water',
  //     message:
  //       'Download the Rand Water - Save Water App to report water incidents in your area today',
  //     url: 'https://www.randwater.co.za/',
  //     social: Share.Social.FACEBOOK,
  //   });
  // };
  // const onPressTwitterIcon = async () => {
  //   await Share.shareSingle({
  //     title: 'Share Rand Water',
  //     message:
  //       'Download the Rand Water - Save Water App to report water incidents in your area today',
  //     url: 'https://www.randwater.co.za/',
  //     social: Share.Social.TWITTER,
  //   });
  // };
  // const onPressWhatsAppIcon = async () => {
  //   await Share.shareSingle({
  //     title: 'Share Rand Water',
  //     message:
  //       'Download the Rand Water - Save Water App to report water incidents in your area today',
  //     url: 'https://www.randwater.co.za/',
  //     social: Share.Social.WHATSAPP,
  //   });
  // };
  const ShareAppLink = async () => {
    const param = {
      message: "Download the Rand Water - Save Water App to report water incidents in your area today",
      url: 'https://rwapp.randwater.co.za/rand-water/app-store'
    }
    try {
      const response = await Share.open(param)
      // console.log("Share Res", response)
      // analytics().logScreenView({ Share_App: 'ContactUs Screen', ContactUs_class: 'ContactUs.js', });
    } catch (error) {
      console.log(error)
    }

  }

  const SocialShare = () => {
    return (
      <View
        style={[
          // localStyles.addressContainer,
          {
            marginBottom: moderateScale(150),
            marginHorizontal: 20,
            marginTop: 15
          },
        ]}>
        <WButtonText
          title={'Share the Rand Water App'}
          containerStyle={localStyles.getInTouchButton}
          style={localStyles.getInTouchText}
          onPress={ShareAppLink}
        />
        {/* <TouchableOpacity onPress={ShareAppLink}>
        <WText type={'RR18'} color={colors.primary}>
          {'Share the Rand Water App'}
        </WText>
        </TouchableOpacity> */}
        {/* <View style={[styles.rowSpaceBetween, styles.mt20]}>
          <TouchableOpacity onPress={onPressTelegramIcon}>
            <TelegramIcon />
          </TouchableOpacity>
          <TouchableOpacity onPress={onPressFacebookIcon}>
            <FacebookIcon />
          </TouchableOpacity>
          <TouchableOpacity onPress={onPressTwitterIcon}>
            <TwitterIcon />
          </TouchableOpacity>
          <TouchableOpacity onPress={onPressWhatsAppIcon}>
            <WhatsUpIcon />
          </TouchableOpacity>
        </View> */}
      </View>
    );
  };

  const onPressGetInTouch = () => {
    navigation.navigate(StackNavStrings.EmailUs);
  };
  return (
    <SafeAreaView style={styles.mainContainer}>
      <WHeader title={'Contact Us'} close />
      <FastImage source={images.tutorial1} style={localStyles.innerContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <AddressLocation />
          <ContactDetails />
          <SocialShare />
        </ScrollView>
      </FastImage>
    </SafeAreaView>
  );
};

const localStyles = StyleSheet.create({
  innerContainer: {
    ...styles.flex,
    ...styles.pt20,
    ...styles.ph20,
  },
  addressContainer: {
    backgroundColor: colors.colorWhite,
    borderRadius: 10,
    ...styles.ph20,
    ...styles.pv20,
    ...styles.mt20,
  },
  addressText: {
    width: moderateScale(200),
  },
  getInTouchButton: {
    backgroundColor: colors.placeHolder,
    ...styles.mt10,
    borderRadius: moderateScale(40),
  },
  getInTouchText: {
    ...Typography.fontSizes.f20,
    ...Typography.fontWeights.MediumAvenir,
  },
});

export default ContactUs;
