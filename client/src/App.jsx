<<<<<<< HEAD
import React, { useEffect, useReducer, useState } from 'react';
=======
import React, { useEffect, useReducer } from 'react';
>>>>>>> e23423b376c64a341ac60964d2226e831daba385

import INITIAL_CHARACTER_STATE from './state/character';
import { CharacterContext, characterReducer } from './state/logic';

import Demo from './components/demo';
import CharacterCreationPage from './pages/characterCreationPage';

const App = () => {
    // Grab initial character state and assign the CharacterReducer to the setCharacter function
    const [character, setCharacter] = useReducer(characterReducer, INITIAL_CHARACTER_STATE, () => {
        // Tries to get character from local storage, if one is not present, set to initial combined character state
        const localCharacter = localStorage.getItem('character');
        return localCharacter ? JSON.parse(localCharacter) : INITIAL_CHARACTER_STATE;
    });

    const [details, setDetails] = useState({});

    // Updates the local storage with changes in state (also prints to console)
    useEffect(() => {
        console.log(character);
        localStorage.setItem('character', JSON.stringify(character));
    }, [character]);

    return (
        <>
            <CharacterContext.Provider value={{ character, setCharacter, details, setDetails }}>
                {/* <Demo /> */}
                <CharacterCreationPage />
            </CharacterContext.Provider>
        </>
    );
};

export default App;
