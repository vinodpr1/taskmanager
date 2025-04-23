import React from 'react'
import Button from './Button'

const Navbar = () => {
  return (
    <div className='w-screen flex items-center py-4 px-6 shadow-2xl'>
       <div className='container flex items-center mx-auto justify-between'>
         <div>
           <h1 className='text-xl font-bold text-gray-600'>Taskify</h1>
         </div>
         <div className='flex gap-4'>
            <ul className='flex items-center gap-4'>
                <li>About</li>
                <li>Contact</li>
                <li>Try now</li>
            </ul>
            <Button text={"Login"}/>
         </div>
       </div>
    </div>
  )
}

export default Navbar