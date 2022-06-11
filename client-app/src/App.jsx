import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Routes } from 'react-router'
import { Outlet } from 'react-router-dom'
import { getCourses } from '../redux/actions'
import Courses from './components/courses/courses'
import Aside from './components/home/aside/aside'
import Home from './components/home/home'
import NavBarUser from './components/home/navbarUser/navBarUser'
import Landing from './components/landing/landing'
import Login from './components/login/login'
import Register from './components/register/register'
import './index.css'

function App () {
  const theme = useSelector((store) => store.theme)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getCourses())
  })
  const AppLayout = ({}) => (
    <>
      <Aside theme={theme} />
      <NavBarUser theme={theme} />
      <Outlet />
    </>
  )

  return (
    <div className='App-Body'>
      <Routes>
        <Route exact path='/' element={<Landing />} />
        <Route path='/Login' element={<Login />} />
        <Route path='/Register' element={<Register />} />
        <Route element={<AppLayout />}>
          <Route path='/Home' element={<Home theme={theme} />} />
          <Route path='/courses' element={<Courses />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App

//  <Route path="/register" element={<Register />}/>
