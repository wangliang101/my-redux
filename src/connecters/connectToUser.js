import { connect } from '../redux.jsx';

const userSelector = (state) => {
  return {user: state.user}
}

const userDispatchers = (dispatch) => {
  return {
    updateUser: (attrs) => dispatch({type: 'updateUser', payload: attrs})
  }
}

const connectToUser = connect(userSelector, userDispatchers)

export { connectToUser }