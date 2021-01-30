import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import FormContainer from './FormContainer';
import CreationTimeline from './CreationTimeline';
import FormControlContext from './../../state/formControlManager';

import constants from './../../utils/constants';

const CharacterCreationPage = () => {
    const { formControlState, setFormControlState } = useContext(FormControlContext);
    const history = useHistory();

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

    return (
        <>
            {formControlState.sectionIndex == -1 ? ( //if block
                <section>
                    This is the guided character Creation process. Please fill out each section before clicking next.
                    <button onClick={() => setFormControlState({ ...formControlState, sectionIndex: 0 })}>Start Character Creation</button>
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

                        {formControlState.sectionIndex === 5 && (
                            <button onClick={() => history.push('/overview')} disabled={!formControlState.currentFormDone}>
                                View Character Sheet
                            </button>
                        )}
                    </div>
                    <CreationTimeline />
                    <FormContainer />
                </section>
            )}
        </>
    );
};

export default CharacterCreationPage;
