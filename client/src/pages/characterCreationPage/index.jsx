import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import FormContainer from './FormContainer';
import CreationTimeline from './CreationTimeline';
import constants from './../../utils/constants';

const CharacterCreationPage = () => {
    /*NOTE: local state; might push to global state later:*/
    const [currentSectionIdx, setCurrentSectionIdx] = useState(-1);

    const history = useHistory();

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
                <main>
                    This is the guided character Creation process. Please fill out each section before clicking next.
                    <button onClick={() => setCurrentSectionIdx(0)}>Start Character Creation</button>
                </main>
            ) : (
                <main>
                    <CreationTimeline sectionIdxState={{ currentSectionIdx, currentSectionIdxReducer }} />
                    <FormContainer sectionIdxState={{ currentSectionIdx, currentSectionIdxReducer }} />

                    <div>
                        <button onClick={() => currentSectionIdxReducer('PREVIOUS_SECTION')} disabled={currentSectionIdx == 0}>
                            Previous
                        </button>
                        <button onClick={() => currentSectionIdxReducer('NEXT_SECTION')} disabled={currentSectionIdx == constants.CREATION_SECTIONS.length - 1}>
                            Next
                        </button>
                        {currentSectionIdx === 5 && <button onClick={() => history.push('/overview')}>View Character Sheet</button>}
                    </div>
                </main>
            )}
        </>
    );
};

export default CharacterCreationPage;
