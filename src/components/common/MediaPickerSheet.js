//Library Imports
import React from 'react';
import {StyleSheet, View} from 'react-native';
import ActionSheet from 'react-native-actions-sheet';

//Local Imports
import {
  Camera_Blue_Icon,
  Delete_Blue_Icon,
  Gallery_Images,
  VideoGalleryIcon,
  VideoIcon,
} from '../../assets/svgs';
import {moderateScale} from '../../common/constants';
import {colors, styles} from '../../themes';
import Typography from '../../themes/typography';
import WButtonText from './WButtonText';
import WDivider from './WDivider';
import WText from './WText';

// Media Picker Sheet
const MediaPickerSheet = ({
  onTakePhoto,
  onTakeVideo,
  onChoosePhoto,
  onChooseVideo,
  onCancelPress,
  onDeletePress,
  editable = true,
  sheetRef,
  titleText,
}) => {
  // Render All Actions Button
  const RenderActionButton = ({
    title,
    onPress,
    bold = false,
    itemStyle,
    icon = null,
    titleTextStyle,
  }) => {
    return (
      <WButtonText
        title={title}
        onPress={onPress}
        containerStyle={itemStyle}
        style={{...localStyles.sheetItemText, ...titleTextStyle}}
        frontIcon={icon}
      />
    );
  };

  // All Available Options In Action Sheet
  const Options = () => {
    return (
      <View style={localStyles.sheetContainer}>
        <View style={localStyles.innerSheetContainer}>
          {/* Title Label */}
          <WText bold style={localStyles.headerText}>
            {titleText}
          </WText>
          {/* Delete Photo Option */}
          {editable && (
            <>
              <RenderActionButton
                title={'Delete Picture'}
                onPress={onDeletePress}
                itemStyle={{
                  ...localStyles.sheetItemContainer,
                  ...styles.selfStart,
                }}
                titleTextStyle={localStyles.optionTextStyle}
                icon={
                  <Delete_Blue_Icon
                    style={localStyles.iconStyle}
                    width={moderateScale(30)}
                    height={moderateScale(30)}
                  />
                }
              />
              <WDivider />
            </>
          )}
          {/* On Take Photo From Camera Option */}
          <RenderActionButton
            title={'Take A Picture'}
            onPress={onTakePhoto}
            itemStyle={{
              ...localStyles.sheetItemContainer,
              ...styles.selfStart,
            }}
            icon={
              <Camera_Blue_Icon
                style={localStyles.iconStyle}
                width={moderateScale(30)}
                height={moderateScale(30)}
              />
            }
            titleTextStyle={localStyles.optionTextStyle}
          />
          {onTakeVideo && (
            <>
              <WDivider />
              {/* Take a Video */}
              <RenderActionButton
                title={'Take A Video'}
                onPress={onTakeVideo}
                itemStyle={{
                  ...localStyles.sheetItemContainer,
                  ...styles.selfStart,
                }}
                icon={
                  <VideoIcon
                    style={localStyles.iconStyle}
                    width={moderateScale(30)}
                    height={moderateScale(30)}
                  />
                }
                titleTextStyle={localStyles.optionTextStyle}
              />
            </>
          )}

          <WDivider />
          {/* Select Photo From Gallery */}
          <RenderActionButton
            title={'Select Picture From Library'}
            onPress={onChoosePhoto}
            itemStyle={{
              ...localStyles.sheetItemContainer,
              ...styles.selfStart,
            }}
            icon={
              <Gallery_Images
                style={localStyles.iconStyle}
                width={moderateScale(30)}
                height={moderateScale(30)}
              />
            }
            titleTextStyle={localStyles.optionTextStyle}
          />
          {onChooseVideo && (
            <>
              <WDivider />
              {/* Select Video From Gallery */}
              <RenderActionButton
                title={'Select Video From Library'}
                onPress={onChooseVideo}
                itemStyle={{
                  ...localStyles.sheetItemContainer,
                  ...styles.selfStart,
                }}
                icon={
                  <VideoGalleryIcon
                    style={localStyles.iconStyle}
                    width={moderateScale(30)}
                    height={moderateScale(30)}
                  />
                }
                titleTextStyle={localStyles.optionTextStyle}
              />
            </>
          )}
        </View>
        {/* Cancel Button  */}
        <RenderActionButton
          title={'Cancel'}
          onPress={onCancelPress}
          bold
          itemStyle={{...localStyles.sheetItemContainer, ...styles.mt10}}
        />
      </View>
    );
  };
  return (
    // Main Action Sheet
    <ActionSheet ref={sheetRef} containerStyle={localStyles.mainContainer}>
      <Options />
    </ActionSheet>
  );
};

const localStyles = StyleSheet.create({
  mainContainer: {
    backgroundColor: colors.transparent,
  },
  sheetContainer: {
    backgroundColor: colors.transparent,
    ...styles.mb20,
  },
  sheetItemContainer: {
    backgroundColor: colors.colorWhite,
    marginVertical: 2,
    borderRadius: 10,
    height: moderateScale(60),
    ...styles.mh20,
  },
  sheetItemText: {
    color: colors.primary,
    fontSize: moderateScale(18),
  },
  bottomRadius0: {
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
  },
  topRadius0: {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
  innerSheetContainer: {
    backgroundColor: colors.colorWhite,
    borderRadius: moderateScale(10),
    ...styles.mh20,
  },
  optionTextStyle: {
    color: colors.colorBlack,
    ...Typography.fontWeights.MediumAvenir,
  },
  iconStyle: {
    ...styles.mr10,
  },
  headerText: {
    fontSize: moderateScale(19),
    color: colors.colorBlack,
    ...styles.mh20,
    ...styles.mt20,
    ...styles.mb10,
  },
});

export default MediaPickerSheet;
