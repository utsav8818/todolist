import { FaMagnifyingGlass } from "react-icons/fa6";
import { useState, useEffect, useContext } from "react";
import Popup from "./Popup";
import Tasklist from "./Tasklist";
import axios from "axios";
import { AuthContext } from "./contextprovider/AuthContext";
import { Link } from "react-router-dom";
import { BiTask } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";
import { ImCross } from "react-icons/im";

const Navbar = () => {
  const [showPopup, setShow] = useState(false);
  const {user,AuthHeader,token,logOut,setTempTodos,todos,setTodos,tempTodos} = useContext(AuthContext);
  const [showInfo,setShowInfo] = useState(false);
  const closePopup = () => {
    setShow(false);
  };
  const init = {
    title: "",
    description: "",
    priority: "",
  };
  const [formData, setFormdata] = useState(init);
  const [search,setSearch] = useState("");
  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:5300/todo/get-todo",AuthHeader);
      console.log(res.data.data);
      setTodos(res.data.data);
      setTempTodos(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if(token.length > 0)
    fetchData();
  }, [token]);

  const handleChange= (e)=>{
    setSearch(e.target.value?.toLowerCase());
  }
  useEffect(()=>{
    console.log(search);
    const filterSearch = tempTodos.filter((todo)=>todo.title.toLowerCase().includes(search))
    setTodos(filterSearch)
    console.log(filterSearch);
    
  },[search])

  return (
    <div className="relative">
    <div className="bg-green-400 text-white flex justify-between">

      <div className="flex px-5 py-5 text-white  text-center text-6xl">
       <BiTask /> TODO LIST
      </div>
      {
       !token?
      <div className="flex justify-center items-center mr-5">
        <Link to={"/login"}>
        <button className="bg-blue-600 rounded-xl text-2xl  px-4 py-2 mr-4 hover:cursor-pointer">Login</button></Link>
        <Link to={"/register"}>
        <button className="bg-red-600 rounded-xl text-2xl px-4 py-2 mr-4 hover:cursor-pointer">Register</button>
        </Link>
      </div>:
      <div className="flex justify-center items-center mr-10">
        <button className="flex justify-center items-center" onClick={()=>(setShowInfo(true))}>
          <FaUserCircle size={30}/>
          <span className="text-3xl ml-1 mr-1">
          {user?.name}
          </span>
          <span className="pt-3">
          <FaChevronDown />
          </span>
        </button>
        
        
       {showInfo && (
        <div className="absolute top-30 right-5 z-50 bg-white text-black w-72 p-5 rounded-b-xl shadow-lg">
          <div className="flex justify-end">
            <button className="hover:cursor-pointer" onClick={()=>(setShowInfo(false))}>
              <ImCross />
            </button>
          </div>

            <h2 className="text-xl font-bold mb-3">
                User Information
            </h2>

            <div className="flex flex-col gap-2">
                <span>
                    <b>Name:</b> {user?.name}
                </span>

                <span>
                    <b>Email:</b> {user?.email}
                </span>

                <span>
                    <b>Address:</b> {user?.address}
                </span>

                <span>
                    <b>Phone:</b> {user?.phone}
                </span>
                <button><span className="bg-red-600 text-white px-3 py-2 hover:cursor-pointer" onClick={logOut}>Logout</span></button>
            </div>


        </div>
    )}
      </div>
      }
    </div>
      <div className="flex justify-center items-center mt-5">
        <div className="border-2 border-amber-400 flex justify-center py-2">
          <input
            type="text"
            placeholder="search"
            className="text-2xl px-3  w-full outline-none"
            onChange={handleChange}
            value={search}
          />
          <div className=" flex justify-center items-center px-2 ">
            <FaMagnifyingGlass size="20" />
          </div>
        </div>
        <div className="ml-5 flex justify-center items-center">
          <button
            className="text-2xl bg-blue-400 px-5 py-2 rounded-[7px] hover:cursor-pointer"
            onClick={() => {
              setShow(true);
            }}
          >
            Add
          </button>
        </div>
      </div>
      {showPopup && (
        <Popup
          closePopup={closePopup}
          formData={formData}
          setFormdata={setFormdata}
          setTodos={setTodos}
        />
      )}

      <Tasklist
        todos={todos}
        setTodos={setTodos}
        setShow={setShow}
        setFormdata={setFormdata}
      />
    </div>
  );
};
export default Navbar;
