//Library Imports
import React from 'react';
import {StyleSheet, View, TextInput} from 'react-native';

//Local Imports
import {getWidth, moderateScale} from '../../common/constants';
import {colors, styles} from '../../themes';
import Typography from '../../themes/typography';
import WText from './WText';

const WInput = props => {
  let {
    _value,
    label,
    inputContainerStyle,
    inputBoxStyle,
    toGetTextFieldValue,
    placeHolder,
    rightAccessory,
    keyBoardType,
    _onFocus,
    _errorText,
    errorStyle,
    _isSecure,
    fieldRef,
    _maxLength,
    _editable = true,
    autoCapitalize,
    required = false,
    labelStyle,
    multiLine,
  } = props;

  // Change Text Input Value
  const onChangeText = val => {
    toGetTextFieldValue(val);
  };
  fieldRef = React.createRef();

  return (
    <>
      {label && (
        <View style={[localStyle.labelContainer, labelStyle]}>
          <View style={styles.flexRow}>
            {/* Input Label  */}
            <WText style={localStyle.labelText}>{label}</WText>
            {/* If Input is Required */}
            {required && <WText style={localStyle.starSymbol}>{' *'}</WText>}
          </View>
          {/* Error Text Message Of Input */}
          <WText style={{...localStyle.errorText, ...errorStyle}}>
            {_errorText}
          </WText>
        </View>
      )}
      {/* Main Input Container */}
      <View
        style={[
          localStyle.inputContainer,
          {borderColor: _errorText ? colors.colorRed : colors.transparent},
          inputContainerStyle,
        ]}>
        <TextInput
          ref={fieldRef.current}
          secureTextEntry={_isSecure}
          value={_value}
          maxLength={_maxLength}
          defaultValue={_value}
          autoCorrect={false}
          autoCapitalize={autoCapitalize}
          placeholderTextColor={colors.placeHolder}
          onChangeText={onChangeText}
          keyboardType={keyBoardType}
          multiline={multiLine}
          editable={_editable}
          onFocus={_onFocus}
          placeholder={placeHolder}
          style={[
            localStyle.inputBox,
            inputBoxStyle,
            // eslint-disable-next-line react-native/no-inline-styles
            {
              fontFamily: _value
                ? Typography.fontWeights.Bold.fontFamily
                : Typography.fontWeights.Regular.fontFamily,
            },
          ]}
          {...props}
        />

        {/* Right Icon And Content Inside TextInput */}
        <View style={styles.mr15}>
          {rightAccessory ? rightAccessory() : null}
        </View>
      </View>
      {_errorText && (
        <WText style={{...localStyle.errorText, ...errorStyle}}>
          {_errorText}
        </WText>
      )}
    </>
  );
};

const localStyle = StyleSheet.create({
  labelText: {
    color: colors.colorWhite,
    textAlign: 'left',
    ...Typography.fontWeights.Regular,
    fontSize: moderateScale(14),
  },
  textOption: {
    fontSize: moderateScale(14),
  },
  inputBox: {
    height: moderateScale(50),
    width: '85%',
    fontSize: moderateScale(16),
    ...styles.ph20,
  },
  inputContainer: {
    borderWidth: moderateScale(1.5),
    borderRadius: 12,
    height: moderateScale(50),
    ...styles.rowSpaceBetween,
    ...styles.mt10,
    backgroundColor: 'rgba(255,255,255,0.6)',
  },
  labelContainer: {
    ...styles.mt20,
    ...styles.rowSpaceBetween,
  },
  errorText: {
    color: colors.colorRed,
    fontSize: moderateScale(12),
    ...Typography.fontWeights.Regular,
    ...styles.ml10,
    ...styles.mt5,
    width: getWidth(310),
  },
  starSymbol: {
    color: colors.colorRed,
  },
});

export default WInput;
