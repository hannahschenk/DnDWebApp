import React, { useEffect, useReducer, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import INITIAL_CHARACTER_STATE from './state/character';
import { CharacterContext, characterReducer } from './state/logic';

import CharacterCreationPage from './pages/characterCreationPage';
import FormControlContext from './state/formControlManager';
import CharacterOverview from './pages/characterOverview';

import HomePage from './pages/homePage';
import DashboardPage from './pages/dashboardPage';
import Footer from './components/footer';
import NavBar from './components/NavBar';

const App = () => {
    // Grab initial character state and assign the CharacterReducer to the setCharacter function
    const [character, setCharacter] = useReducer(characterReducer, INITIAL_CHARACTER_STATE, () => {
        // Tries to get character from local storage, if one is not present, set to initial combined character state
        const localCharacter = localStorage.getItem('character');
        console.log(JSON.parse(localCharacter));
        return localCharacter ? JSON.parse(localCharacter) : INITIAL_CHARACTER_STATE;
    });

    const [details, setDetails] = useState({});

    const [formControlState, setFormControlState] = useState({
        sectionIndex: -1,
        currentFormDone: false,
    });
    // Updates the local storage with changes in state (also prints to console)
    useEffect(() => {
        // console.log("in use effect where local storage is set")
        // console.log('App.jsx: Updated character state: ', character);
        localStorage.setItem('character', JSON.stringify(character));
    }, [character]);

    useEffect(() => {
        console.log('App.jsx: Object sent to details component: ', details);
    }, [details]);

    return (
        <CharacterContext.Provider value={{ character, setCharacter, details, setDetails }}>
            <FormControlContext.Provider value={{ formControlState, setFormControlState }}>
                <Router>
                    <div className="pageWrap">
                    <NavBar />
                    <Switch>
                        <Route exact path="/">
                            <HomePage />
                        </Route>
                        <Route exact path="/create-character">
                            <CharacterCreationPage />
                        </Route>
                        <Route exact path="/overview">
                            <CharacterOverview />
                        </Route>

                        <Route exact path="/dashboard">
                            <DashboardPage />
                        </Route>
                    </Switch>
                    <Footer />
                    </div>
                </Router>
            </FormControlContext.Provider>
        </CharacterContext.Provider>
    );
};

export default App;
