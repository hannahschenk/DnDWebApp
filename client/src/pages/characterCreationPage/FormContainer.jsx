import React, {useContext} from 'react';

import constants from './../../utils/constants';
import CharacterCreationForm from './../../components/characterCreationForm';
import Details from '../../components/characterCreationForm/Details';
import FormControlContext from "./../../state/formControlManager"
const FormContainer = () => {
    const {formControlState, setFormControlState} = useContext(FormControlContext);

    return (
        <section>
            <h3>{constants.CREATION_SECTIONS[formControlState.sectionIndex].title}</h3>
            <article>
                <CharacterCreationForm currentSectionIdx={formControlState.sectionIndex} />
            </article>

            <article>
                <h3>Details</h3>
                <section>
                    {/*populate with details later*/}
                    <Details />
                </section>
            </article>
        </section>
    );
};

export default FormContainer;
