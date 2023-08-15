import {
  View,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import React, { useEffect, createRef, useState } from 'react';
import { colors, styles } from '../../../themes';
import { getHeight, moderateScale } from '../../../common/constants';
import WHeader from '../../../components/common/WHeader';
import FastImage from 'react-native-fast-image';
import images from '../../../assets/images';
import {
  Camera,
  Close,
  CommunityIcon,
  DeleteIcon,
  EditIcon,
  EncroachmentsDark,
  House,
} from '../../../assets/svgs';
import WText from '../../../components/common/WText';
import WButtonText from '../../../components/common/WButtonText';
import Typography from '../../../themes/typography';
import {
  StackNavStrings,
  TabBarString,
} from '../../../navigation/NavigationKeys';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearSettingsData,
  sendReport,
} from '../../../redux/actions/settingsAction';
import strings from '../../../i18n/strings';
import {
  UNAUTHORIZED,
  SEND_REPORT_SUCCESS,
  SEND_REPORT_FAILED,
} from '../../../redux/types';
import {
  captureImageFromCamera,
  pickImageOrVideoFromGallery,
  showPopupWithOk,
  showPopupWithOkAndCancel,
  uploadImageParams,
} from '../../../utils/helpers';
import WLoader from '../../../components/common/WLoader';
import { water_Problem_image } from '../../../redux/actions/home';
import moment from 'moment';
import MediaPickerSheet from '../../../components/common/MediaPickerSheet';
import { createThumbnail } from 'react-native-create-thumbnail';
import VideoCroperView from './VideoCroperView';
// import { setCurrentScreenName } from '../../../common/CustomAnalytics';
import analytics from '@react-native-firebase/analytics';

