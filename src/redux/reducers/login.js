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

// Initial State
const INITIAL_STATE = {
  isLoading: false,
  actions: undefined,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_LOADING:
    case REGISTRATION_LOADING:
      return {...state, isLoading: true};
    case LOGIN_SUCCESS:
    case REGISTRATION_SUCCESS:
    case LOGIN_FAILED:
    case REGISTRATION_FAILED:
    case UNAUTHORIZED:
      return {...state, isLoading: false, actions: action};
    case CLEAR_DATA:
      return {...state, isLoading: false, actions: undefined};
    default:
      return state;
  }
};
