import {
  WATER_PROBLEM_PLACED,
  WATER_PROBLEM_TYPE,
  WATER_PROBLEM_NOTES,
  WATER_PROBLEM_IMAGE,
  WATER_PROBLEM_LOCATION,
  WATER_PROBLEM_ADDRESS,
  WATER_PROBLEM_DATE,
  CLEAR_PROBLEM_DATA,
  SET_REPORT_FOCUS
} from '../types';

const initialState = {
  waterProblemPlaced: '',
  problemType: '',
  problemNote: '',
  problemImage: '',
  problemLocation: '',
  problemAddress: '',
  problemDate: '',
  reportFocus:false
};

export default function (state = initialState, action) {
  switch (action.type) {
    case WATER_PROBLEM_PLACED:
      return {
        ...state,
        waterProblemPlaced: action.payload,
      };
    case WATER_PROBLEM_TYPE:
      console.log("store",action.payload)
      return {
        ...state,
        problemType: action.payload,
      };
    case WATER_PROBLEM_NOTES:
      return {
        ...state,
        problemNote: action.payload,
      };
    case WATER_PROBLEM_IMAGE:
      return {
        ...state,
        problemImage: action.payload,
      };
    case WATER_PROBLEM_LOCATION:
      return {
        ...state,
        problemLocation: action.payload,
      };
    case WATER_PROBLEM_ADDRESS:
      return {
        ...state,
        problemAddress: action.payload,
      };
    case WATER_PROBLEM_DATE:
      return {
        ...state,
        problemDate: action.payload,
      };
    case CLEAR_PROBLEM_DATA:
      return {
        ...state,
        problemType: '',
        problemNote: '',
        problemImage: '',
        problemLocation: '',
        problemAddress: '',
        problemDate: '',
      };
      case SET_REPORT_FOCUS:
        console.log("-------reportFocus",action.payload)
        return {
          ...state,
          reportFocus: action.payload,
        };
    default:
      return state;
  }
}
