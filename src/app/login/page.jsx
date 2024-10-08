"use client";

import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useContext } from "react";
import { GlobalContext } from "../(context)/GlobalState";
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
            document.cookie = `name=${userResult.users._id}; expires=Fri, 31 Dec 2025 23:59:59 GMT; path=/; secure;`;
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
