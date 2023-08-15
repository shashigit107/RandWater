// Dev Url
// export const BASE_URL = 'http://209.182.213.242/~mobile/bulk-water/api/v1';
//Poduction Url
// export const BASE_URL = 'http://34.206.46.61/rand-water/api/v1';
// export const BASE_URL='http://rwapp.randwater.co.za/rand-water/api/v1' //new baseurl date 13 April
export const BASE_URL = 'https://rwapp.randwater.co.za/rand-water/api/v1' // new url 16 april

//QA Url
// export const BASE_URL = 'http://209.182.213.242/~mobile/bulk-water/api/v1';

export const CONNECT_SCREEN = 'http://customerservice.randwater.co.za:85';
export const GOOGLE_MAPS_API_KEY = 'AIzaSyAmf8hjqHLij5BNCAZef6Ge3Dilc3P8xIg';
// export const GOOGLE_MAPS_API_KEY = 'AIzaSyDblARQFmBoYXcP8_G82aUCEG_CcpxVR1Q';
// export const GOOGLE_MAPS_API_KEY = 'AIzaSyDJaIUowgKlqKVFM_BU8b7Yt-ZL-Q34g4Q';


// http://rwapp.randwater.co.za/rand-water/api/v1/user/login
// Auth Api Endpoints
export const LOGIN = BASE_URL + '/user/login';// working
export const SOCIAL_LOGIN = BASE_URL + '/user/social-login';// not used in code
export const GUEST_LOGIN = BASE_URL + '/guest-user/login';// not used in code
export const REGISTRATION = BASE_URL + '/user/registration';// working
export const UPDATE_USER_DETAIL = BASE_URL + '/user/update';//working
export const USER_DETAIL = BASE_URL + '/user/detail';// working
export const GET_REPORTS = BASE_URL + '/my-incident';// working
export const ADD_INCIDENT = BASE_URL + '/add-incident';//working
export const GET_STATIC_PAGE = BASE_URL + '/get-static-page';// working
export const CONTACT_US = BASE_URL + '/contact_us';// not working
export const LOGOUT = BASE_URL + '/logout';// working
export const CHANGE_PASSWORD = BASE_URL + '/change-password';//Working
export const FORGOT_PASSWORD = BASE_URL + '/forgot-passoword';// not working
export const DELETE_ACCOUNT = BASE_URL + '/delete-account';// working
export const GET_NEWS_DATA = BASE_URL + '/news-articles'
export const GET_QUICK_FACT_DATA = BASE_URL + '/quick-facts'
export const GET_NOTICATION_COUNT = BASE_URL + '/home-data'
export const GET_NOTICATION = BASE_URL + '/user-notifications'
export const CHECK_VERSION = BASE_URL + '/check-version'
