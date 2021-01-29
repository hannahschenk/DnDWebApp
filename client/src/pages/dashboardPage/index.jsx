import React, {useState, useEffect} from 'react';
import CharacterSheetCard from "./../../components/characterSheetCard";
import {useAuth0, withAuthenticationRequired} from "@auth0/auth0-react";

const DashboardPage = () => {

    const {isAuthenticated, user} = useAuth0();

    useEffect(() => {console.log(user)}, [user])

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
                <article>
                    <label htmlFor="userName"> Name </label> 
                    <input type="text" id="userName" value={user.name} readOnly/>
                    <label  htmlFor="userEmail"> Email </label> 
                    <input type="text" id="userEmail" value={user.email} readOnly/>
                </article>
                <article>
                    <b> Name </b> 
                    <p>{user.name}</p>
                    <b>Email </b> 
                    <p>{user.email}</p>
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