import ApiHelper from '../../api/APIHelper';
import { responseCodes } from '../../common/constants';
import strings from '../../i18n/strings';
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
  SEND_NEWS_FAILED,
  SEND_NEWS_SUCCESS,
  SEND_NEWS_LOADING,
  GET_HEIGHT,
  GET_QUICK_FACT_DATA,
  GET_QUICK_DATA_LOAD,
  GET_QUICK_FACT_SUCCESS,
  GET_QUICK_FACT_FAILED,
  GET_NOTICATION_SUCCESS,
  GET_NOTICATION_FAILED,
  GET_NOTICATION_DETAIL_SUCCESS,
  GET_NOTICATION_DETAIL_FAILED,
  OPEN_POPUP,
  BROAD_CAST_NOTIFICATION_FLAG
} from '../types';

const TAG = 'settingsAction := ';
//GETQUICKFACT
// function getQuickFactData=(){
function getQuickFactsData() {
  console.log(TAG);
  console.log('getUserProfile:>>');
  return async function (dispatch) {
    dispatch({ type: GET_QUICK_DATA_LOAD });
    try {
      let response, responseJson;
      ApiHelper.getQuickFactData(
        responseValue => {
          console.log("check-userProfileApi")
          response = responseValue[0];
          responseJson = responseValue[1];
          switch (response.status) {
            case responseCodes.OK:
              dispatch({ type: GET_QUICK_FACT_SUCCESS, payload: responseJson });
              break;
            case responseCodes.UNAUTHORIZED:
              dispatch({
                type: UNAUTHORIZED,
                message: responseJson.message,
              });
              break;
            default:
              dispatch({
                type: GET_QUICK_FACT_FAILED,
                message: responseJson.message,
              });
          }
        },
        error => {
          console.log('onError:>>', error);
          dispatch({
            type: GET_QUICK_FACT_FAILED,
            message: strings.SOMETHING_WENT_WRONG,
          });
        },
      );
    } catch (e) {
      console.log('err:>>', e);
      dispatch({
        type: GET_QUICK_FACT_FAILED,
        message: strings.SOMETHING_WENT_WRONG,
      });
    }
  };
}

// }
const getNotificationcount = () => {
  console.log(TAG);
  console.log('getUserProfile:>>');
  return async function (dispatch) {
    // dispatch({type:GET_QUICK_DATA_LOAD});
    try {
      let response, responseJson;
      ApiHelper.getNotificationcount(
        responseValue => {
          console.log("check-userProfileApi")
          response = responseValue[0];
          responseJson = responseValue[1];
          console.log("responseJson=====noticication", responseJson)
          switch (response.status) {
            case responseCodes.OK:
              dispatch({ type: GET_NOTICATION_SUCCESS, payload: responseJson });
              break;
            case responseCodes.UNAUTHORIZED:
              dispatch({
                type: UNAUTHORIZED,
                message: responseJson.message,
              });
              break;
            default:
              dispatch({
                type: GET_NOTICATION_FAILED,
                message: responseJson.message,
              });
          }
        },
        error => {
          console.log('onError:>>', error);
          dispatch({
            type: GET_NOTICATION_FAILED,
            message: strings.SOMETHING_WENT_WRONG,
          });
        },
      );
    } catch (e) {
      console.log('err:>>', e);
      dispatch({
        type: GET_NOTICATION_FAILED,
        message: strings.SOMETHING_WENT_WRONG,
      });
    }
  };
}

