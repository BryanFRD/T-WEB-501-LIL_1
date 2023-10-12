import { BrowserRouter, Route, Routes } from 'react-router-dom'
import BaseScreen from './screens/BaseScreen'
import HomeScreen from './screens/HomeScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import PlaceAdScreen from './screens/PlaceAdScreen'
import { useContext, useEffect } from 'react'
import { UserContext } from './contexts/UserContext'
import ErrorScreen from './screens/ErrorScreen'

function App() {
  const {user} = useContext(UserContext);
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<BaseScreen />}>
          <Route index element={<HomeScreen />}/>
          {!user && (
            <>
              <Route path='login' element={<LoginScreen />}/>
              <Route path='register' element={<RegisterScreen />}/>
            </>
          )}
          {user?.isCompany &&
            <Route path='place_ad' element={<PlaceAdScreen/>}/>
          }
          <Route path='*' element={<ErrorScreen/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
