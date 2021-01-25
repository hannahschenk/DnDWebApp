import React, {useContext} from 'react';
import constants from "./../../utils/constants";

import FormControlContext from "./../../state/formControlManager"
const CreationTimeline = () => {
    /*NOTE: might change later if state becomes global*/

    const {formControlState, setFormControlState} = useContext(FormControlContext);
    /* END NOTE */
    
    const switchSection = (newIndex) => {
        if (newIndex <= formControlState.sectionIndex + 1) {
            setFormControlState({...formControlState, sectionIndex: newIndex})
        }
    }

    return (
        <ul>
            {
                constants.CREATION_SECTIONS.map((sectionContent, sectionContentIdx) => 
                    <li key={sectionContent.title} onClick={() => switchSection(sectionContentIdx)}>
                        <p>{sectionContent.title}</p>
                        <ul>
                            {
                                sectionContent.subSections.map((subSectionContent) => 
                                    <li key={subSectionContent}> {subSectionContent} </li>
                                )
                            
                            }
                        </ul>  
                    </li>
                )
                
            }
        </ul>
    );
};

export default CreationTimeline;