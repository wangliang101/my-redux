
import React, { useState, useContext, useEffect } from 'react';

const appContext = React.createContext(null);

let state = undefined;
let reducer = undefined;  // 为了让reducer不被暴露出去
let listeners = [];
const setState = (newState) =>{
  state = newState;
  listeners.map(fn => fn(state))
}

const store = {
  getState(){
    return state
  },
  dispatch(action){
    setState(reducer(state, action))
  },
  subscribe(fn){
    listeners.push(fn);
    return () => {
      const index = listeners.indexOf(fn);
      listeners.splice(index, 1)
    }
  }
}

const createSrore = (_reducer, initState) => {
  state = initState
  reducer = _reducer
  return store
}

const Provider = ({store, children}) => {
  return (
    <appContext.Provider value={store}>
      { children}
    </appContext.Provider>
  )
}

const change = (oldState, newState) => {
  if(Object.keys(oldState).length !== Object.keys(newState).length) return false
  for(let key in oldState){
    if(oldState[key] !== newState[key]){
      return true
    }
  }
  return false
}

const connect = (selector, dispatcheSelector) => (Component) => {
  return (props) => {
    const [, update] = useState({});
    const data = selector ? selector(state) : {state}
    const dispatchers = dispatcheSelector ? dispatcheSelector(store.dispatch) : {dispatch: store.dispatch}
    useEffect(() => {
      store.subscribe(() => {
        const newDate = selector ? selector(state) : {state}
        if(change(data, newDate)){
          update({})
        }
      })
    }, [selector])

    return <Component {...props} {...data} {...dispatchers} />
  }
}

export { Provider, connect, createSrore}