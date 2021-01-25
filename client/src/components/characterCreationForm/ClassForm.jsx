import React, { useState, useEffect, useContext } from 'react';
import dndApi from '../../utils/dnd5eApi';
import { useCharacter } from '../../state/logic';
import * as ACTION from '../../state/actions';
import FormControlContext from "./../../state/formControlManager";

const ClassForm = () => {
    const { character, setCharacter, setDetails } = useCharacter();
    const [classChoices, setClassChoices] = useState([]);
    const {formControlState, setFormControlState} = useContext(FormControlContext);

    /*
    * Signature: useEffect(func, [])
    * Description: Fetches all possible class choices from dnd5e api
    *               each class choice is an object with the format
    *               {index, name, url}  
    */
    useEffect(async () => {
        let mounted = true;
        if (mounted) {
            try {
                setClassChoices((await dndApi.getClasses()).data.results);
                /*if (character.class.name !== '') {
                    setDetails((await dndApi.getMoreInfo(character.class.url)).data);
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
        if(character.class.name != ""){
            setFormControlState({...formControlState, currentFormDone: true})
        }
        else{
            setFormControlState({...formControlState, currentFormDone: false})
        }
    }, [character])


    /*
    * Signature: pickClass(chosenClass)
    * Input: chosenClass - the class object ({name, index, url}) the user chooses
    * Description: Sets the character state property class to reflect the user's
    *               chosen class
    */
    const pickClass = async (chosenClass) => {
        try {
            const classInfo = (await dndApi.getMoreInfo(chosenClass.url)).data;

            //setCharacter({ type: ACTION.CLEAR_CLASS });
            setCharacter({ 
                type: ACTION.UPDATE_CLASS, 
                payload: { 
                    name: chosenClass.name, 
                    url: chosenClass.url, 
                    hitDie: classInfo.hit_die 
                } 
            });

            //setDetails(classSpecificInfo);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            <form>
                <p>Pick a Class: </p>
                { //render radio options for classes
                    classChoices.map((classObj, idx) => (
                        <React.Fragment key={idx}>
                            <label htmlFor={classObj.name}>{classObj.name}</label>
                            <input
                                type="radio"
                                name="class"
                                id={classObj.name}
                                defaultChecked={classObj.name == character.class.name}
                                value={JSON.stringify(classObj)}
                                onClick={() => pickClass(classObj)}
                            />
                            <br />
                        </React.Fragment>
                    ))
                }
            </form>
        </>
    );
};

export default ClassForm;
