import React, {useState, useEffect} from 'react';
import CharacterSheetCard from "./../../components/characterSheetCard";
import {useAuth0, withAuthenticationRequired} from "@auth0/auth0-react";

const DashboardPage = () => {

    const {isAuthenticated, user} = useAuth0();

    useEffect(() => {console.log(user)}, [])

    /* dummy character sheet data*/
    let characterSheets = [
        {
            name: "name1",
            race: "race1",
            class: "class1"
        },
        {
            name: "name2",
            race: "race2",
            class: "class2"
        },
        {
            name: "name3",
            race: "race3",
            class: "class3"
        },

    ]
    /* end dummy character sheet data*/

    return (
        <main className="dashboardMain">
            <section className="dashBoard__profile">
                {/* I'll leave this section if we want to render anything about the user*/}
                <img className="profile__image" src={user.picture}/>
                <article className = "profile__details">
                    <h4 className="profile__details__title">User Profile</h4>
                    <ul className="profile__details__listContainer">
                        <li>
                            <label htmlFor="userName"> Name </label> 
                            <input type="text" id="userName" value={user.name} readOnly/>
                        </li>
                        <li>
                            <label  htmlFor="userEmail"> Email </label> 
                            <input type="text" id="userEmail" value={user.email} readOnly/>
                        </li>
                        <li>
                            <label htmlFor="numOfCharSheets"> Number of Characters: </label> 
                            <input type="text" id="numOfCharSheets" value="3 characters" readOnly/>
                        </li>
                    </ul>
                </article>
            </section>
            <section>
                {/*this is where character sheet cards will be */}
            {   
                characterSheets.map((characterSheet) => (
                    <CharacterSheetCard characterSheet={characterSheet}/>
                ))
            }
            </section>

        </main>
    );
};

export default withAuthenticationRequired(DashboardPage);