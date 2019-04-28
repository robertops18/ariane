import { combineReducers } from 'redux';
import navigationReducer from './navigation';
import user from './user'
import profile from './profile'
import data from './data'

const reducer = combineReducers({
  data,
  navigationReducer,
  user,
  profile
});

export default reducer;
