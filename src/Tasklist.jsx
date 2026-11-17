import React, { useContext, useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import axios from "axios";
import { AuthContext } from "./contextprovider/AuthContext";
import EditPopup from "./EditPopup";
import { toast } from "react-toastify";

const Tasklist = ({ todos, setTodos, setShow, setFormdata }) => {
  console.log(todos, "todo");
  const { token, AuthHeader,setTempTodos } = useContext(AuthContext);
  const [editData, setEditData] = useState({});
  const [showEdit, setShowEdit] = useState(false);

  const deleteTodo = async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost:5300/todo/delete-todo/${id}`,
        AuthHeader,
      );
      setTodos(res.data.data);
      setTempTodos(res.data.data);
      toast.success("todo deleted successfully");
    } catch (err) {
      toast.warn("error while deleting the data");
    }
  };
  const editTodo = (todo) => {
    setEditData(todo);
    setShowEdit(true);
  };
  if (todos.length == 0) {
    return (
      <div className=" mt-4 flex flex-col justify-center items-center h-[30rem] mx-6  shadow-2xl rounded-xl">
        <div className=" h-[16rem] w-[25rem] mb-5">
          <img src="/to-do.jpg" className="w-full h-full" />
        </div>
        <button>
          <span
            className="bg-blue-600 text-white px-4 py-4 rounded-xl"
            onClick={() => {
              setShow(true);
            }}
          >
            Add Todo
          </span>
        </button>
      </div>
    );
  }
  return (
    <div className="px-5 mt-5">
      <h2 className="text-4xl mb-5">My Todos</h2>
      <div className=" grid grid-cols-3 gap-2">
        {todos.map((todo, index) => (
          <div key={index}>
            <div className=" border-4 border-red-500  py-3 mb-2">
              <div className="py-3  text-center uppercase text-4xl font-bold">
                {todo.title}
              </div>
              <div className="py-3 text-2xl mb-2 text-center">
                {todo.description}
              </div>
              <div className="flex justify-center">
                <span
                  className={`py-1 px-2 mb-2 text-center rounded-[7px] capitalize priority${todo.priority.toLowerCase()}`}
                >
                  {todo.priority}
                </span>
              </div>
              <div className="buttonContainer flex gap-4 py-4 justify-center text-white">
                <button
                  className="bg-blue-500 px-5 py-3 rounded-[5px] text-2xl hover:cursor-pointer"
                  onClick={() => {
                    editTodo(todo);
                  }}
                >
                  <FaEdit />
                </button>
                <button
                  className="bg-red-500 px-5 py-3 rounded-[5px] text-2xl hover:cursor-pointer hover:shadow-gray-500"
                  onClick={() => deleteTodo(todo.id)}
                >
                  <MdDeleteForever />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {showEdit && (
        <EditPopup todoItem={editData} closePopup={() => setShowEdit(false)} />
      )}
    </div>
  );
};

export default Tasklist;
