import React from 'react';
import './Home.css';
import Sidebar from '../../components/Sidebar/Sidebar';
import VCards from '../../components/cards/VCards';
const Home = ({ sidebar }) => {
  return (
    <>
      <Sidebar sidebar={sidebar} />
      <div className={`container ${sidebar ?"":'large-container'}`}>
        <VCards />
      </div>
    </>
  )
}

export default Home;
