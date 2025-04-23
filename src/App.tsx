import DashBoard from './components/DashBoard'
import Navbar from './components/Navbar'

const App = () => {
  return (
    <div className='flex flex-col w-screen'>
        <Navbar/>
        <DashBoard/>
    </div>
  )
}

export default App