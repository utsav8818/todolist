import { ImCross } from "react-icons/im";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./contextprovider/AuthContext";
import axios from 'axios';
import { toast } from "react-toastify";

const EditPopup = ({ closePopup, todoItem }) => {
  const editInit = {
    title: todoItem?.title || "",
    description: todoItem?.description || "",
    priority: todoItem?.priority || "",
    id:todoItem?.id || null
  };
  const {AuthHeader,setTodos,setTempTodos} = useContext(AuthContext);
  const [formData, setFormdata] = useState(editInit);
  const handleData = (e) => {
    setFormdata((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    // console.log(e.target.name +":"+ e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const res = await axios.put(`http://localhost:5300/todo/update-todo/${formData.id}`,formData,AuthHeader);
      setTodos(res.data.data);
      setTempTodos(res.data.data);
      closePopup();
      toast.success("todo updated successfully");
      
    }catch(err){
      toast.warn("failure while updating the todo");
    }
  };
  return (
    <div className=" fixed left-0 right-0 top-0 bottom-0 bg-lime-200/50 flex justify-center items-center">
      <div className=" w-2xl shadow-2xl bg-white">
        <div className=" flex justify-end py-4 pr-6 mr-5 ">
          <ImCross
            className="hover:cursor-pointer text-red-500 text-2xl"
            onClick={closePopup}
          />
        </div>
        <div className="text-4xl text-center mt-4 mb-4">Edit Todo</div>
        <form
          action=""
          className="flex flex-col justify-center px-5 py-3"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            onChange={handleData}
            value={formData.title}
            name="title"
            placeholder="title"
            className="text-3xl border-2 border-red-400 mb-2 p-2"
          />
          <textarea
            name="description"
            onChange={handleData}
            value={formData.description}
            placeholder="description"
            className="text-3xl border-2 border-red-400 mb-2 py-5 px-2"
          />
          <select
            name="priority"
            onChange={handleData}
            value={formData.priority}
            className="text-3xl border-2 border-red-400 mb-2 p-2"
          >
            <option value="">Set priority</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">low</option>
          </select>
          <div>
            <button
              type="submit"
              className="bg-blue-400 hover:cursor-pointer py-2 px-4 mb-2 text-2xl rounded-[7px] mt-2"
            >
              update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default EditPopup;
