//------------- React native Import --------------
import { SafeAreaView,
   StyleSheet,
    TouchableOpacity, 
    View } from 'react-native';
import React, { useState } from 'react';

//--------------Library Import -----------------
import { useDispatch, useSelector } from 'react-redux';
import FastImage from 'react-native-fast-image';
import moment from 'moment';
//-------------reusable Component Import---------
import WHeader from '../../../components/common/WHeader';
import images from '../../../assets/images';
import { colors, styles } from '../../../themes';
import { moderateScale } from '../../../common/constants';
import {
  Camera,
  Close,
  CommunityIcon,
  EncroachmentsDark,
  House,
} from '../../../assets/svgs';
import WText from '../../../components/common/WText';
import WInput from '../../../components/common/WInput';
import WButtonText from '../../../components/common/WButtonText';
import Typography from '../../../themes/typography';
import WDateTimePicker from '../../../components/common/WDateTimePicker';
import { StackNavStrings } from '../../../navigation/NavigationKeys';

import {
  water_Problem_date,
  water_Problem_image,
  water_Problem_notes,
} from '../../../redux/actions/home';
import {
  captureImageFromCamera,
  pickImageOrVideoFromGallery,
  showPopupWithOk,
} from '../../../utils/helpers';
import { createRef } from 'react';
import MediaPickerSheet from '../../../components/common/MediaPickerSheet';
import { createThumbnail } from 'react-native-create-thumbnail';
import VideoCroperView from './VideoCroperView';

const AddReportDetail = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const home = useSelector(state => state.home);
  const mediaSheetRef = createRef();

  const [notes, setNotes] = React.useState(home.problemNote);
  const [isDatePickerVisible, setIsDatePickerVisible] = React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState(home.problemDate);
  const [currentDate, setCurrentDate] = React.useState(new Date());
  const [image, setImage] = React.useState(null);
  const [isRedirectOnCrop, setRedirectOnCrop] = useState(false)

  const [video, setVideo] = useState(null)
  const [cropVideo, setCropVideo] = useState(null)

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
  // console.log("inputfileduiConsole",home)

  const onPressCloseIcon = () => {
    navigation.goBack();
  };

  const handleNotes = val => {
    setNotes(val);
  };

  const onPressSelectDate = () => {
    setIsDatePickerVisible(true);
  };

  const onPressDone = () => {
    dispatch(water_Problem_notes(notes));
    dispatch(water_Problem_date(selectedDate));
    if (image) {
      dispatch(water_Problem_image(image));
    }
    navigation.navigate(StackNavStrings.SubmitReport, {
      from: route?.params?.from,
    });
    console.log("navigation data", route?.params?.from)
  };

  const onTakePhotoPress = () => {
    let mediaType = 'photo';
    mediaSheetRef.current.hide();
    setTimeout(() => {
      captureImageFromCamera(image => {
        setImage(image);
      }, mediaType);
    }, 500);
  };

  //Hide Commencement Date Picker
  const hideDatePicker = () => {
    setIsDatePickerVisible(false);
  };

  // Handle Commencement Date
  const handleDateConfirm = date => {
    hideDatePicker();
    setCurrentDate(date);
    var formatedDate = moment(date).format('YYYY/MM/DD');
    setSelectedDate(formatedDate);
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
        dispatch(water_Problem_image(response));
        // createThumbnail({
        //   url: response?.path,
        //   timeStamp: 10000,
        // })
        //   .then(response => {
        //     setImage(response);
        //   })
        //   .catch(err => {
        //     console.log(`[createThumbnail] Error: `, err);
        //   });
      }, mediaType);
    }, 500);
  };

  //Open Gallery
  const onChoosePhotoPress = () => {
    mediaSheetRef.current.hide();
    let mediaType = 'photo';
    setTimeout(() => {
      pickImageOrVideoFromGallery(image => {
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
        console.log("Res asdf=>>>>>>>>>>>", response.size)
        setVideo(response)
        setCropVideo(response)
        setRedirectOnCrop(true)

        // createThumbnail({
        //   url: response?.path,
        //   timeStamp: 10000,
        // })
        //   .then(response => {
        //     setImage(response);
        //   })
        //   .catch(err => console.log({err}));
      }, mediaType);
    }, 500);
  };

  //on Press Cancel Button
  const onPressCancel = () => {
    mediaSheetRef.current.hide();
  };
