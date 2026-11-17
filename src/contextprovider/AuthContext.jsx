import React from 'react';
import {createContext, useState} from "react";
import { toast } from 'react-toastify';
 
const AuthContext = createContext();

const AuthContextProvider = ({children}) =>{
    const [token,setToken] = useState("");
    const [user,setUser] = useState({});
     const [todos, setTodos] = useState([]);
     const [tempTodos,setTempTodos]= useState([]);
    const AuthHeader = {
        headers:{
          Authorization:`Bearer ${token}`
        }
    }
    const logOut=()=>{
        setUser({});
        setTodos([]);
        setToken("");
        toast.success("logout successfully");
    }
    return (
        <AuthContext.Provider value={{token,setToken,
            user,setUser,AuthHeader,
            todos,setTodos,
            logOut,
            tempTodos,setTempTodos
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export {AuthContext,AuthContextProvider};