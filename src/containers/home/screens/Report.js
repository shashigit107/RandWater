import React, { useEffect, useRef, useState, useCallback } from 'react';
import { View, SafeAreaView, StyleSheet, TouchableOpacity, Dimensions, Text, Platform } from 'react-native';
import {
  Camera,
  Close,
  CommunityIcon,
  EncroachmentsDark,
  House,
  Search_Icon,
  CloseBlueIcon
} from '../../../assets/svgs';
import { moderateScale } from '../../../common/constants';
import WButtonText from '../../../components/common/WButtonText';
import WHeader from '../../../components/common/WHeader';
import WInput from '../../../components/common/WInput';
import WText from '../../../components/common/WText';
import WLoader from '../../../components/common/WLoader';
import { StackNavStrings } from '../../../navigation/NavigationKeys';
import { colors, styles } from '../../../themes';
import Typography from '../../../themes/typography';
import { useDispatch, useSelector } from 'react-redux';
import VideoPlayer from 'react-native-video-player';
import RNVideoHelper from 'react-native-video-helper';
import {
  water_Problem_address,
  water_Problem_date,
  water_Problem_image,
  water_Problem_location,
  water_Problem_notes,
} from '../../../redux/actions/home';
import {
  appPermission,
  captureImageFromCamera,
  checkPlatform,
  permissionType,
  pickImageOrVideoFromGallery,
  showPopupWithOk,
} from '../../../utils/helpers';
import WKeyBoardAvoidWrapper from '../../../components/common/WKeyBoardAvoidWrapper';
import WDateTimePicker from '../../../components/common/WDateTimePicker';
import moment from 'moment';
import GoogleAutoPlaceSearch from '../../../components/common/GoogleAutoPlaceSearch';
import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoding';
import strings from '../../../i18n/strings';
import MediaPickerSheet from '../../../components/common/MediaPickerSheet';
import { createRef } from 'react';
import CustomSlider from '../../../components/slider/CustomSlider';
import VideoCroperView from './VideoCroperView';

const { width, height } = Dimensions.get("window")


