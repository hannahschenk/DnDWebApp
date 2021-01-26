import React from 'react';

import constants from './../../utils/constants';
import CharacterCreationForm from './../../components/characterCreationForm';
import Details from '../../components/characterCreationForm/Details';

const FormContainer = ({ sectionIdxState }) => {
    /*NOTE: might change later if state becomes global*/
    const { currentSectionIdx, currentSectionIdxReducer } = sectionIdxState;
    /* END NOTE */

    return (
        <section>
            <h3>{constants.CREATION_SECTIONS[currentSectionIdx].title}</h3>
            <CharacterCreationForm currentSectionIdx={currentSectionIdx} />
            <Details />
        </section>
    );
};

export default FormContainer;
