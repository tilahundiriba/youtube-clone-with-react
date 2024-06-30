import React, { useState } from 'react'
import './index.css';
import Video from './pages/video/Video';
import Home from './pages/home/Home';
import Navbar from './components/navbar/Navbar';
import { Route, Routes } from 'react-router-dom';
const App = () => {
  const [sidebar , setSidebar] = useState(true);
  return (
    <div>

      <Navbar setSidebar={setSidebar}/>
      <Routes>
        <Route path='/' element={<Home sidebar={sidebar}/>} />
        <Route path='/video/:categoryId/:videoId' element={<Video />} />
      </Routes>
    </div>
  )
}

export default App;
