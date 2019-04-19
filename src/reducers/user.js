const initState = {
  userId: null,
  token: null
};

function user(state = initState, action) {
  const { payload } = action;
  switch (action.type) {
    case "SET_USER": {
      return { ...state, ...payload };
    }
    case "NOTIFICATION": {
      Object.assign({},payload);
      return { ...state,...Object.assign({},payload)};
    }
    case "REMOVE_USER": {
      return initState;
    }
    default:
      return state;
  }
}

export default user;
