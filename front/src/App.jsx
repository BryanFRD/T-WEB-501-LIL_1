import { BrowserRouter, Route, Routes } from 'react-router-dom'
import BaseScreen from './screens/BaseScreen'
import HomeScreen from './screens/HomeScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<BaseScreen />}>
          <Route index element={<HomeScreen />}/>
          <Route path='login' element={<LoginScreen />}/>
          <Route path='register' element={<RegisterScreen />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