const getNotification = () => {
  // console.log(TAG);
  console.log('getUserProfile:>>');
  return async function (dispatch) {
    // dispatch({type:GET_QUICK_DATA_LOAD});
    try {
      let response, responseJson;
      ApiHelper.getNotification(
        responseValue => {
          console.log("check-userProfileApi")
          response = responseValue[0];
          responseJson = responseValue[1];
          // console.log("responseJson=====noticication2", responseJson)
          switch (response.status) {
            case responseCodes.OK:
              dispatch({ type: GET_NOTICATION_DETAIL_SUCCESS, payload: responseJson });
              break;
            case responseCodes.UNAUTHORIZED:
              dispatch({
                type: UNAUTHORIZED,
                message: responseJson.message,
              });
              break;
            default:
              dispatch({
                type: GET_NOTICATION_DETAIL_FAILED,
                message: responseJson.message,
              });
          }
        },
        error => {
          console.log('onError:>>', error);
          dispatch({
            type: GET_NOTICATION_DETAIL_FAILED,
            message: strings.SOMETHING_WENT_WRONG,
          });
        },
      );
    } catch (e) {
      console.log('err:>>', e);
      dispatch({
        type: GET_NOTICATION_DETAIL_FAILED,
        message: strings.SOMETHING_WENT_WRONG,
      });
    }
  };
}



//Get User Profile
function getUserProfile() {
  console.log(TAG);
  console.log('getUserProfile:>>');
  return async function (dispatch) {
    dispatch({ type: GET_USER_PROFILE_LOADING });
    try {
      let response, responseJson;
      ApiHelper.getUserProfile(
        responseValue => {
          console.log("check-userProfileApi")
          response = responseValue[0];
          responseJson = responseValue[1];
          switch (response.status) {
            case responseCodes.OK:
              dispatch({ type: GET_USER_PROFILE_SUCCESS, data: responseJson });
              break;
            case responseCodes.UNAUTHORIZED:
              dispatch({
                type: UNAUTHORIZED,
                message: responseJson.message,
              });
              break;
            default:
              dispatch({
                type: GET_USER_PROFILE_FAILED,
                message: responseJson.message,
              });
          }
        },
        error => {
          console.log('onError:>>', error);
          dispatch({
            type: GET_USER_PROFILE_FAILED,
            message: strings.SOMETHING_WENT_WRONG,
          });
        },
      );
    } catch (e) {
      console.log('err:>>', e);
      dispatch({
        type: GET_USER_PROFILE_FAILED,
        message: strings.SOMETHING_WENT_WRONG,
      });
    }
  };
}
// news
function getHeight(data) {
  return async function (dispatch) {
    dispatch({ type: GET_HEIGHT, payload: data })
  }

}
function getNews() {
  console.log(TAG);
  console.log('step2');
  return async function (dispatch) {
    dispatch({ type: SEND_NEWS_LOADING });
    try {
      let response, responseJson;
      ApiHelper.getNewsData(

        responseValue => {
          console.log("newsData", responseValue)
          response = responseValue[0];
          responseJson = responseValue[1];
          switch (response.status) {
            case responseCodes.OK:
              dispatch({ type: SEND_NEWS_SUCCESS, payload: responseJson });
              break;
            case responseCodes.UNAUTHORIZED:
              dispatch({
                type: UNAUTHORIZED,
                message: responseJson.message,
              });
              break;
            default:
              dispatch({
                type: SEND_NEWS_FAILED,
                message: responseJson.message,
              });
          }
        },
        error => {
          console.log('onError:>>', error);
          dispatch({
            type: SEND_NEWS_FAILED,
            message: strings.SOMETHING_WENT_WRONG,
          });
        },
      );
    } catch (e) {
      console.log('err:>>', e);
      dispatch({
        type: SEND_NEWS_FAILED,
        message: strings.SOMETHING_WENT_WRONG,
      });
    }
  };
}

