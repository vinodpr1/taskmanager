import { Check, SquareCheckBig, Trash } from 'lucide-react'
import React from 'react'

interface ITaskCard { 
    title: string,
    description: string,
    isCompleted: boolean,
    id: any,
    setTask: any
}

const TaskCard: React.FC<ITaskCard> = ({title, description, isCompleted, id, setTask}) => {

    const handleDelete=(id: any)=>{
        console.log("Hello", id);
        setTask((prev:any)=>{
            const alltask = [...prev];
            const filteredtask = alltask.filter((task)=>{
               return task.id!=id;
            })
            return filteredtask;
        })
    }
 
    const handleComplete=(id: any)=>{
       
            setTask((prev: any) =>
                prev.map((task: any) =>
                  task.id === id
                    ? { ...task, isCompleted: !task.isCompleted }
                    : task
                )
              );
        
    }


  return (
    <div className='min-h-32 w-64 border shadow-2xl rounded p-4'>
        <div className='flex justify-between items-center'>
          <h2 className='text-lg font-semibold text-gray-700'>{title}</h2>
          <SquareCheckBig className={`h-5 w-5 ${isCompleted ? "text-green-700": "text-gray-700"}`}/>
        </div>
        <p className='text-sm text-gray-500'>{description.slice(0,50)}</p>
        <div className='flex  p-2 rounded mt-4 items-center justify-between bg-gray-200'>
            <button onClick={()=>handleComplete(id)} className='cursor-pointer'><Check/></button>
            <button onClick={()=>handleDelete(id)} className='cursor-pointer'><Trash /></button>
        </div>
    </div>
  )
}

export default TaskCard