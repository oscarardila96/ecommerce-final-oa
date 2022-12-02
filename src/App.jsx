import './App.css'
import { HashRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Purchases from './pages/Purchases'
import Login from './pages/Login'
import ProductId from './pages/ProductId'
import Navbar from './components/Navbar'
import LoadingScreen from './components/LoadingScreen'
import { useSelector } from 'react-redux'
import { Container } from 'react-bootstrap'
import ProtectedRoutes from './components/ProtectedRoutes'
import NewUser from './pages/NewUser'

function App() {

  const loading = useSelector(state => state.loading)

  return (
    <div className="App">
      <HashRouter>
        <Navbar />
        {loading && <LoadingScreen />}
        <Container className="my-5">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route element={<ProtectedRoutes />}>
              <Route path="/purchases" element={<Purchases />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/newuser" element={<NewUser />} />
            <Route path="/product/:id" element={<ProductId />} />
          </Routes>
        </Container>
      </HashRouter>
    </div>
  )
}

export default App
