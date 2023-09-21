import React from 'react'
import Login from './Login'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Dashboard from './Dashboard'
import Create from './Create'
import Profile from './pages/profile'
import Logout from './pages/logout'
import Users from './pages/Users'
import Read from './Read'
import Edit from './Edit'

import Dashcontent from './Dashcontent'
import 'bootstrap/dist/css/bootstrap.min.css'
function App() {
  return (
    <div>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Dashboard />}>
        <Route path='/' element={<Dashcontent />}></Route>
        <Route path='/pages/Users' element={<Users />}></Route>
        <Route path='/pages/profile' element={<Profile />}></Route>
        <Route path='/pages/logout' element={<Logout />}></Route>
        
      </Route>
      <Route path='/login' element={<Login />}></Route>
      <Route path='/Create' element={<Create />}></Route>
      <Route path='/Read/:id' element={<Read />}></Route>
      <Route path='/Edit/:id' element={<Edit />}></Route>
    </Routes>
    </BrowserRouter>
    
    </div>
    
  )
}

export default App
