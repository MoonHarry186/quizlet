"use client";
import React from 'react'
import Cookies from 'js-cookie';
import { useContext } from 'react';
import { GlobalContext } from '../(context)/GlobalState';
import { useRouter } from 'next/navigation'


const MyAccount = () => {
    const {login} = useContext(GlobalContext)
    const router = useRouter()

    const handleLogout = (e) => {
        e.preventDefault();
        Cookies.remove('userId');
        login(false)
        router.push('/')    }
  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default MyAccount
