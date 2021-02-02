import React, { useEffect, useReducer, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useLocation } from 'react-router';

import * as ACTION from './state/actions';
import INITIAL_CHARACTER_STATE from './state/character';
import { CharacterContext, characterReducer } from './state/logic';

import FormControlContext from './state/formControlManager';
import CharacterCreationPage from './pages/characterCreationPage';
import CharacterOverview from './pages/characterOverview';
import HomePage from './pages/homePage';
import DashboardPage from './pages/dashboardPage';
import NavBar from './components/NavBar';
import Footer from './components/Footer';

import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import { createUser } from './utils/api';
import NotFound from './pages/NotFound';

const App = () => {
    //used to decide if local storage should be cleared
    const location = useLocation();
    //used to set the details in the details component
    const [details, setDetails] = useState({});
    //used to control which section of the character creation page we're in
    const [formControlState, setFormControlState] = useState({
        sectionIndex: -1,
        currentFormDone: false,
    });
    //used for authorization
    const { getAccessTokenSilently, user, isAuthenticated, isLoading } = useAuth0();

    /*
     * Description: returns character state and setter of state; use character in local storage
     * if it exist
     */
    const [character, setCharacter] = useReducer(characterReducer, INITIAL_CHARACTER_STATE, () => {
        const localCharacter = localStorage.getItem('character');
        return localCharacter ? JSON.parse(localCharacter) : INITIAL_CHARACTER_STATE;
    });

    /*
     * Description: if the user is not creating a character or viewing a character, clear local
     * storage; unsaved character gets lost if they navigate away but persists through a refresh
     */
    useEffect(() => {
        if (!location.pathname.includes('character') && !location.pathname.includes('overview')) {
            setCharacter({ type: ACTION.RESET_CHARACTER });
            localStorage.removeItem('character');
        }
    }, [location.pathname]);

    /*
     * Description: if the character state changes, save the changes in local storage
     */
    useEffect(() => {
        localStorage.setItem('character', JSON.stringify(character));
    }, [character]);

    /*
     * Description: everytime the user signs in, check the db to find/create the user
     */
    useEffect(async () => {
        try {
            if (isAuthenticated) {
                const token = await getAccessTokenSilently();
                let postBody = {
                    name: user.name,
                    email: user.email,
                };
                console.log(postBody);
                createUser(postBody, token);
            }
        } catch (e) {
            console.error(e);
        }
    }, [getAccessTokenSilently]);

    useEffect(() => {
        console.log(isAuthenticated);
    }, [isLoading]);

    return (
        <CharacterContext.Provider value={{ character, setCharacter, details, setDetails }}>
            <FormControlContext.Provider value={{ formControlState, setFormControlState }}>
                <NavBar />
                <Switch>
                    <Route exact path="/">
                        <HomePage />
                    </Route>
                    <Route exact path="/create-character" render={() => <CharacterCreationPage />}></Route>
                    <Route exact path="/edit-character/:id" render={() => <CharacterCreationPage />}></Route>
                    <Route exact path="/overview" render={() => <CharacterOverview />}></Route>
                    <Route exact path="/overview/:id" render={() => <CharacterOverview />}></Route>
                    <Route exact path="/edit-overview/:id" render={() => <CharacterOverview />}></Route>
                    <Route exact path="/dashboard">
                        <DashboardPage />
                    </Route>
                    <Route>
                        <NotFound />
                    </Route>
                </Switch>
                <Footer />
            </FormControlContext.Provider>
        </CharacterContext.Provider>
    );
};

export default App;
