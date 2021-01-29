import React, {useState} from 'react';
import CharacterSheetCard from "./../../components/characterSheetCard";
const DashboardPage = () => {
    /* dummy character sheet data*/
    let characterSheets = [
        {
            id: 1,
            name: "Lionel",
            race: "Dwarf",
            class: "Bard"
        },
        {
            id: 2,
            name: "Drew",
            race: "Half-Elf",
            class: "Rouge"
        },
        {
            id: 3,
            name: "Gart",
            race: "Giant",
            class: "Bard"
        },

    ]
    /* end dummy character sheet data*/

    return (
        <>
            <section>
                {/* I'll leave this section if we want to render anything about the user*/}
            </section>
            <section>
                {/*this is where character sheet cards will be */}
                <div className="card-container">
            {   
                characterSheets.map((characterSheet) => (
                    <CharacterSheetCard key={characterSheet.id} characterSheet={characterSheet}/>
                ))
            }
                </div>
            </section>

        </>
    );
};

export default DashboardPage;