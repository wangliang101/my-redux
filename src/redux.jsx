
import React, { useState, useContext, useEffect } from 'react';

const appContext = React.createContext(null);

const store = {
  state: {
    user: {name: "jack", age: 20},
    group: {name: "前端组"}
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
    const {state, setState} = useContext(appContext);
    const dispatch = (action) => {
      setState(reducer(state, action))
    }
    const [, update] = useState({});
    const data = selector ? selector(state) : {state}
    const dispatchers = dispatcheSelector ? dispatcheSelector(dispatch) : {dispatch}
    useEffect(() => {
      store.subscribe(() => {
        const newDate = selector ? selector(store.state) : {state: store.state}
        if(change(data, newDate)){
          update({})
        }
      })
    }, [selector])

    return <Component {...props} {...data} {...dispatchers} />
  }
}

export { appContext, connect, store}