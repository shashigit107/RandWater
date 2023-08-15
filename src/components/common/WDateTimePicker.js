import React from 'react';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const WDateTimePicker = props => {
  const {isVisible, mode, onConfirm, onCancel} = props;
  return (
    <DateTimePickerModal
      isVisible={isVisible}
      mode={mode}
      onConfirm={onConfirm}
      onCancel={onCancel}
      {...props}
    />
  );
};

export default WDateTimePicker;