const SubmitReport = ({ navigation, route }) => {
  const home = useSelector(state => state.home);
  const settings = useSelector(state => state.settings);
  const [image, setImage] = React.useState(null);

  const dispatch = useDispatch();
  const mediaSheetRef = createRef();
  //Loading State
  let isLoading = settings && settings.isLoading;

  const [isRedirectOnCrop, setRedirectOnCrop] = useState(false)

  const [video, setVideo] = useState(null)
  const [cropVideo, setCropVideo] = useState(null)

  useEffect(() => {
    if (home?.problemImage?.path) {
      createThumbnail({
        url: home?.problemImage?.path,
        timeStamp: 10000,
      })
        .then(response => {
          console.log('response submit', response);
          setImage(response);
        })
        .catch(err => console.log({ err }));
    }
  }, [home]);

  useEffect(() => {
    let { actions } = settings;
    if (actions) {
      let { type, message, data } = actions;
      if (type === SEND_REPORT_FAILED) {
        //Show Popup Message Of Error
        showPopupWithOk(strings.randWater, message);
        //Clear settings Data
        dispatch(clearSettingsData());
      } else if (type === SEND_REPORT_SUCCESS) {
        navigation.navigate(StackNavStrings.ThankYou);
        //do something for success
        dispatch(clearSettingsData());
        // setCurrentScreenName("ReportSubmit")
        analytics().logScreenView({ Report_Submit: 'Submit Report Screen', SubmitReport_class: 'SubmitReport.js', });
      } else if (type === UNAUTHORIZED) {
        //Show Error Message For Unauthorized
        showPopupWithOk(strings.randWater, message);
        //Clear settings Data
        dispatch(clearSettingsData());
      }
    }
  }, [settings]);

  const onPressCloseIcon = () => {
    navigation.goBack();
  };

  const onSubmitHandler = () => {
    console.log("home-problemImage", home)
    const params = {
      main_type: route?.params?.from,
      sub_type: home.problemType,
      notes: home.problemNote,
      // incident_date: home.problemDate,
      location_name: home.problemAddress,
      latitude: home.problemLocation[0] || '',
      longitude: home.problemLocation[1] || '',
      image: uploadImageParams(home.problemImage),
    };
    console.log("shashiranjanparams----", params)
    Object.keys(params).forEach(k => params[k] === '' && delete params[k]);
    let formdata = new FormData();
    for (let i in params) {
      if (Array.isArray(params[i])) {
        const k = `${i}`;
        formdata.append(k, JSON.stringify(params[i]));
      } else {
        formdata.append(i, params[i]);
      }
    }
    console.log("shashiranjanImage======", formdata)
    dispatch(sendReport(formdata));
  };

  const onPressSubmit = () => {
    if (global.FullData?.is_guest_user) {
      Alert.alert('Rand Water', 'Please Login', [
        {
          text: 'Skip',
          onPress: () => onSubmitHandler(),
        },
        {
          text: 'Log In',
          onPress: () =>
            navigation.navigate(StackNavStrings.AuthNavigator, {
              screen: StackNavStrings.Login,
              params: { fromSubmit: true },
            }),
        },
      ]);
    } else {
      onSubmitHandler();
    }
  };

  const showSvgIcon = () => {
    switch (route?.params?.from) {
      case 'At my House':
        return <House />;
      case 'In the Community':
        return <CommunityIcon />;
      case 'Encroachments':
        return <EncroachmentsDark />;
      default:
        return <House />;
    }
  };

  const OptionBox = ({ icon, title, onPress }) => {
    return (
      <TouchableOpacity style={styles.center} onPress={onPress}>
        {icon()}
        <WText
          type={'MA16'}
          color={colors.colorWhite}
          style={localStyles.notesText}>
          {title}
        </WText>
      </TouchableOpacity>
    );
  };

  const onPressDeleteIcon = () => {
    showPopupWithOkAndCancel(
      strings.randWater,
      'Are you sure you want to delete this report?',
      () => navigation.navigate(TabBarString.Home),
    );
  };

  const onPressAddInfo = () => {
    navigation.navigate(StackNavStrings.AddReportDetail, {
      from: route.params.from,
    });
  };

  //Open Camera
  const onTakePhotoPress = () => {
    let mediaType = 'photo';
    mediaSheetRef.current.hide();
    setTimeout(() => {
      captureImageFromCamera(image => {
        dispatch(water_Problem_image(image));
        setImage(image);
      }, mediaType);
    }, 500);
  };

  //on Press Cancel Button
  const onPressCancel = () => {
    mediaSheetRef.current.hide();
  };

  //on Press Camera Button Open Model
  const onPressCamera = () => {
    mediaSheetRef.current.show();
  };

  const onTakeVideoPress = () => {
    let mediaType = 'video';
    mediaSheetRef.current.hide();
    setTimeout(() => {
      captureImageFromCamera(response => {
        if (response) {
          console.log('Capture video===>', response);
          dispatch(water_Problem_image(response));
          createThumbnail({
            url: response?.path,
            timeStamp: 10000,
          })
            .then(response => {
              setImage(response);
            })
            .catch(err => {
              console.log(`[createThumbnail] Error: `, err);
            });
        } else {
          setImage(null);
        }
      }, mediaType);
    }, 500);
  };

  //Open Gallery
  const onChoosePhotoPress = () => {
    mediaSheetRef.current.hide();
    let mediaType = 'photo';
    setTimeout(() => {
      pickImageOrVideoFromGallery(image => {
        dispatch(water_Problem_image(image));
        setImage(image);
      }, mediaType);
    }, 500);
  };

  //Open Video From Gallery
  const onChooseVideoPress = () => {
    mediaSheetRef.current.hide();
    let mediaType = 'video';
    setTimeout(() => {
      pickImageOrVideoFromGallery(response => {
        // dispatch(water_Problem_image(response));
        console.log("Res", response.size)
        setVideo(response)
        setCropVideo(response)
        setRedirectOnCrop(true)
        // if (response) {
        //   dispatch(water_Problem_image(response));
        //   createThumbnail({
        //     url: response?.path,
        //     timeStamp: 10000,
        //   })
        //     .then(response => {
        //       setImage(response);
        //     })
        //     .catch(err => console.log({err}));
        // } else {
        //   setImage(null);
        // }
      }, mediaType);
    }, 500);
  };

  return (
    <SafeAreaView style={localStyles.mainContainer}>
      {/* <WHeader title={'Report'} /> */}
      {isRedirectOnCrop ?
        <View style={{ flex: 1, ...styles.mt10, }}>
          <VideoCroperView video={video} donePress={(data) => setRedirectOnCrop(false)} closePress={(data) => setRedirectOnCrop(false)}/>
        </View>
        :
        <View style={{ flex: 1 }}>
          <WHeader title={'Report'} />
          <FastImage
            source={images.mapBackground}
            style={localStyles.innerContainer}>
            <View style={localStyles.innerMainContainer}>
              <TouchableOpacity
                hitSlop={{ top: 20, bottom: 20, left: 50, right: 50 }}
                onPress={onPressCloseIcon}
                style={localStyles.closeIcon}>
                <Close />
              </TouchableOpacity>
              <View style={localStyles.mainDetailsContainer}>
                {showSvgIcon()}
                <View style={localStyles.detailsContainer}>
                  {home?.problemType && (
                    <WText
                      type={'MA16'}
                      color={colors.colorWhite}
                      style={localStyles.homeHeadingTitle}>
                      {home?.problemType}
                    </WText>
                  )}
                  {home?.problemNote && (
                    <WText
                      type={'MA16'}
                      color={colors.colorWhite}
                      style={localStyles.notesText}
                      numberOfLines={3}>
                      {home?.problemNote}
                    </WText>
                  )}

                  <WText
                    type={'MA16'}
                    color={colors.colorWhite}
                    style={localStyles.notesText}>
                    {moment(new Date()).format('YYYY/MM/DD')}
                  </WText>

                  <View>
                    {(image !== null || home?.problemImage?.path) && (
                      <Image
                        source={{
                          uri:
                            image !== null ? image?.path : home.problemImage.path,
                        }}
                        style={localStyles.selectedImage}
                      />
                    )}
                  </View>
                  <View style={localStyles.optionContainer}>
                    <OptionBox
                      title={'Delete'}
                      icon={() => <DeleteIcon />}
                      onPress={onPressDeleteIcon}
                    />
                    <View style={localStyles.separator} />
                    <OptionBox
                      title={'Add info'}
                      icon={() => <EditIcon width={20} height={20} />}
                      onPress={onPressAddInfo}
                    />
                    <View style={localStyles.separator} />
                    <OptionBox
                      title={'Add photo'}
                      icon={() => <Camera width={20} height={20} />}
                      onPress={onPressCamera}
                    />
                  </View>

                  <WButtonText
                    title={'Submit'}
                    containerStyle={localStyles.submitButton}
                    style={localStyles.submitText}
                    onPress={onPressSubmit}
                  />
                </View>
              </View>
            </View>
          </FastImage>
        </View>
      }
      <MediaPickerSheet
        sheetRef={mediaSheetRef}
        onTakePhoto={onTakePhotoPress}
        onTakeVideo={onTakeVideoPress}
        onChoosePhoto={onChoosePhotoPress}
        onChooseVideo={onChooseVideoPress}
        onCancelPress={onPressCancel}
        editable={false}
        titleText={'Add Photo or Video'}
      />
      {isLoading && <WLoader />}
    </SafeAreaView>
  );
};

