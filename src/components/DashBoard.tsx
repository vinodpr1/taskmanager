import React, { useEffect, useState } from 'react'
import TaskCard from './TaskCard'
import Button from './Button'
import { X } from 'lucide-react';
import axios from 'axios';
// import { tasks } from '../data/tasks';

export interface ITask {
    id: string,
    title: string,
    description: string,
    isCompleted: boolean
}

const DashBoard = () => {

  const [modalState, setModalState] = useState(false);  
  const [task, setTask] = useState<ITask[]>([]);
  console.log(task);

  useEffect(()=>{
     const fetchaData=async()=>{
        const data = await axios.get("../data/tasks");
        // console.log("dataaa", data);
     }

     fetchaData();
  },[])
 
  return (
    <div className='pt-8'>
     <div className='container flex mx-auto'>
        <div className='flex flex-col gap-4 justify-between w-full'>
            <div className='flex justify-between'>
                {/* <div>FIlters</div> */}
                <div onClick={()=>setModalState(!modalState)}><Button text={"Create Task"}/></div>
            </div>
            {
            task.length>0? 
            <div className='w-full mx-auto grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-x-4 gap-y-8'>
                 { 
                   task.map((ts, index)=>{
                    return(
                        <TaskCard key={index} title={ts.title} description={ts.description} isCompleted={ts.isCompleted} id={ts.id} setTask={setTask}/>
                    )
                   })   
                 }
            </div>
            :
            <div>
                Create New Tasks there is no tasks
            </div>
           }
        </div>
     </div>
     {
       modalState && 
       <div className='flex opacity-100 justify-center items-centers'>
         <TaskModal task={task} setTask={setTask} setModalState={setModalState}/>
       </div>
     }
    </div>
  )
}

export default DashBoard




interface IModalTask {
    task : any,
    setTask: React.Dispatch<React.SetStateAction<ITask[]>>,
    setModalState: any
}

const TaskModal:React.FC <IModalTask> = ({task, setTask, setModalState }) =>{

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleChange = (e:any) =>{
      e.preventDefault();
      const {name, value}  = e.target;
      if(name=="title"){
        setTitle(value)
      }else{
        setDescription(value)
      }
    }

    const handleTaskCreation=()=>{
        setTask((prev)=>[...prev, {id: crypto.randomUUID(), title, description, isCompleted: false}]);
        setDescription("");
        setTitle("");
    }

    return (
        <div className='absolute left-[35vw] top-[12vh] bg-gray-300 inset-0 z-50 h-[50vh] w-[30vw] rounded-lg'>
            <div onClick={(prev)=>setModalState(!prev)} className='p-1'>
              <X />
            </div>
             <div className='p-2 flex flex-col gap-4'>
                <div className='flex flex-col gap-2'>
                    <label htmlFor="title">Title</label>
                    <input onChange={handleChange} value={title} name="title" type="text" className='border rounded px-4 py-1' placeholder='Enter Title...'/>
                </div>
                <div className='flex flex-col gap-2'>
                    <label htmlFor="title">Description</label>
                    <input onChange={handleChange} value={description} name="description" type="text" className='border rounded px-4 py-1' placeholder='Enter Description...'/>
                </div>
               <button 
                   onClick={handleTaskCreation}
                   className='flex items-center w-16 justify-center px-2 py-1 bg-indigo-500 rounded text-white cursor-pointer'>
                    Create
               </button>
             </div>
        </div>
    )
}