import React from 'react';
import { appContext, store, connect} from './redux.jsx'

export function App() {

  return (
    <appContext.Provider value={store}>
      <CompA />
      <CompB />
      <CompC />
    </appContext.Provider>
  )
}

const CompA = () => {
  console.log('子组件A执行了')
  return (
    <section>子组件A<User/></section>
  )
}
const CompB = () => {
  console.log('子组件B执行了')
  return(
    <section>子组件B<UserModifierUser>哈哈哈</UserModifierUser></section>
  )
}
const CompC = connect((state) => {
  return {group: state.group.name}
})(({group}) => {
  console.log('子组件C执行了')
  return(
    <section>子组件C<div>{group}</div></section>
  )
})

const User = connect((state) => {
  const { user } = state;
  return {user}
})(({user}) => {
  console.log('User执行了')
  return (
    <div>
      User: {user.name}
    </div>
  )
})


const UserModifierUser = connect(null, (dispatch) => {
  return {
    updateUser: (attrs) => dispatch({type: 'updateUser', payload: attrs})
  }
})(({updateUser, state, children}) => {
  console.log('UserModifierUser执行了');
  const onChange = (e) => {
    updateUser({name: e.target.value})
  }
  return (
    <div>
      {children}
      <input 
        value={state.user.name}
        onChange={onChange}
      />
    </div>
  )
})