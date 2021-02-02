import React, {useState} from 'react';
import {Link} from "react-router-dom";

const CharacterSheetCard = ({characterSheet, sheetId}) => {

    const characterName = characterSheet.name;
    const characterRace = characterSheet.race;
    const characterClass = characterSheet.class;

    return (
        <Link to={`overview/${sheetId}`} className="card-link">
            <article className="character-card card-link">
                <p><b>name:</b> {characterName}</p>
                <p><b>race:</b> {characterRace}</p>
                <p><b>class:</b> {characterClass}</p>
            </article>
        </Link>
    );
};

export default CharacterSheetCard;