import React, { useEffect, useReducer, useState } from 'react';

import INITIAL_CHARACTER_STATE from './state/character';
import { CharacterContext, characterReducer } from './state/logic';

import Demo from './components/demo';
import CharacterCreationPage from './pages/characterCreationPage';
import FormControlContext from "./state/formControlManager";
const App = () => {
    // Grab initial character state and assign the CharacterReducer to the setCharacter function
    const [character, setCharacter] = useReducer(characterReducer, INITIAL_CHARACTER_STATE, () => {
        // Tries to get character from local storage, if one is not present, set to initial combined character state
        
        /*const localCharacter = localStorage.getItem('character');
        return localCharacter ? JSON.parse(localCharacter) : INITIAL_CHARACTER_STATE;*/
        return INITIAL_CHARACTER_STATE;
    });

    const [details, setDetails] = useState({});

<<<<<<< HEAD
    const[formControlState, setFormControlState] = useState({
        sectionIndex: -1,
        currentFormDone: false
      }
    )
=======
>>>>>>> e5205741c2f65b2764486087f2da3374313390b2
    // Updates the local storage with changes in state (also prints to console)
    useEffect(() => {
        // console.log(character);
        //localStorage.setItem('character', JSON.stringify(character));
    }, [character]);

    useEffect(() => {
        console.log('Data sent to details component: ', details);
    }, [details]);

    return (
        <>
            <CharacterContext.Provider value={{ character, setCharacter, details, setDetails }}>
<<<<<<< HEAD
                <FormControlContext.Provider value={{ formControlState, setFormControlState }}>
                    {/* <Demo /> */}
                    <CharacterCreationPage />
                </FormControlContext.Provider>
=======
                {/* <Demo /> */}
                <CharacterCreationPage />
>>>>>>> e5205741c2f65b2764486087f2da3374313390b2
            </CharacterContext.Provider>
        </>
    );
};

export default App;
