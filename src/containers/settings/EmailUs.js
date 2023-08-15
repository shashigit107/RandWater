import React, {useState, useEffect, createRef} from 'react';
import {View, SafeAreaView, StyleSheet} from 'react-native';
import WHeader from '../../components/common/WHeader';
import FastImage from 'react-native-fast-image';
import images from '../../assets/images';
import {colors, styles} from '../../themes';
import WInput from '../../components/common/WInput';
import {getHeight, moderateScale} from '../../common/constants';
import WButtonText from '../../components/common/WButtonText';
import WText from '../../components/common/WText';
import {
  validateEmail,
  validateName,
  validateMobile,
  validateWriteHere,
} from '../../utils/validators';
import Typography from '../../themes/typography';
import {Camera} from '../../assets/svgs';
import WKeyBoardAvoidWrapper from '../../components/common/WKeyBoardAvoidWrapper';
import {useDispatch, useSelector} from 'react-redux';
import {
  EMAIL_US_FAILED,
  EMAIL_US_SUCCESS,
  UNAUTHORIZED,
} from '../../redux/types';
import {showPopupWithOk, uploadImageParams} from '../../utils/helpers';
import {clearSettingsData, emailUs} from '../../redux/actions/settingsAction';
import strings from '../../i18n/strings';
import WLoader from '../../components/common/WLoader';
import MediaPickerSheet from '../../components/common/MediaPickerSheet';
import ImageCropPicker from 'react-native-image-crop-picker';
import {getUserProfile} from '../../redux/actions/settingsAction';
import {
  GET_USER_PROFILE_FAILED,
  GET_USER_PROFILE_SUCCESS,
  UPDATE_USER_PROFILE_SUCCESS,
  UPDATE_USER_PROFILE_FAILED,
} from '../../redux/types';
const EmailUs = ({navigation}) => {
  const settings = useSelector(state => state.settings);
  const dispatch = useDispatch();
  const mediaSheetRef = createRef();
  useEffect(() => {
    dispatch(getUserProfile());
  }, []);

  useEffect(() => {
    let {actions} = settings;
    if (actions) {
      let {type, message, data} = actions;
      if (type === GET_USER_PROFILE_FAILED) {
        //Show Popup Message Of Error
        showPopupWithOk(strings.randWater, message);
        //Clear settings Data
        dispatch(clearSettingsData());
      } else if (type === GET_USER_PROFILE_SUCCESS) {
        setName(data?.data?.first_name || '');
        setEmail(data?.data?.email || '');
        if (!!data?.data?.mobile_number) {
          setPhoneNum(String(data?.data?.mobile_number));
          setIsCellPhone(false);
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
  //Loading State
  let isLoading = settings && settings.isLoading;

  const [name, setName] = React.useState('');
  const [subject, setSubject] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [profileImage, setProfileImage] = useState('');
  const [isEdit, setIsEdit] = useState(false);
  const [phoneNum, setPhoneNum] = React.useState('');
  const [isCellPhone, setIsCellPhone] = useState(true);
  //Error State
  const [nameErr, setNameErr] = useState('');
  const [emailErr, setEmailErr] = useState('');
  const [messageErr, setMessageErr] = useState('');
  const [phoneNumErr, setPhoneNumErr] = useState('');
  useEffect(() => {
    if (
      name.length > 0 &&
      email.length > 0 &&
      !nameErr &&
      !emailErr &&
      phoneNum.length == 10 &&
      !phoneNumErr
    ) {
      setIsSubmitDisabled(false);
    } else {
      setIsSubmitDisabled(true);
    }
  }, [name, email, nameErr, emailErr, phoneNum, phoneNumErr]);

  useEffect(() => {
    let {actions} = settings;
    if (actions) {
      let {type, message, data} = actions;
      if (type === EMAIL_US_FAILED) {
        //Show Popup Message Of Error
        showPopupWithOk(strings.randWater, message);
        //Clear Login Data
        dispatch(clearSettingsData());
      } else if (type === EMAIL_US_SUCCESS) {
        showPopupWithOk(strings.randWater, 'Email Send Successfully.', () =>
          navigation.goBack(),
        );
        //do something for success
        dispatch(clearSettingsData());
      } else if (type === UNAUTHORIZED) {
        //Show Error Message For Unauthorized
        showPopupWithOk(strings.randWater, message);
        //Clear Login Data
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
          setIsEdit(true);
        })
        .catch(err => console.log(err));
    }, 500);
  };

  //Name validation
  const handleName = val => {
    const {msg} = validateName(val);
    setName(val);
    setNameErr(msg);
  };

  //Handle Subject
  const handleSubject = val => {
    setSubject(val);
  };

  //Email validation
  const handleEmail = val => {
    const {msg} = validateEmail(val);
    setEmail(val);
    setEmailErr(msg);
  };

  const handleMessage = val => {
    const {msg} = validateWriteHere(val);
    setMessage(val);
    setMessageErr(msg);
  };

  //Mobile Number validation
  const handlePhone = val => {
    const {msg} = validateMobile(val.trim());
    setPhoneNum(val.trim());
    setPhoneNumErr(msg);
  };

  const onPressSend = () => {
    let message1 = message.replace(/\n/g, '<br>');
    console.log('message=', message1);
    const params = {
      name: name,
      email: email,
      mobile_number: phoneNum,
      note: message1,
      subject: subject,
      mobile_number: phoneNum,
      image: uploadImageParams(profileImage),
    };
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
    dispatch(emailUs(formdata));
  };

  //on Press Delete Button
  const onPressDelete = () => {
    mediaSheetRef.current.hide();
    setProfileImage('');
    setIsEdit(false);
  };

  const onPressAddPhoto = () => {
    console.log('onPressAddPhoto');
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <WHeader title={'Email Us'} close />
      <FastImage source={images.tutorial1} style={localStyles.innerContainer}>
        <WKeyBoardAvoidWrapper>
          <View style={localStyles.formContainer}>
            <WInput
              placeHolder={'Name*'}
              placeholderTextColor={colors.colorBlack}
              keyBoardType={'default'}
              _errorText={nameErr}
              autoCapitalize={'none'}
              _value={name}
              toGetTextFieldValue={val => handleName(val)}
              inputContainerStyle={localStyles.inputContainer}
              inputBoxStyle={localStyles.inputBoxStyle}
              _editable={false}
            />
            <WInput
              placeHolder={'Subject'}
              placeholderTextColor={colors.colorBlack}
              keyBoardType={'default'}
              // _errorText={nameErr}
              autoCapitalize={'none'}
              _value={subject}
              toGetTextFieldValue={val => handleSubject(val)}
              inputContainerStyle={localStyles.inputContainer}
              inputBoxStyle={localStyles.inputBoxStyle}
            />
            <WInput
              placeHolder={'Cellphone number *'}
              placeholderTextColor={colors.colorBlack}
              keyBoardType={'number-pad'}
              _errorText={phoneNumErr}
              returnKeyType="done"
              _value={phoneNum}
              toGetTextFieldValue={val => handlePhone(val)}
              inputContainerStyle={localStyles.inputContainer}
              inputBoxStyle={localStyles.inputBoxStyle}
              _editable={isCellPhone}
            />
            <WInput
              placeHolder={'Email Address*'}
              placeholderTextColor={colors.colorBlack}
              keyBoardType={'email-address'}
              autoCapitalize={'none'}
              _errorText={emailErr}
              _value={email}
              toGetTextFieldValue={val => handleEmail(val)}
              inputContainerStyle={localStyles.inputContainer}
              inputBoxStyle={localStyles.inputBoxStyle}
              _editable={false}
            />
            <WInput
              placeHolder={'What can we help with?'}
              placeholderTextColor={colors.colorBlack}
              keyBoardType={'default'}
              autoCapitalize
              _value={message}
              toGetTextFieldValue={val => handleMessage(val)}
              inputContainerStyle={localStyles.detailsInputContainer}
              inputBoxStyle={{
                textAlignVertical: 'top',
                height: moderateScale(80),
                width: '100%',
              }}
              // inputBoxStyle={{color: colors.colorWhite}}
              multiline={true}
            />
            <View style={styles.mt10}>
              {profileImage?.path?.length ? (
                <FastImage
                  source={{uri: profileImage.path}}
                  style={localStyles.imageContainer}
                />
              ) : null}
            </View>
            <WButtonText
              title={'Add Photo'}
              containerStyle={localStyles.addPhoto}
              style={localStyles.addPhotoBtnText}
              onPress={onPressUpload}
              frontIcon={<Camera style={localStyles.cameraIcon} />}
            />
            <WButtonText
              title={'Send'}
              containerStyle={{
                ...localStyles.sendButton,
                backgroundColor: isSubmitDisabled
                  ? 'rgba(255, 255, 255, 0.3)'
                  : colors.colorWhite,
              }}
              style={localStyles.sendBtnText}
              onPress={onPressSend}
              disabled={isSubmitDisabled}
            />
            <WText
              type={'MA16'}
              color={colors.colorWhite}
              style={localStyles.requiredText}>
              {'*Required fields'}
            </WText>
          </View>
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
        titleText={'Add Photo'}
      />
      {isLoading && <WLoader />}
    </SafeAreaView>
  );
};

const localStyles = StyleSheet.create({
  innerContainer: {
    ...styles.flex,
    ...styles.pt20,
    ...styles.ph20,
    ...styles.itemsCenter,
  },
  inputContainer: {
    marginTop: getHeight(20),
  },
  addPhoto: {
    backgroundColor: colors.placeHolder,
    borderRadius: moderateScale(24),
    ...styles.mt20,
  },
  addPhotoBtnText: {
    color: colors.colorWhite,
    ...Typography.fontWeights.MediumAvenir,
    ...Typography.fontSizes.f16,
  },
  sendButton: {
    backgroundColor: colors.colorWhite,
    borderRadius: moderateScale(24),
    ...styles.mt20,
  },
  sendBtnText: {
    color: colors.placeHolder,
    ...Typography.fontWeights.MediumAvenir,
    ...Typography.fontSizes.f16,
  },
  formContainer: {
    marginTop: getHeight(20),
    ...styles.mb20,
  },
  detailsInputContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    height: moderateScale(89),
    ...styles.mt15,
  },
  requiredText: {
    textAlign: 'center',
    ...styles.mt15,
    marginBottom: moderateScale(120),
  },
  cameraIcon: {
    ...styles.mh10,
  },
  imageContainer: {
    height: moderateScale(100),
    width: moderateScale(100),
    ...styles.columnCenter,
    ...styles.selfCenter,
  },
  inputBoxStyle: {
    width: '100%',
    color: colors.colorBlack,
  },
});

export default EmailUs;
