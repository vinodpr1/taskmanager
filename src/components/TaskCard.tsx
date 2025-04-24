import { Check, SquareCheckBig, Trash } from 'lucide-react'
import React from 'react'
import { deleteTask, toggleTask } from '../store/taskSlice';
import { useDispatch } from 'react-redux';

interface ITaskCard { 
    title: string,
    description: string,
    isCompleted: boolean,
    id: any,
}

const TaskCard: React.FC<ITaskCard> = ({title, description, isCompleted, id}) => {
    
    const dispatch = useDispatch();

    const handleDelete=(id: any)=>{
      dispatch(deleteTask(id))
    }
 
    const handleComplete=(id: any)=>{
       dispatch(toggleTask(id));
    }


  return (
    <div className='min-h-32 w-64 bg-gray-300 shadow-2xl rounded p-4'>
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