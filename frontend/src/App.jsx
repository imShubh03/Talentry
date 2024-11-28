
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Login from './components/auth/Login.jsx'
import Signup from './components/auth/Signup.jsx'
import Home from '../src/Home/Home.jsx'
import Jobs from './Jobs/Jobs.jsx'
import Browse from './Browse/Browse.jsx'
import Profile from './Profile/Profile.jsx'
import JobDescription from './Jobs/JobDescription.jsx'

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
  },
  {
    path:'/jobs',
    element:<Jobs/>
  },
  {
    path:'/description/:id',
    element:<JobDescription/>
  },
  {
    path:'/browse',
    element:<Browse/>
  },
  {
    path:'/profile',
    element:<Profile/>
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
