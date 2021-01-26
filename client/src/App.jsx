import React, { useEffect, useReducer, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import INITIAL_CHARACTER_STATE from './state/character';
import { CharacterContext, characterReducer } from './state/logic';

import CharacterCreationPage from './pages/characterCreationPage';
import CharacterOverview from './pages/characterOverview';

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
        // console.log(character);
        localStorage.setItem('character', JSON.stringify(character));
    }, [character]);

    useEffect(() => {
        console.log('Object sent to details component: ', details);
    }, [details]);

    return (
        <CharacterContext.Provider value={{ character, setCharacter, details, setDetails }}>
            <Router>
                <Switch>
                    <Route exact path="/overview">
                        <CharacterOverview />
                    </Route>
                    <Route exact path="/">
                        <CharacterCreationPage />
                    </Route>
                </Switch>
            </Router>
        </CharacterContext.Provider>
    );
};

export default App;
