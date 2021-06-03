https://docs.qq.com/doc/DVVFBUnFibnJCRUZS?disableReturnList=1
import React, { useState, useContext } from 'react';

const appContext = React.createContext(null);

export function App() {
  const [appState, setAppState] = useState({
    user: {name: "jack", age: 20}
  })

  const contextValue = {appState, setAppState}
  return (
    <appContext.Provider value={appState}>
      111
    </appContext.Provider>
  )
}