const localStyles = StyleSheet.create({
  mainContainer: {
    backgroundColor: colors.colorWhite,
    ...styles.flex,
  },
  innerContainer: {
    ...styles.flex,
    alignItems: 'center',
  },
  innerMainContainer: {
    backgroundColor: colors.colorWhite,
    backgroundColor: colors.homeHeadingTitle,
    width: moderateScale(315),
    minHeight: getHeight(300),
    borderRadius: moderateScale(30),
    ...styles.mt40,
    // ...styles.pv20,
  },
  closeIcon: {
    position: 'absolute',
    right: moderateScale(20),
    top: moderateScale(20),
    zIndex: 99,
  },
  notesText: {
    ...styles.mt10,
  },
  submitButton: {
    // ...Typography.fontSizes.f20,
    backgroundColor: colors.colorWhite,
    width: moderateScale(160),
    borderRadius: moderateScale(24),
    ...styles.selfCenter,
    ...styles.mv10,
  },
  submitText: {
    ...Typography.fontSizes.f16,
    ...Typography.fontWeights.MediumAvenir,
    color: colors.placeHolder,
  },
  detailsContainer: {
    ...styles.mt30,
    ...styles.ph15,
    width: '90%',
  },
  optionContainer: {
    ...styles.rowSpaceBetween,
    ...styles.mv10,
    alignItems: 'center',
  },
  selectedImage: {
    width: moderateScale(120),
    minHeight: moderateScale(68),
    resizeMode: 'contain',
    ...styles.selfCenter,
  },
  mainDetailsContainer: {
    ...styles.center,
    ...styles.mt20,
    width: '100%',
  },
  separator: {
    height: moderateScale(20),
    width: moderateScale(2),
    backgroundColor: colors.colorWhite,
    opacity: 0.3,
    alignSelf: 'flex-start',
  },
});

export default SubmitReport;
