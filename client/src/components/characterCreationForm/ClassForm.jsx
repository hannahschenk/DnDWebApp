import React, { useState, useEffect } from 'react';

import dndApi from '../../utils/dnd5eApi';

import { useCharacter } from '../../state/logic';
import * as ACTION from '../../state/actions';

const ClassForm = () => {
    const { character, setCharacter, setDetails } = useCharacter();

    const [classChoices, setClassChoices] = useState([]);

    useEffect(async () => {
        let mounted = true;

        if (mounted) {
            try {
                setClassChoices((await dndApi.getClasses()).data.results);

                if (character.class.name !== '') {
                    // Sets details component to render data based on currently selected class, if available
                    setDetails((await dndApi.getMoreInfo(character.class.url)).data);
                }
            } catch (err) {
                console.log(err);
            }
        }
        return () => {
            mounted = false;
        };
    }, []);

    const pickClass = async (chosenClassInfo) => {
        try {
            // Grabs class specific data from api based on selected class
            const classSpecificInfo = (await dndApi.getMoreInfo(chosenClassInfo.url)).data;

            setCharacter({ type: ACTION.CLEAR_CLASS });
            setCharacter({ type: ACTION.UPDATE_CLASS, payload: { name: chosenClassInfo.index, url: chosenClassInfo.url, hitDie: classSpecificInfo.hit_die } });
            //setCharacter({ type: ACTION.UPDATE_BACKGROUND, payload: { savingThrows: [...classSpecificInfo.saving_throws] } });

            setDetails(classSpecificInfo);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <form>
                <p>Pick a Class: </p>
                {classChoices.map((classContent) => (
                    <React.Fragment key={`${classContent.index}`}>
                        <label htmlFor="class">{classContent.name}</label>
                        <input
                            type="radio"
                            name="class"
                            id={classContent.name}
                            defaultChecked={character.class.name === classContent.index}
                            value={classContent.index}
                            onClick={() => pickClass(classContent)}
                        />
                        <br />
                    </React.Fragment>
                ))}
            </form>
        </>
    );
};

export default ClassForm;
