import React from 'react';

import { useCharacter } from './../../../state/logic';
import * as ACTION from './../../../state/actions';

const SpellsForm = ({ availableSpells }) => {
    const { character, setCharacter } = useCharacter();

    const handleSpellChoice = (e) => {
        e.preventDefault();

        const spell = e.target.name;
        const spellUrl = '/api/spells/' + spell.replace(/\s/g, '-').replace(/'/, '').toLowerCase();

        const updatedSpells = Object.values(character.proficiencies.spells).filter((spell) => spell.name !== e.target.name);

        // Remove spell from character if button is clicked twice
        if (character.proficiencies.spells.length > updatedSpells.length) {
            setCharacter({ type: ACTION.UPDATE_PROFICIENCIES, payload: { spells: updatedSpells } });
            e.target.style.backgroundColor = '';
        }
        // Otherwise add spell
        else {
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
                const selected = character.proficiencies.spells.map((spellObj) => spellObj.name === spell);

                return (
                    <React.Fragment key={idx}>
                        <button
                            name={spell}
                            onClick={(e) => handleSpellChoice(e)}
                            style={{
                                width: 200,
                                backgroundColor: selected[0] ? 'red' : '',
                            }}
                        >
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
