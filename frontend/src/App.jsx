
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Login from './components/auth/Login.jsx'
import Signup from './components/auth/Signup.jsx'
import Home from '../src/Home/Home.jsx'

const appRouter = createBrowserRouter([
  {
    path:'/',
    element:<Home/>
  },
  {
    path:'/login',
    element:<Login/>
  },
  {
    path:'/signup',
    element:<Signup/>
  }
])

function App() {
  
  return (
    <>
      <div className=' dark:bg-slate-800 dark:text-white'>
        <RouterProvider router={appRouter} />
      </div>
    </>
  )
}

export default App
