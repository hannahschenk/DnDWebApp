import React from 'react';
import * as ACTION from '../state/actions';

// Import the custom hook
import { useCharacter } from '../state/logic';

const racesArray = ['Dwarf', 'Elf', 'Halfling', 'Human', 'Dragonborn', 'Gnome', 'Half-Elf', 'Half-Orc', 'Tiefling'];
const alignmentsArray = [
    'Lawful Good',
    'Lawful Neutral',
    'Lawful Evil',
    'Neutral Good',
    'Neutral',
    'Neutral Evil',
    'Chaotic Good',
    'Chaotic Neutral',
    'Chaotic Evil',
];
const classesArray = ['Barbarian', 'Bard', 'Cleric', 'Druid', 'Fighter', 'Monk', 'Paladin', 'Ranger', 'Rogue', 'Warlock', 'Wizard'];

const Demo = () => {
    // Access state and set state function from the context with this custom hook
    const { character, setCharacter } = useCharacter();

    return (
        <>
            <h1>See changes to state in the console and on this page when making a change</h1>
            <h2>{character.race.name === '' ? 'Select a race' : `Race: ${character.race.name}`}</h2>
            <button onClick={() => setCharacter({ type: ACTION.CLEAR_RACE })}>Clear Race from state</button>
            <div>
                {racesArray.map((raceName, idx) => (
                    <CharacterStat key={idx} stat="race" action={ACTION.UPDATE_RACE} field="name" value={raceName} />
                ))}
            </div>

            <h2>{character.class.name === '' ? 'Select a class' : `Class: ${character.class.name}`}</h2>
            <button onClick={() => setCharacter({ type: ACTION.CLEAR_CLASS })}>Clear Class from state</button>
            <div>
                {classesArray.map((className, idx) => (
                    <CharacterStat key={idx} stat="class" action={ACTION.UPDATE_CLASS} field="name" value={className} />
                ))}
            </div>

            <h2>{character.alignment === '' ? 'Select an alignment' : `Alignment: ${character.alignment}`}</h2>
            <button onClick={() => setCharacter({ type: ACTION.CLEAR_ALIGNMENT })}>Clear Alignment from state</button>
            <div>
                {alignmentsArray.map((alignment, idx) => (
                    <CharacterStat key={idx} stat="alignment" action={ACTION.UPDATE_ALIGNMENT} field="name" value={alignment} />
                ))}
            </div>
        </>
    );
};

const CharacterStat = ({ stat, action, field, value }) => {
    // Grab setCharacter function from context with custom hook
    const { setCharacter } = useCharacter();

    // field is the character stat to update in state
    // payload is the value of that stat
    return (
        <>
            <br />
            <input
                type="radio"
                name={stat}
                id={value}
                onChange={() => {
                    // Make API call to fetch data based on selection, .then(() => {
                    // setCharacter({ type: action, payload: { /* Or object containing the values you want to update for that stat */ } })
                    setCharacter({ type: action, payload: { [field]: value } });
                }}
                // });
            />
            <label htmlFor={value}>{value}</label>
        </>
    );
};

export default Demo;
