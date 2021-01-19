import React, {useState} from 'react';
import constants from "./../../utils/constants";

const FormContainer = ({sectionIdxState}) => {
    /*NOTE: might change later if state becomes global*/
    const {currentSectionIdx, currentSectionIdxReducer} = sectionIdxState;
    /* END NOTE */
    
    return (
        <section>
            <h3>{constants.CREATION_SECTIONS[currentSectionIdx].title}</h3>
            <article> 
                {/* populate with form later */}
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