//Update User Profile
function updateUserProfile(params) {
  console.log(TAG);
  console.log('updateUserProfile:>>', params);
  return async function (dispatch) {
    dispatch({ type: UPDATE_USER_PROFILE_LOADING });
    try {
      let response, responseJson;
      ApiHelper.updateUserProfile(
        params,
        responseValue => {
          response = responseValue[0];
          responseJson = responseValue[1];
          switch (response.status) {
            case responseCodes.OK:
              dispatch({ type: UPDATE_USER_PROFILE_SUCCESS, data: responseJson });
              break;
            case responseCodes.UNAUTHORIZED:
              dispatch({
                type: UNAUTHORIZED,
                message: responseJson.message,
              });
              break;
            default:
              dispatch({
                type: UPDATE_USER_PROFILE_FAILED,
                message: responseJson.message,
              });
          }
        },
        error => {
          console.log('onError:>>', error);
          dispatch({
            type: UPDATE_USER_PROFILE_FAILED,
            message: strings.SOMETHING_WENT_WRONG,
          });
        },
      );
    } catch (e) {
      console.log('err:>>', e);
      dispatch({
        type: UPDATE_USER_PROFILE_FAILED,
        message: strings.SOMETHING_WENT_WRONG,
      });
    }
  };
}

//Send Email US
function emailUs(params) {
  console.log(TAG);
  console.log('api get in touch=====', params);
  return async function (dispatch) {
    dispatch({ type: EMAIL_US_LOADING });
    try {
      let response, responseJson;
      ApiHelper.emailUs(
        params,
        responseValue => {
          console.log("emailresponse====", responseValue)
          response = responseValue[0];
          responseJson = responseValue[1];
          switch (response.status) {
            case responseCodes.OK:
              dispatch({ type: EMAIL_US_SUCCESS, data: responseJson });
              break;
            case responseCodes.UNAUTHORIZED:
              dispatch({
                type: UNAUTHORIZED,
                message: responseJson.message,
              });
              break;
            default:
              dispatch({
                type: EMAIL_US_FAILED,
                message: responseJson.message,
              });
          }
        },
        error => {
          console.log('onError:>>', error);
          dispatch({
            type: EMAIL_US_FAILED,
            message: strings.SOMETHING_WENT_WRONG,
          });
        },
      );
    } catch (e) {
      console.log('err:>>', e);
      dispatch({
        type: EMAIL_US_FAILED,
        message: strings.SOMETHING_WENT_WRONG,
      });
    }
  };
}

//Get Reports
function getReports() {
  console.log(TAG);
  console.log('getReports:>>');
  return async function (dispatch) {
    dispatch({ type: GET_REPORTS_LOADING });
    try {
      let response, responseJson;
      ApiHelper.getReports(
        responseValue => {
          response = responseValue[0];
          responseJson = responseValue[1];
          switch (response.status) {
            case responseCodes.OK:
              dispatch({ type: GET_REPORTS_SUCCESS, data: responseJson });
              break;
            case responseCodes.UNAUTHORIZED:
              dispatch({
                type: UNAUTHORIZED,
                message: responseJson.message,
              });
              break;
            default:
              dispatch({
                type: GET_REPORTS_FAILED,
                message: responseJson.message,
              });
          }
        },
        error => {
          console.log('onError:>>', error);
          dispatch({
            type: GET_REPORTS_FAILED,
            message: strings.SOMETHING_WENT_WRONG,
          });
        },
      );
    } catch (e) {
      console.log('err:>>', e);
      dispatch({
        type: GET_REPORTS_FAILED,
        message: strings.SOMETHING_WENT_WRONG,
      });
    }
  };
}

function makeFlag(data) {
  // console.log("actionpart----------", data)
  return async function (dispatch) {
    dispatch({
      type: OPEN_POPUP,
      payload: data,
    });
  }
}
function broadcastNotificationFlag(flag,data) {
  console.log("actionpart----------",flag, data)
  const NotidficationPopupArray =[flag,data]
  return async function (dispatch) {
    dispatch({
      type: BROAD_CAST_NOTIFICATION_FLAG,
      payload: NotidficationPopupArray,
    });
  }
}



