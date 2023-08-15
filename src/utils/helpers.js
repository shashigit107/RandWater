import { Alert, Platform, PermissionsAndroid, Linking } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import { CAMERA_PERMISSION, moderateScale } from '../common/constants';
import strings from '../i18n/strings';
import { check, PERMISSIONS, request, RESULTS } from 'react-native-permissions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNVideoHelper from 'react-native-video-helper';
const MAX_VIDEO_SIZE = 20000000;

// Check App Platform 
const checkPlatform = () => {
  if (Platform.OS === 'android') {
    return 'android';
  } else {
    return 'ios';
  }
};

//Open Camera for image capture
const captureImageFromCamera = async (setImage, mediaType) => {
  const isAllow = await AsyncStorage.getItem(CAMERA_PERMISSION);

  if (isAllow !== false) {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          AsyncStorage.setItem(CAMERA_PERMISSION, 'true');

          ImagePicker.openCamera({
            width: moderateScale(193),
            height: moderateScale(237),
            cropping: false,
            mediaType: mediaType,
          })
            .then(image => {
              if (image?.size > MAX_VIDEO_SIZE) {
                showPopupWithOk(
                  strings.randWater,
                  `You can't upload ${mediaType} greater than 20MB.`,
                );
                setImage(undefined);
              } else {
                setImage(image);
              }
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          AsyncStorage.setItem(CAMERA_PERMISSION, 'false');
          showPopupWithOk(
            '',
            'You have to manually enable the permission from the app setting',
          );
        }
      } catch (err) {
        console.warn(err);
      }
    } else {
      try {
        request(PERMISSIONS.IOS.CAMERA).then(res => {
          if (res === 'granted') {
            AsyncStorage.setItem(CAMERA_PERMISSION, 'true');

            ImagePicker.openCamera({
              width: moderateScale(193),
              height: moderateScale(237),
              cropping: false,
              mediaType: mediaType,
              compressVideoPreset: 'HighestQuality',
              compressImageQuality: 1,
            })
              .then(image => {
                console.log('pickObject>>>>', image);
                if (image?.size > MAX_VIDEO_SIZE) {
                  showPopupWithOk(
                    strings.randWater,
                    `You can't upload ${mediaType} greater than 20MB.`,
                  );
                  setImage(undefined);
                } else {
                  setImage(image);
                }
              })
              .catch(err => {
                console.log('err', err);
              });
          } else {
            AsyncStorage.setItem(CAMERA_PERMISSION, 'false');

            showPopupWithOk(
              '',
              'You have to manually enable the permission from the app setting',
            );
          }
        });
      } catch (error) {
        console.warn(err);
      }
    }
  } else {
    showPopupWithOk(
      '',
      'You have to manually enable the permission from the app setting',
    );
  }
};

const pickImageOrVideoFromGallery = async (setFile, fileType) => {
  console.log("setFile=====", setFile)
  console.log("fileType=====", fileType)
  // let 
  let pickObject1 = {}
  try {
    ImagePicker.openPicker({
      width: moderateScale(193),
      height: moderateScale(237),
      cropping: false,
      mediaType: fileType,
      compressVideoPreset: 'HighestQuality',
      compressImageQuality: 1,
    })
      .then(async pickObject => {
        // console.log("pickObject----", pickObject)



        // let arr = pickObject.mime.split("/")
        // console.log("arr-----------", arr)
        // if (arr[0] == "video") {
        //   let pickObjectVideo = {}
        //   RNVideoHelper.compress(pickObject.path, {
        //     startTime: 2, // optional, in seconds, defaults to 0
        //     endTime: 5, //  optional, in seconds, defaults to video duration
        //     quality: 'medium', // default low, can be medium or high
        //     defaultOrientation: 0 // By default is 0, some devices not save this property in metadata. Can be between 0 - 360
        //   }).progress(value => {
        //     console.log('progress', value); // Int with progress value from 0 to 1
        //   }).then(compressedUri => {
        //     console.log('compressedUri', compressedUri); // String with path to temporary compressed video
        //     pickObject["path"] = `file:///${compressedUri}`
        //     setFile(pickObject);
        //   })
        //   // const result = await Video.compress(
        //   //   pickObject.path,
        //   //   {
        //   //     quality: 0.8,
        //   //     // compressionMethod: 'auto',
        //   //   },
        //   // );
        //   //   const metaData = await getVideoMetaData(result);
        //   //   setTimeout(() => {
        //   //     pickObjectVideo["duration"] = metaData.duration
        //   //     pickObjectVideo["path"] = result
        //   //     pickObjectVideo["height"] = metaData.height
        //   //     pickObjectVideo["size"] = metaData.size
        //   //     pickObjectVideo["width"] = metaData.width//mime:"video/mp4"
        //   //     pickObjectVideo["mime"] = pickObject.mime
        //   //     console.log("shashiranjan--------------", pickObjectVideo)
        //   //     console.log("result-------", result)
        //   //     pickObject1 = pickObjectVideo
        //   //     if (pickObject1?.size > MAX_VIDEO_SIZE) {
        //   //       showPopupWithOk(
        //   //         strings.randWater,
        //   //         `You can't upload ${fileType} greater than 20MB.`,
        //   //       );
        //   //       setFile(undefined);
        //   //     } else {
        //   //       setFile(pickObject1);
        //   //     }
        //   //   }, 1000);

        //   // }
        //   //  else{
        //   // pickObject1 = pickObject
        //   // console.log("VideoResponse=======", pickObject)
        //   // if (pickObject?.size > MAX_VIDEO_SIZE) {
        //   //   showPopupWithOk(
        //   //     strings.randWater,
        //   //     `You can't upload ${fileType} greater than 20MB.`,
        //   //   );
        //   //   setFile(undefined);
        //   // } else {
        //   //   setFile(pickObject);
        //   // }
        // }
        // pickObject1 = pickObjectpickObject
        console.log("VideoResponse=======", pickObject)
        if (pickObject?.size > MAX_VIDEO_SIZE) {
          //  showPopupWithOk(
          //    strings.randWater,
          //   `You can't upload ${fileType} greater than 20MB.`,
          //   );
          //   setFile(undefined);
          setFile(pickObject);
        } else {
          setFile(pickObject);
        }



        // console.log('pickObject>>>>', pickObject);

      })
      .catch(err => {
        if (err?.message?.includes('permission')) {
          if (Platform.OS === 'ios') {
            showPopupWithOk(
              '',
              'You have to manually enable the permission from the app setting',
            );
          } else {
            console.log('err', err);
          }
        } else {
          console.log('err', err);
        }
      });
  } catch (error) {
    console.log('[PHOTO_LIBRARY] Error:', error);
  }
};

