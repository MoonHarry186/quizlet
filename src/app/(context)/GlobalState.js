"use client";
import React, {createContext, useReducer} from "react";
import AppReducer from "./AppReducer";

// Initial State
const initialState = {
  isLogin: false,
  isEditCard: false,
}

// Create Context
export const GlobalContext = createContext(initialState)

// Provider Component
export const GlobalProvider = ({children}) => {
  const [state, dispatch] = useReducer(AppReducer, initialState)

  // Actions
  function login(status) {
    dispatch({
      type: 'LOGIN',
      payload: status
    })
  }

  function editCard(id) {
    dispatch({
      type: 'EDIT_CARD',
      payload: id
    })
  }

  return (
    <GlobalContext.Provider value={{
      isLogin: state.isLogin,
      login,
      isEditCard: state.isEditCard,
      editCard
    }} 
    >
      {children}
    </GlobalContext.Provider>
  )
}