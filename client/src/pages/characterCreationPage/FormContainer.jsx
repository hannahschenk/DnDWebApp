import React, {useContext} from 'react';

import constants from './../../utils/constants';
import CharacterCreationForm from './../../components/characterCreationForm';
import Details from '../../components/characterCreationForm/Details';
import FormControlContext from "./../../state/formControlManager"
const FormContainer = () => {
    const {formControlState, setFormControlState} = useContext(FormControlContext);

    return (
        <section>
<<<<<<< HEAD
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
=======
            <h3>{constants.CREATION_SECTIONS[currentSectionIdx].title}</h3>
            <CharacterCreationForm currentSectionIdx={currentSectionIdx} />
            <Details />
>>>>>>> 4a70b2f06ba0d08582459d279e8cf437f8e5c275
        </section>
    );
};

export default FormContainer;
