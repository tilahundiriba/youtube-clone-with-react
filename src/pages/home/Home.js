import React, { useState } from 'react';
import './Home.css';
import Sidebar from '../../components/Sidebar/Sidebar';
import VCards from '../../components/cards/VCards';
const Home = ({ sidebar }) => {
const [category, setCategory] = useState(0);

  return (
    <>
      <Sidebar sidebar={sidebar} category={category} setCategory={setCategory} />
      <div className={`container ${sidebar ?"":'large-container'}`}>
        <VCards category={category}/>
      </div>
    </>
  )
}

export default Home;
