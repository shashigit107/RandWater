import React, {useState, createRef, useEffect} from 'react';
import {View, SafeAreaView, StyleSheet, Pressable} from 'react-native';
import {colors, styles} from '../../themes';
import WHeader from '../../components/common/WHeader';
import FastImage from 'react-native-fast-image';
import images from '../../assets/images';
import {ProfileEditIcon, ProfileImage} from '../../assets/svgs';
import {moderateScale} from '../../common/constants';
import WInput from '../../components/common/WInput';
import WButtonText from '../../components/common/WButtonText';
import {
  validateEmail,
  validateMobile,
  validateName,
} from '../../utils/validators';
import MediaPickerSheet from '../../components/common/MediaPickerSheet';
import ImageCropPicker from 'react-native-image-crop-picker';
import {useDispatch, useSelector} from 'react-redux';
import {showPopupWithOk, uploadImageParams} from '../../utils/helpers';
import strings from '../../i18n/strings';
import {
  GET_USER_PROFILE_FAILED,
  GET_USER_PROFILE_SUCCESS,
  UPDATE_USER_PROFILE_SUCCESS,
  UPDATE_USER_PROFILE_FAILED,
  UNAUTHORIZED,
} from '../../redux/types';
import {
  clearSettingsData,
  getUserProfile,
  updateUserProfile,
} from '../../redux/actions/settingsAction';
import WLoader from '../../components/common/WLoader';
import Typography from '../../themes/typography';
import WText from '../../components/common/WText';
import WKeyBoardAvoidWrapper from '../../components/common/WKeyBoardAvoidWrapper';

