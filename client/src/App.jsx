<<<<<<< HEAD
import React, { useEffect, useReducer, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
=======
import React, { useEffect, useReducer } from 'react';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';
>>>>>>> 4672e7b231c9404587125b82c575dc16cba45371

import INITIAL_CHARACTER_STATE from './state/character';
import { CharacterContext, characterReducer } from './state/logic';

import CharacterCreationPage from './pages/characterCreationPage';
<<<<<<< HEAD
import FormControlContext from "./state/formControlManager";
import CharacterOverview from './pages/characterOverview';
=======
import HomePage from './pages/homePage';
>>>>>>> 4672e7b231c9404587125b82c575dc16cba45371

const App = () => {
    // Grab initial character state and assign the CharacterReducer to the setCharacter function
    const [character, setCharacter] = useReducer(characterReducer, INITIAL_CHARACTER_STATE, () => {
        // Tries to get character from local storage, if one is not present, set to initial combined character state
        const localCharacter = localStorage.getItem('character');
        return localCharacter ? JSON.parse(localCharacter) : INITIAL_CHARACTER_STATE;
    });

    const [details, setDetails] = useState({});

    const[formControlState, setFormControlState] = useState({
        sectionIndex: -1,
        currentFormDone: false
      }
    )
    // Updates the local storage with changes in state (also prints to console)
    useEffect(() => {
        console.log("in use effect where local storage is set")
        console.log(character);
        localStorage.setItem('character', JSON.stringify(character));
    }, [character]);

    useEffect(() => {
        console.log('Object sent to details component: ', details);
    }, [details]);

    return (
<<<<<<< HEAD
        <CharacterContext.Provider value={{ character, setCharacter, details, setDetails }}>
        <FormControlContext.Provider value={{ formControlState, setFormControlState }}>
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
        </FormControlContext.Provider>
        </CharacterContext.Provider>
=======
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
            </Switch>
        </Router>
>>>>>>> 4672e7b231c9404587125b82c575dc16cba45371
    );
};

export default App;
