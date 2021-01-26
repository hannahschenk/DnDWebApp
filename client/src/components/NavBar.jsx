import React, {useState} from 'react';
import {NavLink} from "react-router-dom";

const NavBar = () => {
    /* Sample and test; will refactor later*/
    const anon = [
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

    const authenticated = [
        {
            name: "Dashboard",
            link: "/dashboard" //replace with id
        },
        {
            /*
                technically, this link will change 
                to the route to sign out and that 
                sign out will lead to /; this is only for testing purposes
            */
            name: "Sign Out", 
            link: "/"
        }
    ]

    const [authenticateTest, setAuthenticateTest] = useState(true);
    /* End Sample and test */

    return (
        <section>
            
            <ul>
                {
                    anon.map((content) => 
                        <NavLink to={content.link}>
                            <li key={content.name}>{content.name}</li>
                        </NavLink>
                    )
                }
            </ul>
        </section>
    );
};

export default NavBar;