function sendReport(params) {
  console.log(TAG);
  console.log('sendReport:>>1', params);
  return async function (dispatch) {
    dispatch({ type: SEND_REPORT_LOADING });
    try {
      let response, responseJson;
      ApiHelper.sendReport(
        params,
        responseValue => {
          console.log("shashiranjanresp", responseValue)
          response = responseValue[0];
          responseJson = responseValue[1];
          switch (response.status) {
            case responseCodes.OK:
              dispatch({ type: SEND_REPORT_SUCCESS, data: responseJson });
              break;
            case responseCodes.UNAUTHORIZED:
              dispatch({
                type: UNAUTHORIZED,
                message: responseJson.message,
              });
              break;
            default:
              dispatch({
                type: SEND_REPORT_FAILED,
                message: responseJson.message,
              });
          }
        },
        error => {
          console.log('onErro2r:>>', error);
          dispatch({
            type: SEND_REPORT_FAILED,
            message: strings.SOMETHING_WENT_WRONG,
          });
        },
      );
    } catch (e) {
      console.log('err:>>3', e);
      dispatch({
        type: SEND_REPORT_FAILED,
        message: strings.SOMETHING_WENT_WRONG,
      });
    }
  };
}

function logOut() {
  console.log(TAG);
  console.log('logOut:>>');
  return async function (dispatch) {
    dispatch({ type: LOGOUT_LOADING });
    try {
      let response, responseJson;
      ApiHelper.logOut(
        responseValue => {
          console.log("logoutconsole", responseValue)
          response = responseValue[0];
          responseJson = responseValue[1];
          switch (response.status) {
            case responseCodes.OK:
              dispatch({ type: LOGOUT_SUCCESS, data: responseJson });
              break;
            case responseCodes.UNAUTHORIZED:
              dispatch({
                type: UNAUTHORIZED,
                message: responseJson.message,
              });
              break;
            default:
              dispatch({
                type: _FAILED,
                message: responseJson.message,
              });
          }
        },
        error => {
          console.log('onError:>>', error);
          dispatch({
            type: LOGOUT_FAILED,
            message: strings.SOMETHING_WENT_WRONG,
          });
        },
      );
    } catch (e) {
      console.log('err:>>', e);
      dispatch({
        type: LOGOUT_FAILED,
        message: strings.SOMETHING_WENT_WRONG,
      });
    }
  };
}

function getStaticPages() {
  console.log(TAG);
  console.log('getStaticPages:>>');
  return async function (dispatch) {
    dispatch({ type: GET_STATIC_PAGES_LOADING });
    try {
      let response, responseJson;
      ApiHelper.getStaticPages(
        responseValue => {
          console.log("shashiranjanRes", responseValue)
          response = responseValue[0];
          responseJson = responseValue[1];
          switch (response.status) {
            case responseCodes.OK:
              dispatch({ type: GET_STATIC_PAGES_SUCCESS, data: responseJson });
              break;
            case responseCodes.UNAUTHORIZED:
              dispatch({
                type: UNAUTHORIZED,
                message: responseJson.message,
              });
              break;
            default:
              dispatch({
                type: GET_STATIC_PAGES_FAILED,
                message: responseJson.message,
              });
          }
        },
        error => {
          console.log('onError:>>', error);
          dispatch({
            type: GET_STATIC_PAGES_FAILED,
            message: strings.SOMETHING_WENT_WRONG,
          });
        },
      );
    } catch (e) {
      console.log('err:>>', e);
      dispatch({
        type: GET_STATIC_PAGES_FAILED,
        message: strings.SOMETHING_WENT_WRONG,
      });
    }
  };
}

