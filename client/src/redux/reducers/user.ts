export const user = (state = {}, action) => {
  switch (action.type) {
    case 'GET_USER': {
      return action.data;
    }
    default:
      return state;
  }
};
