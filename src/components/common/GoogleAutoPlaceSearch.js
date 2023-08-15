import React from 'react';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {GOOGLE_MAPS_API_KEY} from '../../common/apiconstants';
import {colors} from '../../themes';
// import Config from 'react-native-config';

navigator.geolocation = require('react-native-geolocation-service');

//Place Here Google Map Api Key
const GOOGLE_MAP_API_KEY = GOOGLE_MAPS_API_KEY;

//Google Auto Place Search Component
const GoogleAutoPlaceSearch = props => {
  const {refName, onPress, inputContainerStyle, inputStyle, placeholder} =
    props;
  return (
    <GooglePlacesAutocomplete
      ref={refName}
      placeholder={placeholder}
      minLength={2}
      onFail={error => console.error(error)}
      returnKeyType={'search'}
      autoCapitalize={'none'}
      listViewDisplayed={false}
      fetchDetails={true}
      onPress={onPress}
      query={{
        key: GOOGLE_MAP_API_KEY,
        language: 'en',
        types: 'address',
        // components: 'country:us',
      }}
      styles={{
        textInputContainer: inputContainerStyle,
        textInput: inputStyle,
        description: {
          color: colors.colorBlack,
        },
        container: {
          flex: 0,
          width: '100%',
        },
      }}
      enablePoweredByContainer={false}
      {...props}
    />
  );
};

export default GoogleAutoPlaceSearch;
