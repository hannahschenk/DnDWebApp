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

import constants from "./utils/constants"
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import {createUser} from "./utils/api";
import * as ACTION from "./state/actions"

import { useLocation } from 'react-router';

const App = () => {
    // Grab initial character state and assign the CharacterReducer to the setCharacter function
    const location = useLocation();

    const [character, setCharacter] = useReducer(characterReducer, INITIAL_CHARACTER_STATE, () => {
        // Tries to get character from local storage, if one is not present, set to initial combined character state
        const localCharacter = localStorage.getItem('character');
        console.log(JSON.parse(localCharacter));
        return localCharacter ? JSON.parse(localCharacter) : INITIAL_CHARACTER_STATE;
    });

    useEffect(()=> { // this is to clear the storage everytime we go somewhere different
        if(!location.pathname.includes("character") && !location.pathname.includes("overview")){
            setCharacter({ type: ACTION.RESET_CHARACTER });
            localStorage.removeItem("character");
        }
    }, [location.pathname])

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
        // console.log('App.jsx: Object sent to details component: ', details);
    }, [details]);


    /*AUTH0*/
    const {getAccessTokenSilently, user, isAuthenticated} = useAuth0();
    useEffect(async () => {
        try{
            if(isAuthenticated){
                const token = await getAccessTokenSilently();
                let postBody = {
                    name : user.name,
                    email: user.email
                }
                console.log(postBody)
                createUser(postBody, token)
            }
        } catch (e){
            console.error(e);
        }
    }, [getAccessTokenSilently])
    /*END AUTH */

    return (
        <CharacterContext.Provider value={{ character, setCharacter, details, setDetails }}>
            <FormControlContext.Provider value={{ formControlState, setFormControlState }}>
                <NavBar />
                <Switch>
                    <Route exact path="/">
                        <HomePage />
                    </Route>
                    <Route exact path="/create-character" render={() => <CharacterCreationPage />}>
                    </Route>
                    <Route exact path="/edit-character/:id" render={() => <CharacterCreationPage />}>
                        <CharacterCreationPage />
                    </Route>
                    <Route exact path="/overview"  render={() => <CharacterOverview/>}>
                    </Route>

                    <Route exact path="/overview/:id" render={() => <CharacterOverview/>}>
                    </Route>

                    <Route exact path="/dashboard">
                        <DashboardPage />
                    </Route>
                </Switch>
                <Footer />
            </FormControlContext.Provider>
        </CharacterContext.Provider>
    );
};

export default App;
