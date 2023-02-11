import User from './User';

interface ReduxAuthState {
  isAuthenticated: boolean;
  currentUser: User;
}

export default ReduxAuthState;
