import React, { useState } from "react";
import { useForm } from "react-hook-form";

const Login = () => {
  const [currentState, setCurrentState] = useState("Sign-up");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async(data) => {
    console.log(data)
  }
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-[90%] sm:max-w-96 m-auto mt-14 text-gray-800 p-5 border flex flex-col gap-4"
    >
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="text-3xl">{currentState}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>
      {currentState === "Login" ? (
        ""
      ) : (
        <div>
          <input
            type="text"
            className="border border-gray-800 w-full px-3 py-2"
            placeholder="Name"
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>
      )}

      <input
        type="email"
        className="border border-gray-800 w-full px-3 py-2"
        placeholder="Email"
        {...register("email", { required: "Email is required" })}
      />
                {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
      <input
        type="password"
        className="border border-gray-800 w-full px-3 py-2"
        placeholder="Password"
        {...register("password", { required: "Password is required" })}
      />
                {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
      )}
      <div className="w-full flex justify-between text-sm mt-[-8px]">
        <p>Forgot your password ?</p>
        {
          currentState === "Login"
            ? <p onClick={()=>setCurrentState("Sign-up")} className="cursor-pointer">Create account</p>
            :<p onClick={()=>setCurrentState("Login")} className="cursor-pointer">Login here</p>
        }
      </div>
      <button type="submit" className="bg-black text-white font-light px-8 py-2 mt-4">{currentState === "Login"?"Sign In":"Sign Up" }</button>
    </form>
  );
};

export default Login;
