import client from '../api';
import * as ApiConstants from '../common/apiconstants';

const TAG = 'APIHelper := ';

//Api Call Function
const makeApiCall = (onSuccess, onFailure, url, method, data, dataType) => {
  console.log('makeApiCall url:>>', url);
  console.log('makeApiCall data:>>', data);
  if (method === 'GET') {
    client
      .getSecuredGET(url)
      .then(response => onSuccess(response))
      .catch(error => onFailure(error));
  } else if (method === 'POST') {
    client
      .getSecuredPOST(url, data, dataType)
      .then(response => onSuccess(response))
      .catch(error => onFailure(error));
  } else if (method === 'PUT') {
    client
      .getSecuredPUT(url, data, dataType)
      .then(response => onSuccess(response))
      .catch(error => onFailure(error));
  } else if (method === 'DELETE') {
    client
      .getSecuredDELETE(url)
      .then(response => onSuccess(response))
      .catch(error => onFailure(error));
  }
};

//All Api Calls
export default {
  doLogin(params, onSuccess, onFailure, urls) {
    console.log(TAG, 'doLogin');
    let url = ApiConstants.LOGIN;
    console.log("api url comme",url)
    makeApiCall(
      successResponse => onSuccess(successResponse),
      error => onFailure(error),
      (url = urls || url),
      'POST',
      params,
    );
  },
  doRegistration(params, onSuccess, onFailure) {
    console.log(TAG, 'doRegistration');
    let url = ApiConstants.REGISTRATION;
    makeApiCall(
      successResponse => onSuccess(successResponse),
      error => onFailure(error),
      url,
      'POST',
      params,
    );
  },
  getUserProfile(onSuccess, onFailure) {
    console.log(TAG, 'getUserProfile');
    let url = ApiConstants.USER_DETAIL;
    makeApiCall(
      successResponse => onSuccess(successResponse),
      error => onFailure(error),
      url,
      'GET',
    );
  },
  getQuickFactData(onSuccess, onFailure) {
    console.log(TAG, 'getUserProfile');
    let url = ApiConstants.GET_QUICK_FACT_DATA;
    makeApiCall(
      successResponse => onSuccess(successResponse),
      error => onFailure(error),
      url,
      'GET',
    );
  },
  getNotificationcount(onSuccess,onFailure){
    console.log(TAG, 'getUserProfile');
    let url = ApiConstants.GET_NOTICATION_COUNT;
    console.log("onSuccess",onSuccess,onFailure)
    makeApiCall(
      successResponse => onSuccess(successResponse),
      error => onFailure(error),
      url,
      'GET',
    );
  },
  getNotification(onSuccess,onFailure){
    console.log(TAG, 'getUserProfile');
    let url = ApiConstants.GET_NOTICATION;
    console.log("onSuccess",onSuccess,onFailure)
    makeApiCall(
      successResponse => onSuccess(successResponse),
      error => onFailure(error),
      url,
      'GET',
    );
  },


  // getNewsData
  getNewsData(onSuccess, onFailure) {
    console.log(TAG, 'getNewsData');
    console.log("step3")
    let url = ApiConstants.GET_NEWS_DATA;
    makeApiCall(
      successResponse => onSuccess(successResponse),
      error => onFailure(error),
      url,
      'GET',
    );
  },
  updateUserProfile(params, onSuccess, onFailure) {
    console.log(TAG, 'updateUserProfile');
    let url = ApiConstants.UPDATE_USER_DETAIL;
    makeApiCall(
      successResponse => onSuccess(successResponse),
      error => onFailure(error),
      url,
      'POST',
      params,
      'formData',
    );
  },
  getStaticPages(onSuccess, onFailure) {
    console.log(TAG, 'getStaticPages');
    let url = ApiConstants.GET_STATIC_PAGE;
    makeApiCall(
      successResponse => onSuccess(successResponse),
      error => onFailure(error),
      url,
      'GET',
    );
  },
  sendReport(params, onSuccess, onFailure) {
    console.log(TAG, 'sendReport');
    let url = ApiConstants.ADD_INCIDENT;
    console.log("shashiurl",url)
    makeApiCall(
      successResponse => onSuccess(successResponse),
      error => onFailure(error),
      url,
      'POST',
      params,
      'formData',
    );
  },
  emailUs(params, onSuccess, onFailure) {
    console.log(TAG, 'emailUs');
    let url = ApiConstants.CONTACT_US;
    console.log("shashiranjan======",url)
    makeApiCall(
      successResponse => onSuccess(successResponse),
      error => onFailure(error),
      url,
      'POST',
      params,
      'formData',
    );
  },
  getReports(onSuccess, onFailure) {
    console.log(TAG, 'getReports');
    let url = ApiConstants.GET_REPORTS;
    makeApiCall(
      successResponse => onSuccess(successResponse),
      error => onFailure(error),
      url,
      'GET',
    );
  },
  logOut(onSuccess, onFailure) {
    console.log(TAG, 'logOut');
    let url = ApiConstants.LOGOUT;
    makeApiCall(
      successResponse => onSuccess(successResponse),
      error => onFailure(error),
      url,
      'POST',
    );
  },
  changePassword(params, onSuccess, onFailure) {
    console.log(TAG, 'Change Password');
    let url = ApiConstants.CHANGE_PASSWORD;
    makeApiCall(
      successResponse => onSuccess(successResponse),
      error => onFailure(error),
      url,
      'POST',
      params,
    );
  },

  forgotPassword(params, onSuccess, onFailure) {
    console.log(TAG, 'Forgot Password');
    let url = ApiConstants.FORGOT_PASSWORD;
    makeApiCall(
      successResponse => onSuccess(successResponse),
      error => onFailure(error),
      url,
      'POST',
      params,
    );
  },
  deleteAccount(params, onSuccess, onFailure) {
    console.log(TAG, 'Delete Account');
    let url = ApiConstants.DELETE_ACCOUNT;
    makeApiCall(
      successResponse => onSuccess(successResponse),
      error => onFailure(error),
      url,
      'POST',
      params,
    );
  },
};
