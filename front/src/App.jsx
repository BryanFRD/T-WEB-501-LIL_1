import { BrowserRouter, Route, Routes } from 'react-router-dom'
import BaseScreen from './screens/BaseScreen'
import HomeScreen from './screens/HomeScreen'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='*' element={<BaseScreen />}>
          <Route index element={<HomeScreen />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