// Change Password Action
const changePassword = params => {
  console.log('changePassword:>>', params);
  return async dispatch => {
    dispatch({ type: CHANGE_PASSWORD_LOADING });
    try {
      let response, responseJson;
      ApiHelper.changePassword(
        params,
        responseValue => {
          console.log("responseValue", responseValue)
          response = responseValue[0];
          responseJson = responseValue[1];
          switch (response.status) {
            case responseCodes.OK:
              console.log("response render to reducer")
              dispatch({ type: CHANGE_PASSWORD_SUCCESS, data: responseJson });
              break;
            case responseCodes.UNAUTHORIZED:
              dispatch({
                type: UNAUTHORIZED,
                message: responseJson.message,
              });
              break;
            default:
              dispatch({
                type: CHANGE_PASSWORD_FAILED,
                message: responseJson.message,
              });
          }
        },
        error => {
          console.log('onError:>>', error);
          dispatch({
            type: CHANGE_PASSWORD_FAILED,
            message: strings.SOMETHING_WENT_WRONG,
          });
        },
      );
    } catch (e) {
      console.log('err:>>', e);
      dispatch({
        type: CHANGE_PASSWORD_FAILED,
        message: strings.SOMETHING_WENT_WRONG,
      });
    }
  };
};

//  FORGOT password action
const forgotPassword = params => {
  console.log('forgotPassword:>>', params);
  return async dispatch => {
    dispatch({ type: FORGOT_PASSWORD_LOADING });
    try {
      let response, responseJson;
      ApiHelper.forgotPassword(
        params,
        responseValue => {
          console.log(responseValue)
          response = responseValue[0];
          responseJson = responseValue[1];
          switch (response.status) {
            case responseCodes.OK:
              dispatch({ type: FORGOT_PASSWORD_SUCCESS, data: responseJson });
              break;
            case responseCodes.UNAUTHORIZED:
              dispatch({
                type: UNAUTHORIZED,
                message: responseJson.message,
              });
              break;
            default:
              dispatch({
                type: FORGOT_PASSWORD_FAILED,
                message: responseJson.message,
              });
          }
        },
        error => {
          console.log('onError:>>', error);
          dispatch({
            type: FORGOT_PASSWORD_FAILED,
            message: strings.SOMETHING_WENT_WRONG,
          });
        },
      );
    } catch (e) {
      console.log('err:>>', e);
      dispatch({
        type: FORGOT_PASSWORD_FAILED,
        message: strings.SOMETHING_WENT_WRONG,
      });
    }
  };
};

//  DELETE ACCOUNT action
const deleteAccount = params => {
  console.log('deleteAccount:>>', params);
  return async dispatch => {
    dispatch({ type: DELETE_ACCOUNT_LOADING });
    try {
      let response, responseJson;
      ApiHelper.deleteAccount(
        params,
        responseValue => {
          response = responseValue[0];
          responseJson = responseValue[1];
          switch (response.status) {
            case responseCodes.OK:
              dispatch({ type: DELETE_ACCOUNT_SUCCESS, data: responseJson });
              break;
            case responseCodes.UNAUTHORIZED:
              dispatch({
                type: UNAUTHORIZED,
                message: responseJson.message,
              });
              break;
            default:
              dispatch({
                type: DELETE_ACCOUNT_FAILED,
                message: responseJson.message,
              });
          }
        },
        error => {
          console.log('onError:>>', error);
          dispatch({
            type: DELETE_ACCOUNT_FAILED,
            message: strings.SOMETHING_WENT_WRONG,
          });
        },
      );
    } catch (e) {
      console.log('err:>>', e);
      dispatch({
        type: DELETE_ACCOUNT_FAILED,
        message: strings.SOMETHING_WENT_WRONG,
      });
    }
  };
};

//Clear Login Data
function clearSettingsData() {
  return async function (dispatch) {
    dispatch({ type: CLEAR_DATA });
  };
}

export {
  logOut,
  getUserProfile,
  updateUserProfile,
  emailUs,
  getReports,
  sendReport,
  getStaticPages,
  clearSettingsData,
  changePassword,
  forgotPassword,
  deleteAccount,
  getNews,
  getHeight,
  getQuickFactsData,
  getNotificationcount,
  getNotification,
  makeFlag,
  broadcastNotificationFlag
};
