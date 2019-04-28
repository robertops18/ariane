function data(state = {}, action) {
  switch (action.type) {
    case 'SET_TRIPS_LIST': {
      return {...state, ...action.payload}
    }
    default:
      return state
  }}

export default data;
