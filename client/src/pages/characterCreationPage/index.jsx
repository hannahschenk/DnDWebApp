import React, { useState, useEffect, useContext } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';

import FormContainer from './FormContainer';
import CreationTimeline from './CreationTimeline';
import FormControlContext from './../../state/formControlManager';

import {useAuth0} from "@auth0/auth0-react";
import constants from './../../utils/constants';

import { getCharacter } from './../../utils/api';

const CharacterCreationPage = () => {
    const { formControlState, setFormControlState } = useContext(FormControlContext);
    const {isAuthenticated, getAccessTokenSilently} = useAuth0();
    const history = useHistory();
    const location = useLocation();
    const sheetId = useParams().id;

    const setSectionIndex = (offset) => {
        let newIndex = formControlState.sectionIndex + offset;
        if (offset == 1) {
            setFormControlState({ currentFormDone: false, sectionIndex: newIndex });
        } else {
            setFormControlState({ ...formControlState, sectionIndex: newIndex });
        }
    };

    const isPreviousDisabled = () => {
        return formControlState.sectionIndex == 0;
    };
    const isNextDisabled = () => {
        return formControlState.sectionIndex == constants.CREATION_SECTIONS.length - 1 || !formControlState.currentFormDone;
    };

    const goToOverview = () => {
        setFormControlState({...formControlState, sectionIndex: -1})
        if(location.pathname.includes("edit") && sheetId){
            history.push(`/edit-overview/${sheetId}`)
            return;
        }
        history.push("/overview")
    }

    useEffect( async () => {
        try{
            if(location.pathname.includes("edit") && sheetId){   
                const token = await getAccessTokenSilently();
                let savedCharacter = (await getCharacter(sheetId, token))
                if(!savedCharacter){
                    history.push("/404")
                }
            }
        } catch (e){
            console.log(e)
            history.push("/404")
        }
    }, [location.pathname, getAccessTokenSilently])


    const instructionTemplate = 
    `To navigate, please click the next and previous button. 
    You can also use the creation timeline located on the right side to
    jump to any sections before the current one you are currently on. 
    When on a section, you can move one section forward using the creation timeline 
    but won't be allowed to jump more sections ahead.`
    const instruction = (location.pathname.includes("edit")) ? 
        (`Welcome, you are now about to edit one of your characters. ${instructionTemplate} Please click on next to start the editing process.`) :
        (`Welcome, you are now about to create a new character. ${instructionTemplate} Please click on next to start the creation process.`)


    const instructionButtonContent = (location.pathname.includes("edit")) ? "Start Editing Character" : "Start Character Creation"
    return (
        <>
            {formControlState.sectionIndex == -1 ? ( //if block
                <section className="instruction__container">
                    <p className="instruction__content">{instruction}</p>
                    <button className="instruction__button" onClick={() => setFormControlState({ ...formControlState, sectionIndex: 0 })}>
                        <b>{instructionButtonContent}</b>
                    </button>
                </section>
            ) : (
                //else block
                <section className="creation-page">
                    <div className="creation-page__btns">
                        <button onClick={() => setSectionIndex(-1)} disabled={isPreviousDisabled()}>
                            Previous
                        </button>

                        <button onClick={() => setSectionIndex(1)} disabled={isNextDisabled()}>
                            Next
                        </button>
                    {
                        formControlState.sectionIndex === 5 && 
                        <button onClick={goToOverview} disabled={!formControlState.currentFormDone}>
                            View Character Sheet
                        </button>
                    }
                    </div>
                    <CreationTimeline />
                    <FormContainer />
                </section>
            )}
        </>
    );
};

export default CharacterCreationPage;
