import { combineReducers } from 'redux';
import navigationReducer from './navigation';
import user from './user'
import profile from './profile'

const reducer = combineReducers({
  navigationReducer,
  user,
  profile
});

export default reducer;