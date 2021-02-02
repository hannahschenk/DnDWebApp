import React, { useContext, useEffect, useState } from 'react';

import constants from './../../utils/constants';
import { useCharacter } from '../../state/logic';

import CharacterCreationForm from './../../components/characterCreationForm';
import Details from '../../components/characterCreationForm/Details';
import FormControlContext from './../../state/formControlManager';

const FormContainer = () => {
    const { formControlState, setFormControlState } = useContext(FormControlContext);
    const [renderDetails, setRenderDetails] = useState(true);

    const [renderDetailsOnClick, setRenderDetailsOnClick] = useState(false);

    const { details } = useCharacter();

    useEffect(() => {
        const render = formControlState.sectionIndex;
        if (render === 0 || render === 1 || render === 3) {
            setRenderDetails(true);
        } else {
            setRenderDetails(false);
        }
    }, [formControlState]);

    const hideShowForm = (e) => {};

    useEffect(() => {
        if (details) {
            if (Object.keys(details).length === 0) {
                setRenderDetailsOnClick(false);
                document.getElementById('wrapper').style.display = 'none';
                document.getElementById('form-title').style.margin = '0';
            } else {
                setRenderDetailsOnClick(true);
                document.getElementById('form-title').style.margin = '4rem 0 0 0';
                document.getElementById('wrapper').style.display = 'block';
            }
        } else {
            setRenderDetailsOnClick(false);
        }
    }, [details]);

    return (
        <section className="form-container" style={renderDetails ? { display: 'grid' } : { display: 'block', marginRight: '1rem' }}>
            <article className="details-wrapper" id="wrapper" style={renderDetails ? { display: 'block' } : { display: 'none' }}>
                {renderDetailsOnClick && (
                    <>
                        <input
                            id="collapsible__details"
                            className="toggleInfo"
                            onClick={(e) => hideShowForm(e)}
                            type="checkbox"
                            tabIndex="0"
                            style={{ display: 'none' }}
                        />
                        <label htmlFor="collapsible__details" className="container__subheader label__toggle" style={{ width: '100%' }}>
                            <p className="collapsible__text">Details</p>
                            <i className="fa fa-chevron-down"></i>
                        </label>
                        <article className="container--collapsible details-container">
                            <Details />
                        </article>
                    </>
                )}
            </article>
            <article className="creation-form">
                <h3 className="creation-form__title" id="form-title">
                    {constants.CREATION_SECTIONS[formControlState.sectionIndex].title.replace(/\d\.\s/, '')}
                </h3>
                <CharacterCreationForm currentSectionIdx={formControlState.sectionIndex} />
            </article>
        </section>
    );
};

export default FormContainer;
