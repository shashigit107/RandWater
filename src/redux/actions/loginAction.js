import ApiHelper from '../../api/APIHelper';
import {responseCodes} from '../../common/constants';
import strings from '../../i18n/strings';
import {
  LOGIN_LOADING,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  REGISTRATION_LOADING,
  REGISTRATION_SUCCESS,
  REGISTRATION_FAILED,
  UNAUTHORIZED,
  CLEAR_DATA,
} from '../types';

const TAG = 'loginAction := ';

// Login APi
function doLogin(params, url) {
  console.log('doLogin:>>', params);
  console.log("apiUrl",url)
  return async function (dispatch) {
    dispatch({type: LOGIN_LOADING});
    try {
      let response, responseJson;
      ApiHelper.doLogin(
        params,
        responseValue => {
          console.log("Api response",responseValue)
          response = responseValue[0];
          responseJson = responseValue[1];
          switch (response.status) {
            case responseCodes.OK:
              console.log("responseJson----",responseJson)
              dispatch({type: LOGIN_SUCCESS, data: responseJson});
              break;
            case responseCodes.UNAUTHORIZED:
              dispatch({
                type: UNAUTHORIZED,
                message: responseJson.message,
              });
              break;
            default:
              dispatch({type: LOGIN_FAILED, message: responseJson.message});
          }
        },
        error => {
          console.log('apionError:>>', error);
          dispatch({type: LOGIN_FAILED, message: strings.SOMETHING_WENT_WRONG});
        },
        url,
      );
    } catch (e) {
      console.log('api catch err:>>', e);
      dispatch({type: LOGIN_FAILED, message: strings.SOMETHING_WENT_WRONG});
    }
  };
}

// Registration Api
function doRegistration(params) {
  console.log('doSignUp:>>', params);
  return async function (dispatch) {
    dispatch({type: REGISTRATION_LOADING});
    try {
      let response, responseJson;
      ApiHelper.doRegistration(
        params,
        responseValue => {
          console.log("shashi------->>",responseValue,params)
          console.log("shashi------->>2",params)
          response = responseValue[0];
          responseJson = responseValue[1];
          switch (response.status) {
            case responseCodes.OK:
              dispatch({type: REGISTRATION_SUCCESS, data: responseJson});
              break;
            case responseCodes.UNAUTHORIZED:
              dispatch({
                type: UNAUTHORIZED,
                message: responseJson.message,
              });
              break;
            default:
              dispatch({
                type: REGISTRATION_FAILED,
                message: responseJson.message,
              });
          }
        },
        error => {
          console.log(error);
          console.log("err========>>0",error)
          dispatch({
            type: REGISTRATION_FAILED,
            message: strings.SOMETHING_WENT_WRONG,
          });
        },
      );
    } catch (e) {
      console.log(e);
      console.log("err========>>",e)
      dispatch({
        type: REGISTRATION_FAILED,
        message: strings.SOMETHING_WENT_WRONG,
      });
    }
  };
}

//Clear Login Data
function clearLoginData() {
  return async function (dispatch) {
    dispatch({type: CLEAR_DATA});
  };
}

export {doLogin, doRegistration, clearLoginData};
