import React, { useContext, useEffect, useState } from 'react';
import constants from './../../utils/constants';
import CharacterCreationForm from './../../components/characterCreationForm';
import Details from '../../components/characterCreationForm/Details';
import FormControlContext from './../../state/formControlManager';

const FormContainer = () => {
    const { formControlState, setFormControlState } = useContext(FormControlContext);
    const [renderDetails, setRenderDetails] = useState(true);

    useEffect(() => {
        const render = formControlState.sectionIndex;
        if (render === 0 || render === 1 || render === 3) {
            setRenderDetails(true);
        } else {
            setRenderDetails(false);
        }
    }, [formControlState]);

    return (
        <section className="form-container" style={renderDetails ? { display: 'grid' } : { display: 'block', marginRight: '1rem' }}>
            <article className="creation-form">
                <h3 className="creation-form__title">{constants.CREATION_SECTIONS[formControlState.sectionIndex].title}</h3>
                <CharacterCreationForm currentSectionIdx={formControlState.sectionIndex} />
            </article>

            <article className="details-wrapper" style={renderDetails ? { display: 'block' } : { display: 'none' }}>
                <h3 className="creation-form__title">Details</h3>
                <section className="details-container">
                    <Details />
                </section>
            </article>
        </section>
    );
};

export default FormContainer;
