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
const CompB = () => <section>子组件B<Wrapper /></section>
const CompC = () => <section>子组件C</section>

const User = () => {
  const contextValue = useContext(appContext)
  return (
    <div>
      User: {contextValue.appState.user.name}
    </div>
  )
}



const Wrapper = () => {
  const {appState, setAppState} = useContext(appContext);
  const dispatch = (action) => {
    setAppState(reducer(appState, action))
  }
  return <UserModifier dispatch={dispatch} state={appState}/>
}

const UserModifier = ({dispatch, state}) => {
  console.log('state', state)
  const onChange = (e) => {
    
    dispatch({type: 'updateUser', payload: {name: e.target.value}})
    // setAppState(reducer(appState, {type: 'updateUser', payload: {name: e.target.value}}))

  }
  return (
    <div>
      <input 
        value={state.user.name}
        onChange={onChange}
      />
    </div>
  )
}