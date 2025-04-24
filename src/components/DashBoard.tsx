import React, { useEffect, useState } from 'react'
import TaskCard from './TaskCard'
import Button from './Button'
import { X } from 'lucide-react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

import { addTask,  setFilter,  setTasks} from '../store/taskSlice';

export interface ITask {
    id: string,
    title: string,
    description: string,
    isCompleted: boolean
}

const DashBoard = () => {

  const [modalState, setModalState] = useState(false);  
  const [loading, setLoading] = useState<boolean>(false);

  const storeTask = useSelector((state: any) => state.task.tasks);
  const filter = useSelector((state: any) => state.task.filter);
  const dispatch = useDispatch();
  console.log("ALLL Stored tasksss", storeTask);
  
  useEffect(()=>{
     const fetchaData=async ()=>{
      setLoading(true);
      try {
        const response = await axios.get<ITask[]>('/tasks.json');
        dispatch(setTasks(response.data));
      } catch (error) {
        console.error('Error fetching tasks:', error);
      } finally{
        setLoading(false);
      }
     }
     fetchaData();
  },[])

  const filteredTasks = storeTask.filter((task: ITask) => {
    if (filter === 'completed') return task.isCompleted;
    if (filter === 'notCompleted') return !task.isCompleted;
    return true;
  });
 

  return (
    <div className='pt-8 pb-4'>
     <div className='container flex mx-auto'>
        <div className='flex flex-col gap-4 justify-between w-full'>
            <div className='flex gap-12'>
                <div onClick={()=>setModalState(!modalState)}><Button text={"Create Task"}/></div>
                <div onClick={() => dispatch(setFilter('all'))}><Button text={"All Tasks"}/></div>
                <div onClick={() => dispatch(setFilter('completed'))}><Button text={"Completed Tasks"}/></div>
                <div onClick={() => dispatch(setFilter('notCompleted'))}><Button text={"Pending Tasks"}/></div>
            </div>
            {
            filteredTasks.length>0? 
            <div className='w-full mx-auto  grid grid-cols-1 md:grid-cols-4 sm:grid-cols-2 gap-x-4 gap-y-8'>
                 { 
                   filteredTasks.map((ts:any, index:any)=>{
                    return(
                        <TaskCard key={index} title={ts.title} description={ts.description} isCompleted={ts.isCompleted} id={ts.id}/>
                    )
                   })   
                 }
            </div>
            :
            <div>
                <h1>No tasks</h1>
            </div>
           }
        </div>
     </div>
     {
       modalState && 
       <div className='flex opacity-100 justify-center items-centers'>
         <TaskModal setModalState={setModalState}/>
       </div>
     }
    </div>
  )
}

export default DashBoard





interface IModalTask {
    setModalState: React.Dispatch<React.SetStateAction<boolean>>
}

const TaskModal:React.FC <IModalTask> = ({setModalState }) =>{

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const dispatch = useDispatch();

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
       dispatch(addTask({
          id: crypto.randomUUID(),
          title,
          description,
          isCompleted: false,
        }));  
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