<<<<<<< HEAD
import React, {useContext} from 'react';
import constants from "./../../utils/constants";

import FormControlContext from "./../../state/formControlManager"
const CreationTimeline = () => {
    /*NOTE: might change later if state becomes global*/

    const {formControlState, setFormControlState} = useContext(FormControlContext);
    /* END NOTE */
    
    const switchSection = (newIndex) => {
        if (newIndex <= formControlState.sectionIndex + 1) {
            if(newIndex == formControlState.sectionIndex + 1){
                if(formControlState.currentFormDone){
                    setFormControlState({currentFormDone: false, sectionIndex: newIndex})
                }
            }
            else{
                setFormControlState({...formControlState, sectionIndex: newIndex})
            }
        }
    }

    return (
        <ul>
            {
                constants.CREATION_SECTIONS.map((sectionContent, sectionContentIdx) => 
                    <li key={sectionContent.title} onClick={() => switchSection(sectionContentIdx)}>
=======
import React from 'react';
import constants from './../../utils/constants';

const CreationTimeline = ({ sectionIdxState }) => {
    /*NOTE: might change later if state becomes global*/
    const { currentSectionIdx, currentSectionIdxReducer } = sectionIdxState;
    /* END NOTE */

    return (
        <aside>
            <ul>
                {constants.CREATION_SECTIONS.map((sectionContent, sectionContentIdx) => (
                    <li key={sectionContent.title} onClick={() => currentSectionIdxReducer('SWITCH_SECTION', sectionContentIdx)}>
>>>>>>> 4a70b2f06ba0d08582459d279e8cf437f8e5c275
                        <p>{sectionContent.title}</p>
                        <ul>
                            {sectionContent.subSections.map((subSectionContent) => (
                                <li key={subSectionContent}> {subSectionContent} </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </aside>
    );
};

export default CreationTimeline;