//---------------AddReportDetail componen return ------------
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
              <TouchableOpacity onPress={onPressCloseIcon}>
                <Close style={localStyles.closeIcon} />
              </TouchableOpacity>
              <View style={styles.center}>
                {showSvgIcon()}
                <View style={localStyles.problemContainer}>
                  <WText
                    type={'MA14'}
                    color={colors.colorBlack}
                    style={localStyles.homeHeadingTitle}>
                    {home.problemType}
                  </WText>
                </View>

                <WInput
                  placeHolder={'Write a description of the incident'}
                  keyBoardType={'default'}
                  placeholderTextColor={colors.colorBlack}
                  autoCapitalize={'none'}
                  returnKeyType="done"
                  _value={notes}
                  blurOnSubmit={true}
                  toGetTextFieldValue={val => handleNotes(val)}
                  inputContainerStyle={localStyles.inputContainer}
                  inputBoxStyle={{
                    color: colors.colorBlack,
                    textAlignVertical: 'top',
                    height: moderateScale(80),
                  }}
                  multiline={true}
                />
                <View style={localStyles.problemContainer}>
                  <WText
                    type={'MA14'}
                    color={colors.colorBlack}
                    style={localStyles.homeHeadingTitle}>
                    {moment(new Date()).format('YYYY/MM/DD')}
                  </WText>
                </View>
                <View style={localStyles.bottomButtonContainer}>
                  <WButtonText
                    title={'Done'}
                    containerStyle={localStyles.doneButton}
                    style={localStyles.searchText}
                    onPress={onPressDone}
                  />
                  <TouchableOpacity
                    style={localStyles.addPhotoButton}
                    onPress={onPressCamera}>
                    <Camera />
                    <WText type={'MA14'} color={colors.colorWhite}>
                      {'Add photo'}
                    </WText>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </FastImage>
        </View>
      }
      {/* Date Picker */}
      <WDateTimePicker
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleDateConfirm}
        onCancel={hideDatePicker}
        date={currentDate}
      />
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
    backgroundColor: 'rgba(0, 72, 147, 0.75)',
    width: moderateScale(315),
    height: moderateScale(420),
    borderRadius: moderateScale(30),
    ...styles.mt40,
    ...styles.pv20,
  },
  closeIcon: {
    ...styles.selfEnd,
    ...styles.mr20,
  },
  problemContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    height: moderateScale(41),
    borderRadius: moderateScale(24),
    width: '90%',
    ...styles.mt20,
    justifyContent: 'center',
    ...styles.ph20,
  },
  detailsContainer: {
    ...styles.mt10,
  },
  inputContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    height: moderateScale(89),
    ...styles.mt15,
  },
  selectDate: {
    ...Typography.fontSizes.f14,
    ...Typography.fontWeights.MediumOptima,
  },
  selectDateBtn: {
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    height: moderateScale(50),
    width: '90%',
    borderRadius: moderateScale(24),
    ...styles.mt15,
    justifyContent: 'flex-start',
    ...styles.ph20,
  },
  bottomButtonContainer: {
    ...styles.rowSpaceBetween,
    ...styles.mt20,
    width: '90%',
  },
  addPhotoButton: {
    ...styles.center,
    backgroundColor: colors.placeHolder,
    borderRadius: moderateScale(24),
    width: moderateScale(112),
    height: moderateScale(50),
  },
  doneButton: {
    backgroundColor: colors.colorWhite,
    ...styles.mt30,
    borderRadius: moderateScale(30),
    marginTop: moderateScale(0),
    width: moderateScale(160),
  },
  searchText: {
    ...Typography.fontSizes.f16,
    ...Typography.fontWeights.MediumAvenir,
    color: colors.placeHolder,
  },
});

export default AddReportDetail;
