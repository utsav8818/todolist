
import { RxCross1 } from "react-icons/rx";
import { ImCross } from "react-icons/im";
import { useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "./contextprovider/AuthContext";

const Popup = ({closePopup,formData,setFormdata}) =>{
     const {AuthHeader,setTodos} = useContext(AuthContext);

    const handleData =(e)=>{
        setFormdata((prev)=>({...prev, [e.target.name]: e.target.value}));
        // console.log(e.target.name +":"+ e.target.value);
    }

    const handleSubmit = async (e)=>{
        e.preventDefault();
       
       const res =  await axios.post(`http://localhost:5300/todo/post-todo`,formData,AuthHeader);
        console.log(res.data.data);
        setTodos(res.data.data);
        

        setFormdata({
            title:"",
            description:"",
            priority:""
        });
        closePopup();
    }

    return(
        <div className=" fixed top-0 bottom-0 left-0 right-0 flex justify-center items-center bg-lime-200/50">


        <div className=" w-2xl shadow-2xl bg-white">
            <div className=" flex justify-end py-4 pr-6 mr-5"><ImCross className="hover:cursor-pointer text-red-500 text-2xl" onClick={closePopup} /></div>
            <div className="text-4xl text-center mt-4 mb-4">Add Todo</div>
            <form action="" className="flex flex-col justify-center px-5 py-3" onSubmit={handleSubmit}>
                <input type="text"  onChange= {handleData} value={formData.title} name="title" placeholder="title" className="text-3xl border-2 border-red-400 mb-2 p-2"/>
                <textarea name="description" onChange={handleData} value={formData.description} placeholder="description" className="text-3xl border-2 border-red-400 mb-2 py-5 px-2" />
                <select name="priority" onChange={handleData} value={formData.priority}  className="text-3xl border-2 border-red-400 mb-2 p-2">
                    <option value="">Set priority</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">low</option>
                </select>
                <div>
                <button type="submit" className="bg-blue-400 hover:cursor-pointer py-2 px-4 mb-2 text-2xl rounded-[7px] mt-2">Submit</button>
                </div>
            </form>
            
        </div>
        </div>
    )
}
export default Popup;