const Report = ({ navigation, route }) => {
  const dispatch = useDispatch();

  const googlePlaceInput = useRef();
  const mediaSheetRef = createRef();

  const [location, setLocation] = useState('');
  const [geoLocation, setGeoLocation] = useState([]);
  const [image, setImage] = useState(null);

  const [notes, setNotes] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [searchLocationInput, setSearchLocationInput] = useState('');


  const [video, setVideo] = useState(null)
  const [remainSize, setRemainSize] = useState(null)
  const [remainDuration, setRemainDuration] = useState(null)

  const inputRef = useRef(null)
  const [cropVideo, setCropVideo] = useState(null)
  const [isActivityLoading, setActiivtyLoading] = useState(false)
  const [isRedirectOnCrop, setRedirectOnCrop] = useState(false)
  const home = useSelector(state => state.home);

  const onPressCloseIcon = () => {
    navigation.goBack();
  };

  const showSvgIcon = () => {
    switch (route.params.from) {

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



  const onPressNext = () => {
    if (location && geoLocation) {
      dispatch(water_Problem_address(location));
      dispatch(water_Problem_location(geoLocation));
      if (image) {
        dispatch(water_Problem_image(image));
      }
      // If selected Problem is Other Then Only work
      if (home.problemType === 'Other') {
        dispatch(water_Problem_notes(notes));
        dispatch(water_Problem_date(selectedDate));
      }

      navigation.navigate(StackNavStrings.AddReportDetail, {
        from: route.params.from,
      });
    } else {
      showPopupWithOk(strings.randWater, 'Please select location.');
    }
  };

  //Open Camera
  const onTakePhotoPress = () => {
    let mediaType = 'photo';
    mediaSheetRef.current.hide();
    setTimeout(() => {
      captureImageFromCamera(image => {
        setImage(image);
      }, mediaType);
    }, 500);
  };

  const handleNotes = val => {
    setNotes(val);
  };
  const ShowDetailsOnOtherScreen = () => {
    const onPressSelectDate = () => {
      setIsDatePickerVisible(true);
    };

    //Hide Commencement Date Picker
    const hideDatePicker = () => {
      setIsDatePickerVisible(false);
    };

    // Handle Commencement Date
    const handleDateConfirm = date => {
      hideDatePicker();
      // console.log("-----------------",date)
      setCurrentDate(date);

      var formatedDate = moment(date).format('YYYY/MM/DD');
      setSelectedDate(formatedDate);
    };

    return (
      <View>
        <View style={localStyles.problemContainer}>
          <WText type={'MA14'} color={colors.colorWhite}>
            {home.problemType}
          </WText>
        </View>
        <WInput
          placeHolder={'Write a description of the incident'}
          keyBoardType={'default'}
          placeholderTextColor={colors.colorWhite}
          // _errorText={emailErr}
          autoCapitalize={'none'}
          _value={notes}
          toGetTextFieldValue={val => handleNotes(val)}
          inputContainerStyle={localStyles.notesInputContainer}
          inputBoxStyle={{
            color: colors.colorWhite,
            textAlignVertical: 'top',
            height: moderateScale(80),
          }}
          multiline={true}
        />
        <WDateTimePicker
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleDateConfirm}
          onCancel={hideDatePicker}
          date={currentDate}
        />
      </View>
    );
  };

  // On Press Google Place Search Address
  const onListItemPress = details => {
    if (!details.address_components) {
      return;
    }
    let placeInputText = googlePlaceInput.current.getAddressText();
    setLocation(placeInputText);
    // Geo Location
    const geometry = details.geometry.location;
    const geo_location = [geometry.lat, geometry.lng];
    setGeoLocation(geo_location);
  };

  // on Current Location Icon Pressed
  const onPressCurrentLocation = async () => {
    await appPermission(permissionType.location);
    Geolocation.getCurrentPosition(
      position => {
        Geocoder.from(position.coords.latitude, position.coords.longitude)
          .then(json => {
            var addressComponent = json.results;
            if (addressComponent[0].formatted_address) {
              googlePlaceInput.current.setAddressText(
                addressComponent[0].formatted_address,
              );
              onListItemPress(addressComponent[0]);
            }
          })
          .catch(error => console.warn(error));
      },
      error => {

        showPopupWithOk(strings.randWater, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
    );
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
        console.log("response in report", response)
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
  // console.log("Video",video)
  //Open Video From Gallery
  const onChooseVideoPress = async () => {
    mediaSheetRef.current.hide();
    let mediaType = 'video';
    setTimeout(async () => {
      pickImageOrVideoFromGallery(async response => {
        console.log("responseVideo", response)
        setVideo(response)
        setCropVideo(response)
        setRemainSize(response.size / 1000)
        setRemainDuration(response.duration)
        console.log("Yes I am")
        // console.log("response========>>", video)
        setRedirectOnCrop(true)
        //------------------------------------------------------------------
        // const result =  await Video.compress(
        //   response.path,
        //   {
        //     compressionMethod: 'auto',
        //   },

        // );
        // const metaData = await getVideoMetaData(response.path);
        // setTimeout(() => {
        //   console.log("shashiranjan--------------",metaData)
        //   console.log("result-------",result)
        // }, 1000);


        // setTotalLengthVideo(parseInt(response.duration))

        // inputRef.current.show()

        // dispatch(water_Problem_image(response));
        //-----------------------------------------------------------------
      }, mediaType);
    }, 500);
  };

  //on Press Cancel Button
  const onPressCancel = () => {
    mediaSheetRef.current.hide();
  };

  const closePopup = () => {
    inputRef.current.close()
  }

  const renderReportScreen = () => {
    return (
      <WKeyBoardAvoidWrapper>
        <TouchableOpacity onPress={onPressCloseIcon}>
          <Close style={localStyles.closeIcon} />
        </TouchableOpacity>
        <View style={localStyles.innerMainContainer}>
          {showSvgIcon()}
          <WText
            type={'BB26'}
            color={colors.colorWhite}
            style={localStyles.headerTitle}>
            {route.params.from}
          </WText>
          <View>
            {home.problemType === 'Other' && ShowDetailsOnOtherScreen()}
            <WText
              type={'BB22'}
              color={colors.colorWhite}
              style={localStyles.headerTitle}>
              {'Where is the problem located?'}
            </WText>

            <WText
              type={'MA16'}
              color={colors.colorWhite}
              style={styles.mt15}>
              {'Type in the location'}
            </WText>
            <View style={localStyles.placeApiContainer}>
              <Search_Icon style={localStyles.searchIcon} />
              <GoogleAutoPlaceSearch
                refName={googlePlaceInput}
                onPress={(data, details = null) => {
                  onListItemPress(details);
                }}
                inputContainerStyle={localStyles.mapInputContainer}
                inputStyle={localStyles.locationSearchInput}
                placeholder={'Enter Your Location'}
                textInputProps={{
                  onChangeText: text => {
                    setSearchLocationInput(text);
                  },
                  placeholderTextColor: colors.placeHolder,
                  style: {
                    color: colors.colorBlack,
                  },
                }}
              />
            </View>
            <WButtonText
              title={'Use current location'}
              containerStyle={localStyles.currentLocationButton}
              style={localStyles.currentLocationText}
              onPress={onPressCurrentLocation}
            />
            <View style={localStyles.bottomButtonContainer}>
              <WButtonText
                title={'Next'}
                containerStyle={{
                  ...localStyles.searchButton,
                  ...localStyles.nextButton,
                }}
                style={localStyles.searchText}
                onPress={onPressNext}
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
        <View style={{ height: moderateScale(110) }} />
      </WKeyBoardAvoidWrapper>

    )
  }
  const onHandleChange = ({ leftPosition, rightPosition }) => {
    setRIghtSecond(rightPosition)
    setLeftSecond(leftPosition)

  }
  // const cropVideo=(leftSec)=>{

  // }

  const setleftRightSecCallBack = (leftSec, rightSec) => {
    setActiivtyLoading(true)
    let sizeFindOut = Math.floor((video.size) / 1000)
    let secondFindout = Math.floor((video.duration) / 1000)
    let oneSecCarryKb = Math.floor(sizeFindOut / secondFindout)
    let secondCutFromVideo = secondFindout - rightSec + leftSec
    let remainLeftVideo = secondFindout - secondCutFromVideo
    let cutMbInVideo = remainLeftVideo * oneSecCarryKb
    console.log("cutMbInVideo", cutMbInVideo, " =>secondFindout=>> ", remainLeftVideo)
    setRemainSize(cutMbInVideo)
    setRemainDuration(remainLeftVideo)

    console.log("leftSecright", leftSec, rightSec)
    RNVideoHelper.compress(video.path, {
      startTime: leftSec, // optional, in seconds, defaults to 0
      endTime: rightSec, //  optional, in seconds, defaults to video duration
      quality: 'medium', // default low, can be medium or high
      defaultOrientation: 0 // By default is 0, some devices not save this property in metadata. Can be between 0 - 360
    }).progress(value => {
      console.log('progress', value); // Int with progress value from 0 to 1
    }).then(compressedUri => { // String with path to temporary compressed video
      let file = "";
      if (Platform.OS == 'android') {
        file = `file:///${compressedUri}`
      } else {
        file = compressedUri
      }
      setCropVideo({ path: file });
      setActiivtyLoading(false)
    })

  }
  const cropedVideo = () => {
    console.log("remainDuration", remainDuration, remainSize)
    if (remainSize > 20000) {
      let mediaType = 'video';
      showPopupWithOk(
        strings.randWater,
        `You can't upload ${mediaType} greater than 20MB.`,
      );
    } else {
      let pickObjectVideo = {}
      pickObjectVideo["duration"] = remainDuration//metaData.duration
      pickObjectVideo["path"] = cropVideo.path//result
      pickObjectVideo["height"] = video.height//metaData.height
      pickObjectVideo["size"] = remainSize//metaData.size
      pickObjectVideo["width"] = video.width//metaData.width//mime:"video/mp4"
      pickObjectVideo["mime"] = video.mime//pickObject.mime

      console.log("Request DATA=>", pickObjectVideo)
      dispatch(water_Problem_image(pickObjectVideo));
      setCropVideo(null)
    }
    console.log("cropedVideo", cropVideo)
  }

  const renderVideoCroper = () => {
    return (
      <View style={{ position: "absolute", width: width }}>
        <VideoPlayer
          video={{ uri: cropVideo.path }}
          // playControl
          // muted={true}
          // thumbnail={{ uri: 'https://i.picsum.photos/id/866/1600/900.jpg' }}
          // resume={()=>true}
          
        />

        <CustomSlider
          maxVideoDuration={Math.trunc((video.duration) / 1000)}
          setleftRightSecCallBack={setleftRightSecCallBack}
          cropedVideo={cropedVideo}
        />
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.mainContainer}>
      {/* <WHeader title={'Report'} /> */}

      {/* {cropVideo ? renderVideoCroper() : renderReportScreen()} */}
      {/* {renderReportScreen()} */}
      {isRedirectOnCrop ?
        <View style={{ flex: 1, ...styles.mt10}}>
          <VideoCroperView video={video} donePress={(data) => setRedirectOnCrop(false)} closePress={(data) => setRedirectOnCrop(false)} />
        </View>
        :
        <>
          <View style={{ flex: 1 }}>
            <WHeader title={'Report'} />
            <View style={localStyles.innerContainer}>
              {renderReportScreen()}
            </View>
          </View>
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
        </>

      }


      {/* </View> */}
      {/* <CustomPopup
        inputRef={inputRef}
        component={component}
        transparent={true}
      ></CustomPopup> */}
      {isActivityLoading && <WLoader />}
    </SafeAreaView>
  );
};

const localStyles = StyleSheet.create({
  innerContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 72, 147, 0.75)',
    ...styles.mt10,
    borderTopEndRadius: moderateScale(30),
    borderTopStartRadius: moderateScale(30),
    ...styles.ph20,
  },
  closeIcon: {
    ...styles.selfEnd,
    ...styles.mt20,
  },
  innerMainContainer: {
    flex: 1,
    ...styles.center,
  },
  headerTitle: {
    ...styles.mt15,
  },
  searchText: {
    ...Typography.fontSizes.f16,
    ...Typography.fontWeights.MediumAvenir,
    color: colors.placeHolder,
  },
  searchButton: {
    backgroundColor: colors.colorWhite,
    ...styles.mt30,
    borderRadius: moderateScale(30),
  },
  currentLocationButton: {
    backgroundColor: colors.placeHolder,
    borderRadius: moderateScale(30),
    ...styles.mt15,
  },
  currentLocationText: {
    color: colors.colorWhite,
    ...Typography.fontSizes.f16,
    ...Typography.fontWeights.MediumAvenir,
  },
  nextButton: {
    marginTop: moderateScale(0),
    width: moderateScale(170),
  },
  bottomButtonContainer: {
    ...styles.rowSpaceBetween,
    ...styles.mt20,
    marginBottom: moderateScale(60),
  },
  addPhotoButton: {
    ...styles.center,
    backgroundColor: colors.placeHolder,
    borderRadius: moderateScale(24),
    width: moderateScale(130),
    height: moderateScale(50),
  },
  problemContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    height: moderateScale(41),
    borderRadius: moderateScale(24),
    ...styles.mt20,
    justifyContent: 'center',
    ...styles.ph20,
  },
  notesInputContainer: {
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
    borderRadius: moderateScale(24),
    ...styles.mt15,
    justifyContent: 'flex-start',
    ...styles.ph20,
  },
  placeApiContainer: {
    borderRadius: moderateScale(25),
    borderWidth: 1,
    borderColor: colors.secondary,
    ...styles.flexRow,
    ...styles.ph15,
    ...styles.itemsCenter,
    minHeight: moderateScale(46),
    ...styles.mt5,
    backgroundColor: 'rgba(255,255,255,0.6)',
  },
  mapInputContainer: {
    paddingVertical: checkPlatform() === 'android' ? 0 : moderateScale(15),
    width: '100%',
    alignSelf: 'flex-start',
    paddingLeft: moderateScale(30),
    // backgroundColor: 'rgba(255,255,255,0.6)',
  },
  locationSearchInput: {
    color: '#5d5d5d',
  },
  searchIcon: {
    position: 'absolute',
    left: moderateScale(10),
    top: moderateScale(13),
  },
});

export default Report;
