import {
  WATER_PROBLEM_PLACED,
  WATER_PROBLEM_TYPE,
  WATER_PROBLEM_NOTES,
  WATER_PROBLEM_IMAGE,
  WATER_PROBLEM_LOCATION,
  WATER_PROBLEM_ADDRESS,
  WATER_PROBLEM_DATE,
  CLEAR_PROBLEM_DATA,
  // GET_QUICK_FACT_DATA,
  SET_REPORT_FOCUS
} from '../types';

function water_Problem_action(payload) {
  return dispatch => {
    dispatch({type: WATER_PROBLEM_PLACED, payload: payload});
  };
}


function water_Problem_type(payload) {
  console.log("payload of text",payload)
  return dispatch => {
    dispatch({type: WATER_PROBLEM_TYPE, payload: payload});
  };
}

function water_Problem_notes(payload) {
  return dispatch => {
    dispatch({type: WATER_PROBLEM_NOTES, payload: payload});
  };
}
function setReportfocus(payload){
  return dispatch => {
    dispatch({type: SET_REPORT_FOCUS, payload: payload});
  };
}

function water_Problem_image(payload) {
  return dispatch => {
    dispatch({type: WATER_PROBLEM_IMAGE, payload: payload});
  };
}

function water_Problem_location(payload) {
  return dispatch => {
    dispatch({type: WATER_PROBLEM_LOCATION, payload: payload});
  };
}

function water_Problem_address(payload) {
  return dispatch => {
    dispatch({type: WATER_PROBLEM_ADDRESS, payload: payload});
  };
}

function water_Problem_date(payload) {
  return dispatch => {
    dispatch({type: WATER_PROBLEM_DATE, payload: payload});
  };
}

function clear_problem_data() {
  return dispatch => {
    dispatch({type: CLEAR_PROBLEM_DATA});
  };
}

export {
  water_Problem_action,
  water_Problem_type,
  water_Problem_notes,
  water_Problem_image,
  water_Problem_location,
  water_Problem_address,
  water_Problem_date,
  clear_problem_data,
  setReportfocus
};
