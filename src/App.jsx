import { Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './views/Login/Login'
import Trips from './views/Trips/Trips'
import RequireAuth from './components/RequireAuth/RequireAuth'

function App() {

  return (
    <>
      <Routes>
        <Route path='/login' element={<Login />} />

        <Route element={<RequireAuth />}>
          <Route path='/' element={<Trips />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
