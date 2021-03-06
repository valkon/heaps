import { useLogoutMutation } from '../../generated/graphql';

export const register = (user) => ({ type: 'CREATE_USER', payload: user });
export const getInitialUser = (user) => ({
  type: 'GET_INITIAL_USER',
  payload: user,
});
export const logUserOut = () => ({ type: 'LOGOUT' });
