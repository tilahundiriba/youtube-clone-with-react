import React from 'react'
import './Navbar.css';
import { Link } from 'react-router-dom';
import MenuIcon from '../../assets/menu.png';
import Logo from '../../assets/logo.png';
import Search from '../../assets/search.png';
import Upload from '../../assets/upload.png';
import More from '../../assets/more.png';
import Notification from '../../assets/notification.png';
import Profile from '../../assets/jack.png';
const Navbar = ({setSidebar}) => {
    return (
        <nav className='flex-div'>
            <div className='nav-left flex-div'>
                <img src={MenuIcon} onClick={()=>setSidebar(prev => prev === false ? true :false)} className='menu-icon' alt="Menu Icon" />
                <Link to='/'>
                    <img src={Logo} className='logo' alt="Logo" />
                </Link>
                
            </div>

            <div className="nav-middle flex-div">
                <div className="search-box flex-div">
                    <input type="text" placeholder='Search' />
                    <img src={Search} alt="Search" />
                </div>

            </div>
            <div className="nav-right flex-div">
                <img src={Upload} alt="" />
                <img src={More} alt="" />
                <img src={Notification}alt="" />
                <img src={Profile} alt="" className='user-icon' />
            </div>
        </nav>
    )
}

export default Navbar
