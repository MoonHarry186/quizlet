"use client";

import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useContext } from "react";
import { GlobalContext } from "../(context)/GlobalState";
import Cookies from 'js-cookie';

const Login = () => {
  const {login} = useContext(GlobalContext)
  return (
    <>
      <div className="max-w-screen-xl mx-auto">
        <GoogleLogin
          onSuccess={async (credentialResponse) => {
            const { name, email, picture } = jwtDecode(
              credentialResponse.credential
            );
            const userRespon = await fetch("/api/Users", {
              method: "POST",
              header: { "Content-Type": "application/json" },
              body: JSON.stringify({
                formData: { name, avatar: picture, email },
              }),
            });

            const userResult = await userRespon.json();
            // Store user _id
            login(userResult.users._id && true);

            if (!Cookies.get('userId')) {
              Cookies.set('userId', userResult.users._id, { expires: 7 }); // Lưu cookie trong 7 ngày
            }
            

          }}
          onError={() => {
            console.log("Login Failed");
          }}
        />
      </div>
    </>
  );
};

export default Login;
