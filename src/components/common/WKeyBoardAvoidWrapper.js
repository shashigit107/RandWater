//Library Imports
import React from 'react';
import {KeyboardAvoidingView, ScrollView} from 'react-native';
import {styles} from '../../themes';
import {checkPlatform} from '../../utils/helpers';

//Local imports

// KeyboardAvoidWrapper Component
const WKeyBoardAvoidWrapper = ({children}) => {
  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={checkPlatform() === 'ios' ? 20 : null}
      style={styles.flex}
      behavior={checkPlatform() === 'ios' ? 'padding' : null}>
      <ScrollView
        nestedScrollEnabled={true}
        showsVerticalScrollIndicator={false}>
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default WKeyBoardAvoidWrapper;
