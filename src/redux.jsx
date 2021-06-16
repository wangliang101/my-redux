
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

const connect = (selector) => (Component) => {
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
    const data = selector ? selector(state) : {state}
    return <Component {...props} {...data} dispatch={dispatch} />
  }
}

export { appContext, connect, store}