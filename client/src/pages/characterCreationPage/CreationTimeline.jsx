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

    const setStyling = (sectionContentTitle) => {
        if (formControlState) {
            if (formControlState.sectionIndex === 0 && sectionContentTitle === 'race') return 'nav-active--timeline';
            if (formControlState.sectionIndex === 1 && sectionContentTitle === 'class') return 'nav-active--timeline';
            if (formControlState.sectionIndex === 2 && sectionContentTitle === 'ability scores') return 'nav-active--timeline';
            if (formControlState.sectionIndex === 3 && sectionContentTitle === 'character details') return 'nav-active--timeline';
            if (formControlState.sectionIndex === 4 && sectionContentTitle === 'proficiencies') return 'nav-active--timeline';
            if (formControlState.sectionIndex === 5 && sectionContentTitle === 'equipment') return 'nav-active--timeline';
            return '';
        }
        return '';
    };

    return (
        <ul className="time-line">
            {constants.CREATION_SECTIONS.map((sectionContent, sectionContentIdx) => (
                <li
                    className={`time-line__item ${setStyling(sectionContent.title.replace(/\d\.\s/, '').toLowerCase())}`}
                    key={sectionContent.title}
                    onClick={() => switchSection(sectionContentIdx)}
                >
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
