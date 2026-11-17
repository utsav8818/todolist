import axios from 'axios';
import React, { useState } from 'react'
import { useContext } from 'react';
import { AuthContext } from '../contextprovider/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { TbSquareRoundedCheck } from "react-icons/tb";


const LoginPage = () => {
  const navigate = useNavigate()
  const init={
    email:"",
    password:""
  }
  const [loginData,setLoginData]= useState(init);
  const {token,setToken,user,setUser}= useContext(AuthContext);

  const handleChange = (e)=>{
     setLoginData((prev)=>({...prev,[e.target.name]:e.target.value}));
  }

  const handleSubmit = async(e)=>{
    e.preventDefault();
    try{

      const res = await axios.post("http://localhost:5300/auth/get-user",{
        email:loginData.email,
        password:loginData.password
      });
      toast.success(res.data.message);
      setUser(res.data.user);
      setToken(res.data.token);
      setLoginData(init);
      navigate("/")
    }catch(err){
      if(err.response){
        toast.warn(err.response.data.message);
      }else{
        toast.warn("cannot reach the server");
      }
    }
    console.log(res.data.user);
    console.log(res.data.token);
    
    
  }
  
  return (
    <div className="w-full h-screen flex justify-center items-center  ">
      <div className="shadow-2xl p-10 pb-12 w-2xl ">
        <div className="pl-10">
  <div className="flex items-center gap-2 text-3xl mb-3">
    <TbSquareRoundedCheck className="text-indigo-600"  /> 
    <div className="font-semibold ">
      Todo List
      </div>
  </div>
  <div className="text-5xl mb-3">
    Welcome back 
    <div className="text-2xl text-gray-500">Log in to see your tasks.</div>
  </div>
  <form className="  w-[28rem] mb-2 " onSubmit={handleSubmit}>
  <div className="mb-5 pl-1 ">
    <label htmlFor="email" className="block mb-2.5 text-sm font-medium text-heading text-xl">Email</label>
    <input type="email" id="email" className="bg-neutral-secondary-medium border border-default-medium text-heading text-md rounded-xl focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow placeholder:text-body" placeholder="name@flowbite.com" onChange={handleChange} name="email" value={loginData.email} required />
  </div>
  <div className="mb-5 pl-1">
    <label htmlFor="password" className="block mb-2.5 text-sm font-medium text-heading text-xl">Password</label>
    <input type="password" id="password" name="password" className="bg-neutral-secondary-medium border border-default-medium text-heading text-md rounded-xl focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow placeholder:text-body" placeholder="••••••••" onChange={handleChange} value={loginData.password} required />
  </div>
  <div className="flex items-start mb-5 pl-2">
    <label htmlFor="remember-alternative" className="flex items-center h-5">
      <input id="remember-alternative" type="checkbox" value="" className="w-4 h-4 border border-default-medium rounded-xs bg-neutral-secondary-medium focus:ring-2 focus:ring-brand-soft accent-indigo-600" required />
      <p className="ms-2 text-md ">keep me signed in </p>
    </label>
  </div>
  <button type="submit" className="text-white bg-indigo-600 bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-xl px-4 py-2.5 focus:outline-none rounded-2xl w-full ">Log in</button>
</form>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
