"use client";
import React from 'react'
import Home from './Home'
import Login from './Login';
import Cookies from "js-cookie";
import { useContext } from 'react';
import { GlobalContext } from '../(context)/GlobalState';

const Main = () => {
  const {isLogin} = useContext(GlobalContext)
  return (
    <>
      {Cookies.get('userId') ? <Home /> : <Login />}
    </>
  )
}

export default Main
