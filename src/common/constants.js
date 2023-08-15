import {Dimensions, Platform, StatusBar} from 'react-native';
import DeviceInfo from 'react-native-device-info';

let iPhoneX = screenHeight === 812 ? true : false;

// StatusBar Height
export const STATUSBAR_HEIGHT =
  Platform.OS === 'ios' ? (iPhoneX ? 44 : 22) : StatusBar.currentHeight;
export const screenHeight = Dimensions.get('window').height - STATUSBAR_HEIGHT;
export const screenWidth = Dimensions.get('window').width;
export const isAndroid = Platform.OS === 'ios' ? false : true;

let sampleHeight = 812;
let sampleWidth = 375;

export const isShowLog = true;

// Check if device is Tablet
export const isTablet = () => {
  return DeviceInfo.isTablet();
};

//Get Width of Screen
export function getWidth(value) {
  return (value / sampleWidth) * screenWidth;
}

//Get Height of Screen
export function getHeight(value) {
  return (value / sampleHeight) * screenHeight;
}
const scale = size => (screenWidth / sampleWidth) * size;

// Moderate Scale Function
export function moderateScale(size, factor = 0.5) {
  return size + (scale(size) - size) * factor;
}

//Api request Response Codes
export const responseCodes = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  CONFLICT: 409,
  BED_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  REQUEST_TIME_OUT: 408,
  UNPROCESSED_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
  NOT_IMPLEMENTED: 501,
  BED_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATE_WAY_TIMEOUT: 504,
  NETWORK_AUTH_REQUIRED: 511,
  NETWORK_UNREACHABLE: 512,
  REDIRECT: 302,
  NOT_ACCEPTABLE: 406,
};

//Static Strings
export const SOMETHING_WENT_WRONG = 'Something went wrong';
export const INCORRECT_PASSWORD = 'Incorrect current password';
export const INCORRECT_MOBILE = 'Incorrect mobile';
export const INCORRECT_EMAIL = 'Incorrect email';
export const INCORRECT_OTP = 'Incorrect otp';
export const OTP_EXPIRED = 'jwt expired';
export const EMAIL = 'email';
export const MOBILE = 'mobile';

//Async Storage Keys
export const ASYNC_LOGOUT_RESPONSE = 'ASYNC_LOGOUT_RESPONSE';
export const ACCESS_TOKENS = 'ACCESS_TOKENS';
export const USER = 'USER';
export const SIGNUP_DATA = 'SIGNUP_DATA';
export const APP_OPEN = 'APP_OPEN';
export const CAMERA_PERMISSION = 'CAMERA_PERMISSION';
