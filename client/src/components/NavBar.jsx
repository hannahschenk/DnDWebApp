import React, {useState, useEffect} from 'react';
import {NavLink, useHistory} from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import {testBackEnd} from "./../utils/api"; 
import constants from "./../utils/constants"
import axios from "axios";
const NavBar = () => {
    const {isAuthenticated} = useAuth0();
    const [navContent, setNavContent, logout] = useState([]);

    useEffect(() => {
        (isAuthenticated) ? 
            setNavContent(authenticatedNav) :
            setNavContent(anonNav)

    }, [isAuthenticated])

    /* Sample and test; will refactor later*/
    const anonNav = [
        {
            name: "Home",
            link: "/" //replace with id
        },
        {
            name: "Sign In",
            link: "#" //replace with id of section
        },
        {
            name: "About Us",
            link: "#"
        }
    ]

    const authenticatedNav = [
        {
            name: "Dashboard",
            link: "/dashboard" //replace with id
        },
        {
            name: "Create Character",
            link: "/create-character" //replace with id
        }
    ]

    const [authenticateTest, setAuthenticateTest] = useState(true);
    /* End Sample and test */

    return (
        <section>
            {/*
            <button onClick={loginWithRedirect}> LOG IN </button>
            <button onClick={logout}> LOG OUT </button>

            <button onClick={testAuth}> test Auth </button>
            */}
            <ul>
                {
                    navContent.map((content) => 
                        <NavLink key={content.name} to={content.link}>
                            <li>{content.name}</li>
                        </NavLink>
                    )
                }
                {
                    isAuthenticated && 
                    <button onClick={logout}>
                        Sign Out
                    </button>
                }
                
            </ul>
        </section>
    );
};

export default NavBar;