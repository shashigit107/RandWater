import {combineReducers} from 'redux';
import home from './home';
import login from './login';
import settings from './settings';

// Main Root Reducer Which Combine All Reducers
const rootReducer = combineReducers({
  home,
  login,
  settings,
});

export default rootReducer;
