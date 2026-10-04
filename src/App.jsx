import { Routes, Route } from 'react-router-dom'
import NotFound from './pages/NotFound'
import Header from './components/Header'
import Contacts from './pages/Contacts'
import Home from './pages/Home'
import Ideas from './pages/Ideas'
import Idea from './components/Idea'
import About from './pages/About'
import Login from './pages/Login'
import Register from './pages/Register'
import Logout from './pages/Logout'

import './App.css'

function App() {
  return (<>
    <Header />
    <main className="container">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ideas" element={<Ideas />} />
        <Route path="/ideas/:id" element={<Idea />} />
        <Route path="/about" element={<About />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>
  </>)
}

export default App
