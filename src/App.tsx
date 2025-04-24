import { Provider } from 'react-redux';
import DashBoard from './components/DashBoard'
import Navbar from './components/Navbar'
import {store} from "./store/store";

const App = () => {
  return (
  <Provider store={store}>
    <div className='flex flex-col overflow-x-hidden'>
        <Navbar/>
        <DashBoard/>
    </div>
  </Provider>
  )
}

export default App