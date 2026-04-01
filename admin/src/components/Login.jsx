import React, { useState } from "react";
import {useMutation} from '@tanstack/react-query'

import { toast } from "react-toastify";
import { loginUser } from "../api/authUser";

const Login = ({setToken}) => {
    const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { mutate, isPending, isError, error, isSuccess } = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      console.log("Login Success", data);
      toast.success("Login Successfull");
      setToken(data.token);
    }
  })
  
    const onSubmitHandler = async (e) => {
        e.preventDefault();
      mutate({ email, password });
    }
  return (
    <div className="min-h-screen flex items-center justify-center w-full">
      <div className="bg-white shadow-md rounded-lg px-8 py-6 max-w-md">
        <h1 className="text-2xl font-bold mb-4">Admin Login</h1>
        <form onSubmit={onSubmitHandler}>
          <div className="mb-3 min-w-[72]">
            <p className="text-sm font-medium text-gray-700 mb-2">Email Address</p>
            <input value={email} onChange={(e)=>setEmail(e.target.value)} className="rounded-md w-full px-3 py-2 border border-gray-300 outline-0" type="email" placeholder="example@gmail.com" required />
          </div>
          <div className="mb-3 min-w-[72]">
            <p className="text-sm font-medium text-gray-700 mb-2">Password</p>
            <input value={password} onChange={(e)=>setPassword(e.target.value)} className="rounded-md w-full px-3 py-2 border border-gray-300 outline-0" type="password" placeholder="Enter your password" required />
          </div>
          <button className="mt-2 w-full px-4 py-2 rounded-md text-white bg-black" type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
