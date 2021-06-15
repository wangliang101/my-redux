import React, { useState, useContext, useEffect } from 'react';

const appContext = React.createContext(null);

const store = {
  state: {
    user: {name: "jack", age: 20}
  },
  setState(newState){
    store.state = newState;
    store.listeners.map(fn => fn(store.state))
  },
  listeners: [],
  subscribe(fn){
    store.listeners.push(fn);
    return () => {
      const index = store.listeners.indexOf(fn);
      store.listeners.splice(index, 1)
    }
  }
}

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

const connect = (Component) => {
  return (props) => {
    const {state, setState} = useContext(appContext);
    const [, update] = useState({});
    useEffect(() => {
      store.subscribe(() => {
        update({})
      })
    }, [])
    const dispatch = (action) => {
      setState(reducer(state, action))
    }
    return <Component {...props} dispatch={dispatch} state={state}/>
  }
}
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
const CompC = () => {
  console.log('子组件C执行了')
  return(
    <section>子组件C</section>
  )
}

const User = connect(({state}) => {
  console.log('User执行了')
  return (
    <div>
      User: {state.user.name}
    </div>
  )
})



// const Wrapper = () => {
//   const {appState, setAppState} = useContext(appContext);
//   const dispatch = (action) => {
//     setAppState(reducer(appState, action))
//   }
//   return <UserModifier dispatch={dispatch} state={appState}/>
// }


const UserModifierUser = connect(({dispatch, state, children}) => {
  console.log('UserModifierUser执行了');
  const onChange = (e) => {
    
    dispatch({type: 'updateUser', payload: {name: e.target.value}})
    // setAppState(reducer(appState, {type: 'updateUser', payload: {name: e.target.value}}))

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