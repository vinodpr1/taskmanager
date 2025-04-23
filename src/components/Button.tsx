
const Button = ({text}:{text:string }) => {
  return (
    <button type="submit" className='flex items-center justify-center px-2 py-1 bg-indigo-500 rounded text-white cursor-pointer'>{text}</button>
  )
}

export default Button