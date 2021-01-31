import React, {useState} from 'react';
import {Link} from "react-router-dom";

const CharacterSheetCard = ({characterSheet, sheetId}) => {

    /*note: subject to change, we don't know how the character sheet object will look like*/
    const characterName = characterSheet.name;
    const characterRace = characterSheet.race;
    const characterClass = characterSheet.class;
    /*end note */

    return (
        <Link to={`overview/${sheetId}`} className="card-link">
            <article className="character-card card-link">
                <h2>{characterName}</h2>
                <p>{characterRace}</p>
                <p>{characterClass}</p>
            </article>
        </Link>
    );
};

export default CharacterSheetCard;