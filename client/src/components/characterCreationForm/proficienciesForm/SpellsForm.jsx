import React, { useEffect, useState } from 'react';

import { useCharacter } from './../../../state/logic';
import * as ACTION from './../../../state/actions';

import { SPELLS } from '../../../utils/spells';

const SpellsForm = ({ availableSpells }) => {
    const { character, setCharacter } = useCharacter();

    const [classSpells, setClassSpells] = useState();
    const [numKnownSpells, setNumKnownSpells] = useState();

    /*
     * Signature: useEffect(func, [])
     * Description: Set classSpells equal to spellcasting class data in spell.js
     */
    useEffect(() => {
        // Gets all spells from the spells object
        setClassSpells(SPELLS[character.character_class.name.toLowerCase()]);
    }, []);

    /*
     * Signature: useEffect(func, [classSpells])
     * Description: Set number of known spells when classSpells is set
     */
    useEffect(() => {
        if (classSpells) {
            const level1SpellsKnown = classSpells.knownLevel1(character.abilities[classSpells.ability]);
            setNumKnownSpells(level1SpellsKnown > 0 ? level1SpellsKnown : 1);
        }
    }, [classSpells]);

    /*
     * Signature: handleSpellChoice(e)
     * Description: Updates spell choices in character state.
     */
    const handleSpellChoice = (e) => {
        e.preventDefault();

        const spell = e.target.name;
        const spellUrl = '/api/spells/' + spell.replace(/\s/g, '-').replace(/'/, '').toLowerCase();

        const updatedSpells = Object.values(character.proficiencies.spells).filter((spell) => spell.name !== e.target.name);

        // Remove spell from character if button is clicked twice
        if (character.proficiencies.spells.length > updatedSpells.length) {
            setCharacter({ type: ACTION.UPDATE_PROFICIENCIES, payload: { spells: updatedSpells } });
            e.target.style.color = '';
        }
        // Otherwise add spell
        else {
            if (character.proficiencies.spells.length == numKnownSpells) return;

            setCharacter({ type: ACTION.UPDATE_PROFICIENCIES, payload: { spells: [...character.proficiencies.spells, { name: spell, url: spellUrl }] } });
            e.target.style.color = '#dc2626';
        }
    };

    return (
        <>
            <h3>Select Spells</h3>
            {classSpells && numKnownSpells && (
                <p>
                    As a {character.character_class.name} with a {classSpells.ability.charAt(0).toUpperCase() + classSpells.ability.slice(1)} score of{' '}
                    {character.abilities[classSpells.ability]}, you can select
                    {numKnownSpells === 1 ? ' one level 1 spell.' : ` ${numKnownSpells} level 1 spells.`}
                </p>
            )}

            {/* RENDER SPELLS HERE */}
            {availableSpells.map((spell, idx) => {
                const selected = character.proficiencies.spells.map((spellObj) => (spellObj.name)).includes(spell)
                
                return (
                    <React.Fragment key={idx}>
                        <button
                            name={spell}
                            onClick={(e) => handleSpellChoice(e)}
                            style={{
                                width: 200,
                                color: selected ? '#dc2626' : '',
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
