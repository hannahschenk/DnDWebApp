import React, {useState, useEffect} from 'react';
import {NavLink, useHistory} from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import {testBackEnd} from "./../utils/api"; 
import constants from "./../utils/constants"
import axios from "axios";
import { useCharacter } from './../state/logic';
import * as ACTION from "./../state/actions"

const NavBar = () => {

    const { character,setCharacter } = useCharacter();
    const {isAuthenticated, logout, loginWithRedirect, isLoading} = useAuth0();
    const [navContent, setNavContent] = useState([]);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        console.log("header: " + isAuthenticated);
        if(isAuthenticated){
            setNavContent(authenticatedNav)
        } else{

            setNavContent(anonNav)
        }

    }, [isAuthenticated, isLoading])

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
            clickHandler: () => { //clear the state because create character = new character
                setCharacter({ type: ACTION.RESET_CHARACTER });
                localStorage.removeItem("character");
            },
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