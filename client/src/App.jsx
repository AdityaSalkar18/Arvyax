import {BrowserRouter, Routes, Route} from "react-router-dom"
import './App.css'
import Landing from "./components/Landing/Landing"
import Login from "./components/Auth/Login"
import Register from "./components/Auth/Register"

import Home from "./components/Home/Home"
import MyActivity from "./components/MyActivity/MyActivity"

function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Landing/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register/>} />

      <Route path="/home" element={<Home/>} />
       <Route path="/myactivity" element={<MyActivity/>} />
   
    </Routes>
    </BrowserRouter>
     
      
    </>
  )
}

export default App
