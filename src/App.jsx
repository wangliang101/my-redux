import React, { useState, useContext } from 'react';

const appContext = React.createContext(null);

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

export function App() {
  const [appState, setAppState] = useState({
    user: {name: "jack", age: 20}
  })

  const contextValue = {appState, setAppState}
  return (
    <appContext.Provider value={contextValue}>
      <CompA />
      <CompB />
      <CompC />
    </appContext.Provider>
  )
}

const CompA = () => <section>子组件A<User/></section>
const CompB = () => <section>子组件B<UserModifier /></section>
const CompC = () => <section>子组件C</section>

const User = () => {
  const contextValue = useContext(appContext)
  return (
    <div>
      User: {contextValue.appState.user.name}
    </div>
  )
}

const UserModifier = () => {
  const {appState, setAppState} = useContext(appContext);
  const onChange = (e) => {
    setAppState(reducer(appState, {type: 'updateUser', payload: {name: e.target.value}}))
  }
  return (
    <div>
      <input 
        value={appState.user.name}
        onChange={onChange}
      />
    </div>
  )
}