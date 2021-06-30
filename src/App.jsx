import React from 'react';
import { Provider, createSrore, connect } from './redux.jsx';
import { connectToUser } from './connecters/connectToUser.js';
import { ajax } from './ajax';

const reducer = (state, {type, payload}) => {
  if(type === 'updateUser'){
    return {
      ...state,
      user: {
        ...state.user,
        ...payload
      }
    }
  }else{
    return state;
  }
}

const initState = {
  user: {name: "jack", age: 20},
  group: {name: "前端组"}
}

const store = createSrore(reducer, initState)

export function App() {

  return (
    <Provider store={store}>
      <CompA />
      <CompB />
      <CompC />
    </Provider>
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


const User = connectToUser(({user}) => {
  console.log('User执行了')
  return (
    <div>
      User: {user.name}
    </div>
  )
})

const fetchUser = (dispatch) => {
  ajax('/user').then((data) => {
    dispatch({type: 'updateUser', payload: {name: data}})
  })
}


const UserModifierUser = connectToUser(({updateUser, user, children, dispatch}) => {
  console.log('UserModifierUser执行了');
  const onChange = (e) => {
    updateUser({name: e.target.value})
  }
  const handleClick = () => {
    dispatch(fetchUser)
  }
  return (
    <div>
      {children}
      <input 
        value={user.name}
        onChange={onChange}
      />
      <button onClick={handleClick}>异步获取</button>
    </div>
  )
})