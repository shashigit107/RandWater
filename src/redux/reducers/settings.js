import {
  GET_USER_PROFILE_LOADING,
  GET_USER_PROFILE_SUCCESS,
  GET_USER_PROFILE_FAILED,
  UPDATE_USER_PROFILE_LOADING,
  UPDATE_USER_PROFILE_SUCCESS,
  UPDATE_USER_PROFILE_FAILED,
  EMAIL_US_LOADING,
  EMAIL_US_SUCCESS,
  EMAIL_US_FAILED,
  GET_REPORTS_LOADING,
  GET_REPORTS_SUCCESS,
  GET_REPORTS_FAILED,
  SEND_REPORT_LOADING,
  SEND_REPORT_SUCCESS,
  SEND_REPORT_FAILED,
  GET_STATIC_PAGES_LOADING,
  GET_STATIC_PAGES_SUCCESS,
  GET_STATIC_PAGES_FAILED,
  LOGOUT_LOADING,
  LOGOUT_SUCCESS,
  LOGOUT_FAILED,
  UNAUTHORIZED,
  CLEAR_DATA,
  CHANGE_PASSWORD_FAILED,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_LOADING,
  FORGOT_PASSWORD_FAILED,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_LOADING,
  DELETE_ACCOUNT_FAILED,
  DELETE_ACCOUNT_SUCCESS,
  DELETE_ACCOUNT_LOADING,
  SEND_NEWS_LOADING,
  SEND_NEWS_SUCCESS,
  SEND_NEWS_FAILED,
  GET_HEIGHT,
  GET_QUICK_DATA_LOAD,
  GET_QUICK_FACT_SUCCESS,
  GET_QUICK_FACT_FAILED,
  GET_NOTICATION_SUCCESS,
  GET_NOTICATION_DETAIL_SUCCESS,
  OPEN_POPUP,
  BROAD_CAST_NOTIFICATION_FLAG

} from '../types';

// Initial State
const INITIAL_STATE = {
  isLoading: false,
  actions: undefined,
  newsData: undefined,
  newsDetailHeight: 0,
  QuickFactData: [],
  notification: null,
  notificationDetail: [],
  popupFlag: false,
  broadCastFlag:[false,''],

};




export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_USER_PROFILE_LOADING:
    case UPDATE_USER_PROFILE_LOADING:
    case EMAIL_US_LOADING:
    case GET_REPORTS_LOADING:
    case SEND_REPORT_LOADING:
    case GET_STATIC_PAGES_LOADING:
    case LOGOUT_LOADING:
    case CHANGE_PASSWORD_LOADING:
    case FORGOT_PASSWORD_LOADING:
    case DELETE_ACCOUNT_LOADING:
    case SEND_NEWS_LOADING:
    case GET_QUICK_DATA_LOAD:
      return { ...state, isLoading: true };
    case GET_USER_PROFILE_SUCCESS:
    case UPDATE_USER_PROFILE_SUCCESS:
    case EMAIL_US_SUCCESS:
    case GET_REPORTS_SUCCESS:
    case SEND_REPORT_SUCCESS:
    case GET_STATIC_PAGES_SUCCESS:
    case LOGOUT_SUCCESS:
    case CHANGE_PASSWORD_SUCCESS:
    // case GET_USER_PROFILE_FAILED:
    case GET_QUICK_FACT_FAILED:
    case UPDATE_USER_PROFILE_FAILED:
    case EMAIL_US_FAILED:
    case GET_REPORTS_FAILED:
    case SEND_REPORT_FAILED:
    case GET_STATIC_PAGES_FAILED:
    case LOGOUT_FAILED:
    case UNAUTHORIZED:
    case CHANGE_PASSWORD_FAILED:
    case FORGOT_PASSWORD_FAILED:
    case FORGOT_PASSWORD_SUCCESS:
    case DELETE_ACCOUNT_FAILED:
    case DELETE_ACCOUNT_SUCCESS:
    case SEND_NEWS_FAILED:
      // case  GET_QUICK_FACT_SUCCESS:
      // case GET_QUICK_FACT_SUCCESS:
      return { ...state, isLoading: false, actions: action };
    case CLEAR_DATA:
      return { ...state, isLoading: false, actions: undefined };
    case SEND_NEWS_SUCCESS:
      // console.log("reducerData",action.payload )
      return { ...state, isLoading: false, newsData: action.payload }
    case GET_HEIGHT:
      return { ...state, newsDetailHeight: payload }
    case GET_QUICK_FACT_SUCCESS:
      return { ...state, isLoading: false, QuickFactData: action.payload }
    // case GET_QUICK_FACT_FAILED:
    //   console.log("-----------",isLoading)
    //   return {...state, isLoading:false}
    case GET_NOTICATION_SUCCESS:
      return { ...state, notification: action.payload }
    case GET_NOTICATION_DETAIL_SUCCESS:
      return { ...state, notificationDetail: action.payload }
    case OPEN_POPUP:
      console.log("action.payload",action.payload)
      return {
        ...state, popupFlag: action.payload
      }
      case BROAD_CAST_NOTIFICATION_FLAG:
        console.log("------BROAD_CAST_NOTIFICATION_FLAG",action.payload)
      return {
        ...state, broadCastFlag: action.payload
      }
    default:
      return state;
  }
};
