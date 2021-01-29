import React, {useState, useEffect} from 'react';
import {NavLink, useHistory} from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import {testBackEnd} from "./../utils/api"; 
import constants from "./../utils/constants"
import axios from "axios";
const NavBar = () => {
    const {isAuthenticated, logout, loginWithRedirect} = useAuth0();
    const [navContent, setNavContent] = useState([]);

    useEffect(() => {
        (isAuthenticated) ? 
            setNavContent(authenticatedNav) :
            setNavContent(anonNav)

    }, [isAuthenticated])

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
            clickHandler: () => loginWithRedirect(),
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

    const [authenticateTest, setAuthenticateTest] = useState(true);
    /* End Sample and test */

    return (
        <section className="navBar">
            {/*
            <button onClick={loginWithRedirect}> LOG IN </button>
            <button onClick={logout}> LOG OUT </button>

            <button onClick={testAuth}> test Auth </button>
            */}
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
                                onClick={content.clickHandler}
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