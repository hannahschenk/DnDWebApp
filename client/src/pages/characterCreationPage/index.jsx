import React, { useState } from 'react';
import FormContainer from './FormContainer';
import CreationTimeline from './CreationTimeline';
import constants from './../../utils/constants';

const CharacterCreationPage = () => {
    /*NOTE: local state; might push to global state later:*/
    const [currentSectionIdx, setCurrentSectionIdx] = useState(-1);

    //I placed in reducer format for the sake of consistency
    const currentSectionIdxReducer = (actionType, newIndex = 1) => {
        switch (actionType) {
            case 'PREVIOUS_SECTION':
                setCurrentSectionIdx(currentSectionIdx - 1);
                break;
            case 'NEXT_SECTION':
                setCurrentSectionIdx(currentSectionIdx + 1);
                break;
            case 'SWITCH_SECTION':
                if (newIndex <= currentSectionIdx + 1) {
                    setCurrentSectionIdx(newIndex);
                }
                break;
        }
    };
    /* END NOTE*/

    return (
        <>
            {currentSectionIdx == -1 ? (
                <section>
                    This is the guided character Creation process. Please fill out each section before clicking next.
                    <button onClick={() => setCurrentSectionIdx(0)}>Start Character Creation</button>
                </section>
            ) : (
                <section>
                    <CreationTimeline sectionIdxState={{ currentSectionIdx, currentSectionIdxReducer }} />
                    <FormContainer sectionIdxState={{ currentSectionIdx, currentSectionIdxReducer }} />

                    <button onClick={() => currentSectionIdxReducer('PREVIOUS_SECTION')} disabled={currentSectionIdx == 0}>
                        Previous
                    </button>
                    <button onClick={() => currentSectionIdxReducer('NEXT_SECTION')} disabled={currentSectionIdx == constants.CREATION_SECTIONS.length - 1}>
                        Next
                    </button>
                </section>
            )}
        </>
    );
};

export default CharacterCreationPage;