const EditProfile = ({navigation}) => {
  const settings = useSelector(state => state.settings);
  const dispatch = useDispatch();
  const mediaSheetRef = createRef();

  //Loading State
  let isLoading = settings && settings.isLoading;

  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phoneNum, setPhoneNum] = React.useState('');
  const [profileImage, setProfileImage] = useState('');
  const [existingImg, setExistingImg] = useState('');
  const [isEdit, setIsEdit] = useState(false);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  //Error State
  const [nameErr, setNameErr] = useState('');
  const [emailErr, setEmailErr] = useState('');
  const [phoneNumErr, setPhoneNumErr] = useState('');
  const {notification}= useSelector(state=>state.settings)

  useEffect(() => {
    if (
      email.length > 0 &&
      name.length > 0 &&
      phoneNum.length > 0 &&
      !nameErr &&
      !emailErr &&
      !phoneNumErr
    ) {
      setIsSubmitDisabled(false);
    } else {
      setIsSubmitDisabled(true);
    }
  }, [email, name, phoneNum, nameErr, emailErr, phoneNumErr]);

  useEffect(() => {
    dispatch(getUserProfile());
  }, []);

  useEffect(() => {
    let {actions} = settings;
    if (actions) {
      let {type, message, data} = actions;
      if (
        type === GET_USER_PROFILE_FAILED ||
        type === UPDATE_USER_PROFILE_FAILED
      ) {
        //Show Popup Message Of Error
        showPopupWithOk(strings.randWater, message);
        //Clear settings Data
        dispatch(clearSettingsData());
      } else if (type === GET_USER_PROFILE_SUCCESS) {
        setName(data?.data?.first_name || '');
        setEmail(data?.data?.email || '');
        if (!!data?.data?.mobile_number) {
          setPhoneNum(String(data?.data?.mobile_number));
        }
        if (!!data?.data?.profile_picture) {
          setExistingImg(data?.data?.profile_picture);
          setIsEdit(true);
        }
        //do something for success
        dispatch(clearSettingsData());
      } else if (type === UPDATE_USER_PROFILE_SUCCESS) {
        showPopupWithOk(strings.randWater, data.message, () =>
          navigation.goBack(),
        );
        //do something for success
        dispatch(clearSettingsData());
      } else if (type === UNAUTHORIZED) {
        //Show Error Message For Unauthorized
        showPopupWithOk(strings.randWater, message);
        //Clear settings Data
        dispatch(clearSettingsData());
      }
    }
  }, [settings]);

  //on Press Upload Button
  const onPressUpload = () => {
    mediaSheetRef.current.show();
  };
  //on Press Cancel Button
  const onPressCancel = () => {
    mediaSheetRef.current.hide();
  };

  //on Press Delete Button
  const onPressDelete = () => {
    mediaSheetRef.current.hide();
    setProfileImage('');
    setExistingImg('');
    setIsEdit(false);
  };

  //Name validation
  const handleName = val => {
    const {msg} = validateName(val.trim());
    setName(val);
    setNameErr(msg);
  };

  //Email validation
  const handleEmail = val => {
    const {msg} = validateEmail(val.trim());
    setEmail(val.trim());
    setEmailErr(msg);
  };

  //Mobile Number validation
  const handlePhone = val => {
    const {msg} = validateMobile(val.trim());
    setPhoneNum(val.trim());
    setPhoneNumErr(msg);
  };

  //Open Camera
  const onTakePhotoPress = async () => {
    mediaSheetRef.current.hide();
    setTimeout(() => {
      ImageCropPicker.openCamera({
        width: 300,
        height: 400,
        cropping: false,
      })
        .then(image => {
          setProfileImage(image);
          setExistingImg('');
          setIsEdit(true);
        })
        .catch(err => console.log(err));
    }, 500);
  };

  //Open Gallery
  const onChoosePress = () => {
    mediaSheetRef.current.hide();
    setTimeout(() => {
      ImageCropPicker.openPicker({
        width: 300,
        height: 400,
        cropping: false,
        mediaType: 'photo',
      })
        .then(image => {
          setProfileImage(image);
          setExistingImg('');
          setIsEdit(true);
        })
        .catch(err => console.log(err));
    }, 500);
  };

  const onPressUpdate = () => {
    const params = {
      first_name: name,
      email: email,
      mobile_number: phoneNum,
      image: uploadImageParams(profileImage),
    };
    if (existingImg) {
      delete params.image;
    }
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
    dispatch(updateUserProfile(formdata));
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <WHeader title={'My Profile'} close />
      <FastImage source={images.tutorial1} style={localStyles.innerContainer}>
        <WKeyBoardAvoidWrapper>
          <View style={localStyles.imageContainer}>
            {existingImg || profileImage?.path?.length ? (
              <FastImage
                source={{uri: existingImg || profileImage.path}}
                style={localStyles.imageContainer}
              />
            ) : (
              <ProfileImage
                height={moderateScale(100)}
                width={moderateScale(100)}
              />
            )}
            <Pressable style={localStyles.cameraIcon} onPress={onPressUpload}>
              <ProfileEditIcon />
            </Pressable>
            
            
          </View>
          <View style={{flexDirection:'row',justifyContent:'center', alignItems:"center", paddingTop:10}}>
          <WText type={'MA16'}>{"Awarded Point : "}</WText>
          <WText type={'PB20'} style={{color:'#082c67'}}>{notification?.data?.awarded_points}</WText>
          </View>
          
          <View style={localStyles.formContainer}>
            <WInput
              placeHolder={'Name & Surname'}
              keyBoardType={'default'}
              _errorText={nameErr}
              autoCapitalize={'none'}
              _value={name}
              toGetTextFieldValue={val => handleName(val)}
              inputContainerStyle={localStyles.inputContainer}
            />
            <WInput
              placeHolder={'Cellphone number'}
              keyBoardType={'number-pad'}
              _errorText={phoneNumErr}
              returnKeyType="done"
              _value={phoneNum}
              toGetTextFieldValue={val => handlePhone(val)}
              inputContainerStyle={localStyles.inputContainer}
            />
            <WInput
              placeHolder={'Email address'}
              keyBoardType={'email-address'}
              _errorText={emailErr}
              autoCapitalize={'none'}
              _value={email}
              toGetTextFieldValue={val => handleEmail(val)}
              inputContainerStyle={localStyles.inputContainer}
            />
            <WButtonText
              title={'UPDATE'}
              containerStyle={{
                ...localStyles.updateButton,
                backgroundColor: isSubmitDisabled
                  ? 'rgba(255, 255, 255, 0.3)'
                  : colors.colorWhite,
              }}
              style={localStyles.updateButtonText}
              onPress={onPressUpdate}
              disabled={isSubmitDisabled}
            />
          </View>
          <View style={{height: moderateScale(110)}} />
        </WKeyBoardAvoidWrapper>
      </FastImage>
      {/* Bottom Sheet Activity of Image choose open when Press Upload */}
      <MediaPickerSheet
        sheetRef={mediaSheetRef}
        onTakePhoto={onTakePhotoPress}
        onChoosePhoto={onChoosePress}
        onCancelPress={onPressCancel}
        onDeletePress={onPressDelete}
        editable={isEdit}
        titleText={'Change Profile Picture'}
      />
      {isLoading && <WLoader />}
    </SafeAreaView>
  );
};

const localStyles = StyleSheet.create({
  innerContainer: {
    ...styles.flex,
    ...styles.pt20,
  },
  imageContainer: {
    height: moderateScale(100),
    width: moderateScale(100),
    borderRadius: moderateScale(50),
    ...styles.columnCenter,
    ...styles.selfCenter,
    position: 'relative',
  },
  cameraIcon: {
    position: 'absolute',
    bottom: moderateScale(-20),
    right: moderateScale(-20),
  },
  updateButton: {
    backgroundColor: colors.colorWhite,
    borderRadius: moderateScale(24),
    ...styles.mt50,
  },
  updateButtonText: {
    ...Typography.fontSizes.f16,
    ...Typography.fontWeights.MediumAvenir,
    color: colors.placeHolder,
  },
  formContainer: {
    ...styles.mh20,
    ...styles.mt20,
  },
});

export default EditProfile;
