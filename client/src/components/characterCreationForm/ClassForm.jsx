import React, { useState, useEffect, useContext } from 'react';

import dndApi from '../../utils/dnd5eApi';

import { useCharacter } from '../../state/logic';
import * as ACTION from '../../state/actions';

import FormControlContext from './../../state/formControlManager';

const ClassForm = () => {
    const { character, setCharacter, setDetails } = useCharacter();
    const [classChoices, setClassChoices] = useState([]);

    const { formControlState, setFormControlState } = useContext(FormControlContext);

    /*
     * Signature: useEffect(func, [])
     * Description: Fetches all possible class choices from dnd5e api
     *               each class choice is an object with the format
     *               {index, name, url}
     */
    useEffect(async () => {
        // Reset details component
        setDetails({});

        let mounted = true;
        if (mounted) {
            try {
                setClassChoices((await dndApi.getClasses()).data.results);
                /*if (character.character_class.name !== '') {
                    setDetails((await dndApi.getMoreInfo(character.character_class.url)).data);
                }*/
            } catch (err) {
                console.log(err);
            }
        }
        return () => {
            mounted = false;
        };
    }, []);

    /*
     * Signature: useEffect(func, [character])
     * Description: watch for character changes on class name to
     *               determine if the user can move on to the next section
     *               via the formControlState
     */
    useEffect(() => {
        if (character.character_class.name != '') {
            setFormControlState({ ...formControlState, currentFormDone: true });
        } else {
            setFormControlState({ ...formControlState, currentFormDone: false });
        }
    }, [character]);

    /*
     * Signature: pickClass(chosenClass)
     * Input: chosenClass - the class object ({name, index, url}) the user chooses
     * Description: Sets the character state property class to reflect the user's
     *               chosen class
     */
    const pickClass = async (chosenClass) => {
        try {
            const classInfo = (await dndApi.getMoreInfo(chosenClass.url)).data;

            
            if (chosenClass.name != character.character_class.name) {
                setCharacter({
                    type: ACTION.UPDATE_CHARACTER_CLASS,
                    payload: {
                        name: chosenClass.name,
                        url: chosenClass.url,
                        hitDie: classInfo.hit_die,
                    },
                });
            }

            setDetails(classInfo);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <main>
            <section>
                <p>Pick a Class: </p>
                {
                    //render radio options for classes
                    classChoices.map((classObj, idx) => (
                        <React.Fragment key={idx}>
                            <input
                                type="radio"
                                name="characterClass"
                                id={classObj.name}
                                defaultChecked={classObj.name == character.character_class.name}
                                value={JSON.stringify(classObj)}
                                onClick={() => pickClass(classObj)}
                            />
                            <label htmlFor={classObj.name}>
                                {'  '}
                                {classObj.name}
                            </label>
                            <br />
                        </React.Fragment>
                    ))
                }
            </section>
        </main>
    );
};

export default ClassForm;
