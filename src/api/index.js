// Get Api Request Structure

import AsyncStorage from '@react-native-async-storage/async-storage';
import {responseCodes} from '../common/constants';
import {StackNavStrings} from '../navigation/NavigationKeys';

const ifUserIsBlocked = async response => {
  if (response?.status && response?.status == responseCodes.UNAUTHORIZED) {
    await AsyncStorage.clear();
    setTimeout(() => {
      global.navigation.reset({
        index: 0,
        routes: [{name: StackNavStrings.AuthNavigator}],
      });
    }, 500);
  }
};

const getFetchSecuredGETClient = url => {
  let defaultHeader = {
    'content-type': 'application/json',
    Accept: 'application/json, text/javascript, */*; q=0.01',
    Authorization: 'Bearer ' + global.accessToken,
  };
  console.log('defaultHeader >>', defaultHeader);
  return fetch(url, {method: 'GET', headers: defaultHeader})
    .then(response => Promise.all([response, response.json()]))
    .then(([response, responseJson]) => {
      ifUserIsBlocked(response);
      return Promise.resolve([response, responseJson]);
    })
    .catch(error => Promise.reject(error));
};

// Post Api Request Structure
const getFetchSecuredPOSTClient = (url, params, dataType) => {
  let defaultHeader = {
    'content-type':
      dataType === 'formData' ? 'multipart/form-data' : 'application/json',
    Accept: 'application/json, text/javascript, */*; q=0.01',
    Authorization: 'Bearer ' + global.accessToken,
  };
  console.log('defaultHeader >>', defaultHeader);
  return fetch(url, {
    method: 'POST',
    headers: defaultHeader,
    body: dataType === 'formData' ? params : JSON.stringify(params),
  })
    .then(response => Promise.all([response, response.json()]))
    .then(([response, responseJson]) => {
      ifUserIsBlocked(response);
      return Promise.resolve([response, responseJson]);
    })
    .catch(error => Promise.reject(error));
};

// Put Api Request Structure
const getFetchSecuredPUTClient = (url, params, dataType) => {
  let defaultHeader = {
    'content-type':
      dataType === 'formData' ? 'multipart/form-data' : 'application/json',
    Accept: 'application/json, text/javascript, */*; q=0.01',
    Authorization: 'Bearer ' + global.accessToken,
  };
  console.log('defaultHeader >>', defaultHeader);
  return fetch(url, {
    method: 'PUT',
    headers: defaultHeader,
    body: dataType === 'formData' ? params : JSON.stringify(params),
  })
    .then(response => Promise.all([response, response.json()]))
    .then(([response, responseJson]) => {
      ifUserIsBlocked(response);
      return Promise.resolve([response, responseJson]);
    })
    .catch(error => Promise.reject(error));
};

//delete Api Request Structure
const getFetchSecuredDELETEClient = url => {
  let defaultHeader = {
    'content-type': 'application/json',
    Accept: 'application/json, text/javascript, */*; q=0.01',
    Authorization: 'Bearer ' + global.accessToken,
  };
  console.log('defaultHeader >>', defaultHeader);
  return fetch(url, {method: 'DELETE', headers: defaultHeader})
    .then(response => Promise.all([response, response.json()]))
    .then(([response, responseJson]) => {
      ifUserIsBlocked(response);
      return Promise.resolve([response, responseJson]);
    })
    .catch(error => Promise.reject(error));
};

// Export All Api Request Structure (GET, POST, PUT)
export default {
  getSecuredGET(url) {
    return getFetchSecuredGETClient(url)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  },
  getSecuredPOST(url, params, dataType) {
    return getFetchSecuredPOSTClient(url, params, dataType)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  },
  getSecuredPUT(url, params, dataType) {
    return getFetchSecuredPUTClient(url, params, dataType)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  },
  getSecuredDELETE(url) {
    return getFetchSecuredDELETEClient(url)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  },
};
