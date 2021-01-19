import React from 'react';
import constants from "./../../utils/constants";

const CreationTimeline = ({sectionIdxState}) => {
    /*NOTE: might change later if state becomes global*/
    const {currentSectionIdx, currentSectionIdxReducer} = sectionIdxState;
    /* END NOTE */
    
    return (
        <ul>
            {
                constants.CREATION_SECTIONS.map((sectionContent, sectionContentIdx) => 
                    <li key={sectionContent.title} onClick={() => currentSectionIdxReducer("SWITCH_SECTION", sectionContentIdx)}>
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