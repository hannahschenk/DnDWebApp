import React, {useState} from 'react';
import CharacterSheetCard from "./../../components/characterSheetCard";
const DashboardPage = () => {
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
        <div className="footer-grow">
            <section>
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

        </div>
    );
};

export default DashboardPage;