//Show Popup Alert
const showPopupWithOk = (title, message, okClicked) => {
  Alert.alert(title ? title : strings.randWater, message ? message : '', [
    { text: strings.ok.toUpperCase(), onPress: () => okClicked && okClicked() },
  ]);
};

//Show Popup with ok and cancel
const showPopupWithOkAndCancel = (title, message, okClicked, cancelClicked) => {
  Alert.alert(title ? title : strings.randWater, message ? message : '', [
    {
      text: strings.cancel,
      onPress: () => cancelClicked && cancelClicked(),
      style: 'cancel',
    },
    {
      text: strings.ok,
      onPress: () => okClicked && okClicked(),
    },
  ]);
};

// Permission type
const permissionType = {
  location: 'location',
};

// Location Permission
const platformLocationPermissionType = {
  ios: PERMISSIONS.IOS.LOCATION_ALWAYS,
  android: PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
};

// Request permission type
const requestPermissionType = {
  location: platformLocationPermissionType,
};

// App permission function
const appPermission = async type => {
  const permissions = requestPermissionType[type][checkPlatform()];
  if (!permissions) {
    return true;
  }
  try {
    const result = await check(permissions);
    if (result === RESULTS.GRANTED) {
      return true;
    }

    return requestPermission(permissions);
  } catch (error) {
    return false;
  }
};

// Request permission function
const requestPermission = async permissions => {
  try {
    const result = await request(permissions);

    return result === RESULTS.GRANTED;
  } catch (error) {
    return false;
  }
};

//upload image params
const uploadImageParams = uploadImage => {
  console.log("uploadImage-------", uploadImage)
  let image = uploadImage;
  if (image) {
    const imageUrl = image?.path;
    const imageName = imageUrl.split('/').pop();
    const type = image.mime;

    const imagePrams = {
      name: imageName,
      type: `${type}`,
      uri: `${imageUrl}`,
    };
    return imagePrams;
  } else {
    return '';
  }
};

const openUrl = async url => {

  try {
    if (url) {
      // const res = await Linking.canOpenURL(url);
      const res = await Linking.canOpenURL(url)
      if (res) {
        Linking.openURL(url);
      } else {

        alert('URL not supported');
      }
    } else {
      alert('URL not available');
    }
  } catch (error) {
    alert('URL not supported');
  }
};

const numberConverter = (number, decimalDigits) => {
  let newNumber = Number(number)
  try {
    newNumber = newNumber.toFixed(decimalDigits);
  } catch (e) {
    console.log("Number Convert Exection", e)
  }
  return newNumber
}

export {
  checkPlatform,
  captureImageFromCamera,
  showPopupWithOk,
  showPopupWithOkAndCancel,
  appPermission,
  permissionType,
  uploadImageParams,
  pickImageOrVideoFromGallery,
  openUrl,
  numberConverter
};
