import React, { useEffect,  useRef, useState } from 'react';
import todo_icon from '../assets/todo_icon.png';
import Todolist from './Todolist';

const Todo = () => {
    const [todoList, setTodoList] = useState(localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")) : []);
    const inputRef = useRef();

    const add =()=>{
        const inputText = inputRef.current.value.trim();
        if(inputText ===""){
            return null;
        }
        const newTodo ={
            id : Date.now(),
            text : inputText,
            isComplete : false
        }
        setTodoList((prev) =>[...prev, newTodo]);
        inputRef.current.value = ""; 
    }

    const deleteTodo = (id) =>{
        setTodoList((prvTodo) =>{
            return prvTodo.filter((todo) => todo.id != id);
        })
    }

    const toggle = (id)=>{
        setTodoList((prvTodo) =>{
            return prvTodo.map((todo) =>{
                if(todo.id === id){
                    return {...todo, isComplete : !todo.isComplete}
                }
                return todo;
            })
        })
    }
    
    useEffect(()=>{
        localStorage.setItem("todos", JSON.stringify(todoList));
    } ,[todoList])
  return (
    <div className="bg-white flex flex-col place-self-center w-11/12 max-w-md min-h-[550px] p-7 rounded-xl">

    {/* ----------title---------- */}
    <div className="flex items-center mt-7 gap-2">
        <img src={todo_icon} className="w-8 " />
        <h1 className="text-3xl font-semibold">To-do List</h1>
    </div>


    {/* -------input box ---------- */}
    <div className='flex items-center my-7 bg-gray-200 rounded-full'>
        <input ref={inputRef} className='bg-transparent border-0 outline-none flex-1 h-14 pl-6 pr-2  placeholder:text-slate-600' type="text" placeholder='Add your Task' />
        <button onClick={add} className='border-none rounded-full bg-orange-600 h-14 w-32 text-white text-lg font-medium cursor-pointer'>ADD +</button>
    </div>

    {/* --------list item-------- */}
    <div>
        {todoList.map((item,index) =>{
            return <Todolist key={index} text={item.text} id={item.id} isComplete={item.isComplete} deleteTodo={deleteTodo} toggle={toggle}/>
          
        })}
    </div>
    </div>
  )
}

export default Todo