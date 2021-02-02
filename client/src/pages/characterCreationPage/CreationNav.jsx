import React, { useContext, useEffect } from 'react';
import constants from '../../utils/constants';

import FormControlContext from '../../state/formControlManager';

const CreationNav = () => {
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
            if (formControlState.sectionIndex === 0 && sectionContentTitle === 'race') return 'nav-active';
            if (formControlState.sectionIndex === 1 && sectionContentTitle === 'class') return 'nav-active';
            if (formControlState.sectionIndex === 2 && sectionContentTitle === 'ability scores') return 'nav-active';
            if (formControlState.sectionIndex === 3 && sectionContentTitle === 'character details') return 'nav-active';
            if (formControlState.sectionIndex === 4 && sectionContentTitle === 'proficiencies') return 'nav-active';
            if (formControlState.sectionIndex === 5 && sectionContentTitle === 'equipment') return 'nav-active';
            return '';
        }
        return '';
    };

    return (
        <ul className="creation-nav">
            {constants.CREATION_SECTIONS.map((sectionContent, sectionContentIdx) => (
                <li
                    className={`creation-nav__item ${setStyling(sectionContent.title.replace(/\d\.\s/, '').toLowerCase())}`}
                    key={sectionContent.title}
                    onClick={() => switchSection(sectionContentIdx)}
                >
                    <p className="creation-nav__content">{sectionContent.title.replace(/\d\.\s/, '')}</p>
                </li>
            ))}
        </ul>
    );
};

export default CreationNav;
