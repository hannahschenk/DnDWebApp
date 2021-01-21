import React, { useEffect, useReducer } from 'react';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import INITIAL_CHARACTER_STATE from './state/character';
import { CharacterContext, characterReducer } from './state/logic';

import Demo from './components/demo';
import CharacterCreationPage from './pages/characterCreationPage';
import HomePage from './pages/homePage';

const App = () => {
    // Grab initial character state and assign the CharacterReducer to the setCharacter function
    const [character, setCharacter] = useReducer(characterReducer, INITIAL_CHARACTER_STATE, () => {
        // Tries to get character from local storage, if one is not present, set to initial combined character state
        const localCharacter = localStorage.getItem('character');
        return localCharacter ? JSON.parse(localCharacter) : INITIAL_CHARACTER_STATE;
    });

    // Updates the local storage with changes in state (also prints to console)
    useEffect(() => {
        console.log(character);
        localStorage.setItem('character', JSON.stringify(character));
    }, [character]);

    return (
        <Router>
            <Switch>
                <Route path="/CharacterCreationPage">
                    <CharacterContext.Provider value={{ character, setCharacter }}>
                        <CharacterCreationPage />
                    </CharacterContext.Provider>
                </Route>
                <Route path="/">
                    <HomePage />
                </Route>
                <Route path="/Demo">
                    <Demo />
                </Route>
            </Switch>
        </Router>
    );
};

export default App;
