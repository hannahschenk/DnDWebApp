import React, {useState} from 'react';
import CharacterSheetCard from "./../../components/characterSheetCard";
import {useAuth0, withAuthenticationRequired} from "@auth0/auth0-react";

const DashboardPage = () => {

    const {isAuthenticated, user} = useAuth0();

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
            <section className="dashBoard__profileContainer">
                {/* I'll leave this section if we want to render anything about the user*/}
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