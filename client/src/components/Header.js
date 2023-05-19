import React, { useState, useEffect } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'
import "./HeaderStyles.css"
const Header = () => {
    const [isFixed, setIsFixed] = useState(false);
    const navigate = useNavigate()
    const logout = async() => {
        localStorage.removeItem("AdminInfo")
        await toast.warning("Account logout Successfully")
        navigate("/")
        window.location.reload(false)
    }
    // Function to handle scroll event and update state
    const handleScroll = () => {
        if (window.pageYOffset > 0) {
            setIsFixed(true);   
        } else {
            setIsFixed(false);
        }
    };

    // Add event listener for scroll event on component mount
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <Navbar style={{fontWeight:"600",padding:"10px"}} bg="info" variant="dark" expand="lg" fixed={isFixed ? 'top' : ''}>
            <Navbar.Brand className='navLink' href="/">Home</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbar-nav" />
            <Navbar.Collapse id="navbar-nav">
                <Nav className="mr-auto">
                    <Link className='navLink mr-3' to="/addApplicant">Add Applicant</Link>
                    <Link className='navLink ' to="/update/one">Change Applicant Status</Link>
                </Nav>
                <Nav className="mr-3">
                    Welcome to {localStorage.getItem("AdminInfo")&& JSON.parse(localStorage.getItem("AdminInfo")).name}  
                </Nav>
                <Nav>
                    <Link className='navLink' onClick={logout} >Logout</Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default Header;

// import React from 'react'
// import "./HeaderStyles.css"
// import { Link, useNavigate } from 'react-router-dom'
// import { toast } from 'react-toastify'
// const Header = () => {
    // const navigate=useNavigate()
    // const logout = () => {
    //     localStorage.removeItem("AdminInfo")
    //     toast.warning("Account Logout Successfully")
    //     navigate("/")
    //     window.location.reload(false)
    // }
    
   
//     return (
//         <div id="header" className='header'>
//             <ul className='header_ul'>
//                 <li><Link to="/">Home</Link></li>
//                 <li><Link to="/addApplicant">Add Applicant</Link></li>
//                 <li><Link to="/update/one">Update Applicant Status</Link></li>
//                 <li onClick={() => logout()}>Logout</li>
//             </ul>
//         </div>
//     )
// }


// export default Header