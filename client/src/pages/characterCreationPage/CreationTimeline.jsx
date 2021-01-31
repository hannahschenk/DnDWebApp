import React, { useContext } from 'react';
import constants from './../../utils/constants';

import FormControlContext from './../../state/formControlManager';
const CreationTimeline = () => {
    const { formControlState, setFormControlState } = useContext(FormControlContext);
    
    const switchSection = (newIndex) => {
        if (newIndex <= formControlState.sectionIndex + 1) {
            if (newIndex == formControlState.sectionIndex + 1) {
                if (formControlState.currentFormDone) {
                    setFormControlState({ currentFormDone: false, sectionIndex: newIndex });
                }
            } else {
                setFormControlState({ ...formControlState, sectionIndex: newIndex });
            }
        }
    };

    return (
        <ul className="time-line">
            {constants.CREATION_SECTIONS.map((sectionContent, sectionContentIdx) => (
                <li key={sectionContent.title} onClick={() => switchSection(sectionContentIdx)} className="time-line__item">
                    <p className="time-line__content">{sectionContent.title}</p>
                    <ul>
                        {sectionContent.subSections.map((subSectionContent) => (
                            <li className="time-line__subcontent" key={subSectionContent}>
                                {' '}
                                {subSectionContent}{' '}
                            </li>
                        ))}
                    </ul>
                </li>
            ))}
        </ul>
    );
};

export default CreationTimeline;
