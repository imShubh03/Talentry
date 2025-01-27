
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Login from './components/auth/Login.jsx'
import Signup from './components/auth/Signup.jsx'
import Home from '../src/Home/Home.jsx'
import Jobs from './Jobs/Jobs.jsx'
import Browse from './Browse/Browse.jsx'
import Profile from './Profile/Profile.jsx'
import JobDescription from './Jobs/JobDescription.jsx'
import Companies from './Admin/Companies.jsx'
import CreateCompanies from './Admin/CreateCompanies.jsx'
import CompanySetup from './Admin/CompanySetup.jsx'
import AdminJobs from './Admin/AdminJobs.jsx'
import PostJob from '../src/Admin/PostJob.jsx'
import Applicants from './Admin/Applicants.jsx'
import ProtectedRoute from './Admin/ProtectedRoute.jsx'
import Privacy from './Home/Privacy.jsx'
import TermsOfService from './Home/TermsOfService.jsx'

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    path: '/jobs',
    element: <Jobs />,
  },
  {
    path: '/jobs/:_id',
    element: <JobDescription />,
  },
  {
    path: '/browse',
    element: <Browse />,
  },
  {
    path: '/profile',
    element: <Profile />,
  },
  {
    path: '/privacy',
    element: <Privacy />
  },
  {
    path:'/terms',
    element:<TermsOfService/>
  },
  // Admin routes protected by ProtectedRoute
  {
    path: '/admin/companies',
    element: (
      <ProtectedRoute>
        <Companies />
      </ProtectedRoute>
    ),
  },
  {
    path: '/admin/companies/create',
    element: (
      <ProtectedRoute>
        <CreateCompanies />
      </ProtectedRoute>
    ),
  },
  {
    path: '/admin/companies/:id',
    element: (
      <ProtectedRoute>
        <CompanySetup />
      </ProtectedRoute>
    ),
  },
  {
    path: '/admin/jobs',
    element: (
      <ProtectedRoute>
        <AdminJobs />
      </ProtectedRoute>
    ),
  },
  {
    path: '/admin/jobs/create',
    element: (
      <ProtectedRoute>
        <PostJob />
      </ProtectedRoute>
    ),
  },
  {
    path: '/admin/jobs/:id/applicants',
    element: (
      <ProtectedRoute>
        <Applicants />
      </ProtectedRoute>
    ),
  },
]);
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
