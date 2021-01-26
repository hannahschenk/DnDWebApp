import React, { useState, useEffect } from 'react';

import dndApi from './../../../utils/dnd5eApi';
import { useCharacter } from './../../../state/logic';
import * as ACTION from './../../../state/actions';

const SpellsForm = ({ availableSpells }) => {
    const { character, setCharacter } = useCharacter();

    const handleSpellChoice = (e) => {
        e.preventDefault();
        const spell = e.target.name;
        const spellUrl = '/api/spells/' + spell.replace(/\s/g, '-').replace(/'/, '').toLowerCase();

        const updatedSpells = Object.values(character.proficiencies.spells).filter((spell) => spell.name !== e.target.name);
        // console.log(character.proficiencies.spells.length, updatedSpells.length, character.proficiencies.spells.length > updatedSpells.length);

        // Remove spell from character if button is clicked twice
        if (character.proficiencies.spells.length > updatedSpells.length) {
            // console.log(updatedSpells);
            // console.log('removed ' + spell);
            setCharacter({ type: ACTION.UPDATE_PROFICIENCIES, payload: { spells: updatedSpells } });
            e.target.style.backgroundColor = '';
        }
        // Otherwise add spell
        else {
            // console.log([...character.proficiencies.spells, { name: spell, url: spellUrl }]);
            // console.log('added ' + spell);
            setCharacter({ type: ACTION.UPDATE_PROFICIENCIES, payload: { spells: [...character.proficiencies.spells, { name: spell, url: spellUrl }] } });
            e.target.style.backgroundColor = 'red';
        }
    };

    return (
        <>
            <h3>Select Spells</h3>
            {/* PLACE IN CHARACTER DETAILS FORM - HUNTER! */}

            {/* RENDER SPELLS HERE */}
            {availableSpells.map((spell, idx) => {
                // const selected = character.background.spells.includes(spell) ? 'red' : '';

                return (
                    <React.Fragment key={idx}>
                        <button name={spell} onClick={(e) => handleSpellChoice(e)} style={{ width: 200 }}>
                            {spell}
                        </button>
                        <br />
                    </React.Fragment>
                );
            })}
        </>
    );
};

export default SpellsForm;
