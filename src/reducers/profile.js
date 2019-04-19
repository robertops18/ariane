function profile(state = false, action) {
  switch(action.type) {
    case 'SET_PROFILE': {
        return {...action.payload}
    }
    case 'REMOVE_PROFILE': {
      return false
    }
    default:
      return state
  }
}

export default profile;
