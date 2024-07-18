import { createContext, useReducer } from "react"

const State = createContext()
const Dispatch = createContext()

const reducer = (state, { version }) => {
  return {
    ...state, version
  }
}

const Provider = ({ children }) => {
  // "undefined" means latest version
  const [state, dispatch] = useReducer(reducer, { version: undefined })

  return (
    <State.Provider value={state}>
      <Dispatch.Provider value={dispatch}>{children}</Dispatch.Provider>
    </State.Provider>
  )
}

const VersionContext = {
  State,
  Dispatch,
  Provider
}

export default VersionContext
