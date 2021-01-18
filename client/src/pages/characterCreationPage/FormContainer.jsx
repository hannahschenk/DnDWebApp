import React, {useState} from 'react';
import constants from "./../../utils/constants";
import CharacterCreationForm from "./../../components/characterCreationForm"
const FormContainer = ({sectionIdxState}) => {
    /*NOTE: might change later if state becomes global*/
    const {currentSectionIdx, currentSectionIdxReducer} = sectionIdxState;
    /* END NOTE */
    
    return (
        <section>
            <h3>{constants.CREATION_SECTIONS[currentSectionIdx].title}</h3>
            <article> 
                <CharacterCreationForm currentSectionIdx={currentSectionIdx}/>
            </article>

            <article> 
                <h3>Details</h3>
                <section>
                    {/*populate with details later*/}
                </section>
            </article>
        </section>
    );
};

export default FormContainer;