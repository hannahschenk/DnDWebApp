import React, { useState, useEffect, useContext } from 'react';
import FormContainer from './FormContainer';
import CreationTimeline from './CreationTimeline';
import constants from './../../utils/constants';
import FormControlContext from "./../../state/formControlManager";
import { useHistory } from 'react-router-dom';

 //TESTING STATE UPDATERS:
 import { useCharacter } from './../../state/logic';
 //end state tester

const CharacterCreationPage = () => {
    const {formControlState, setFormControlState} = useContext(FormControlContext);

    //TESTING STATE UPDATERS:
    const { character, setCharacter } = useCharacter();
    useEffect(() => {
        console.log(character)

    }, [character])
    //end state tester
    
    const history = useHistory();

    const setSectionIndex = (offset) => {
        let newIndex = formControlState.sectionIndex + offset;
        if(offset == 1){
            setFormControlState({currentFormDone: false, sectionIndex: newIndex})
        }
        else{
            setFormControlState({...formControlState, sectionIndex: newIndex})
        }
    }

    const isPreviousDisabled = () => {
        return formControlState.sectionIndex == 0
    }    
    const isNextDisabled = () => {
        return (formControlState.sectionIndex == constants.CREATION_SECTIONS.length - 1 ||
                !formControlState.currentFormDone)
    }

    return (
        <>
            {formControlState.sectionIndex == -1 ? //if block
                <section>
                    This is the guided character Creation process. Please fill out each section before clicking next.
                    <button onClick={() => setFormControlState({...formControlState, sectionIndex: 0})}>
                        Start Character Creation
                    </button>
                </section>
            : //else block
                <section>
                    <CreationTimeline/>
                    <FormContainer/>

                    <button onClick={() => setSectionIndex(-1)} disabled={isPreviousDisabled()}>
                        Previous
                    </button>
                    <button onClick={() => setSectionIndex(1)} disabled={isNextDisabled()}>
                        Next
                    </button>

                    {currentSectionIdx === 5 && <button onClick={() => history.push('/overview')}>View Character Sheet</button>}
                </section>
            }
        </>
    );
};

export default CharacterCreationPage;
