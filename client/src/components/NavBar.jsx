import React, {useState, useEffect} from 'react';
import {NavLink, useHistory} from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import {testBackEnd} from "./../utils/api"; 
import constants from "./../utils/constants"
import axios from "axios";
const NavBar = () => {
    const {isAuthenticated, logout, loginWithRedirect} = useAuth0();
    const [navContent, setNavContent] = useState([]);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        (isAuthenticated) ? 
            setNavContent(authenticatedNav) :
            setNavContent(anonNav)

    }, [isAuthenticated])

    useEffect(() => {
        console.log(menuOpen)
    }, [menuOpen])
    /* Sample and test; will refactor later*/
    const anonNav = [
        {
            name: "Home",
            link: "/", //replace with id
            clickHandler: () => {},
        },
        {
            name: "Sign In",
            link: "#",
            clickHandler: () => loginWithRedirect()
        },
        {
            name: "About Us",
            link: "#", 
            clickHandler: () => {},
        }
    ]

    const authenticatedNav = [
        {
            name: "Dashboard",
            link: "/dashboard", 
            clickHandler: () => {},
        },
        {
            name: "Create Character",
            link: "/create-character",
            clickHandler: () => {},
        },
        {
            name: "Sign Out",
            link: "#",
            clickHandler: () => logout()
        }

    ]

    const clickNavHandler =(content) => {
        setMenuOpen(!menuOpen);
        content.clickHandler();
    }
    
    return (
        <section className="navBar">

            <h1 className="logo">DnD Character Creator</h1>
            
            <label className="header__navTriggerIcon" htmlFor="burgerNav">
                <i className="fas fa-bars fa-2x"></i>
            </label>
            <input className="header__navTrigger" 
                type="checkbox" 
                id="burgerNav" 
                onChange={() => setMenuOpen(!menuOpen)} 
                checked={menuOpen}
            />

            <ul className="navContainer">
                {
                    navContent.map((content) => 
                        <NavLink 
                            key={content.name}
                            to={content.link}
                            className="navContainer__link"
                        >
                            <li 
                                className="navContainer__listItem"
                                onClick={() => clickNavHandler(content)}
                            >
                                {content.name}
                            </li>
                        </NavLink>
                    )
                }
                
            </ul>
        </section>
    );
};

export default NavBar;