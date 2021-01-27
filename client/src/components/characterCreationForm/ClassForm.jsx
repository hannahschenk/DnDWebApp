<<<<<<< HEAD
import React, {useState, useEffect} from 'react';
import dndApi from "../../utils/dnd5eApi";

const ClassForm = () => {
    const [classChoices, setClassChoices]  = useState([]);

    useEffect(() => {
        dndApi.getClasses()
        .then((response) => setClassChoices(response.data.results))
        .catch(err => console.log(err))
    }, [])


    const pickClass = (chosenClassInfo) => {
        dndApi.getMoreInfo(chosenClassInfo.url)
        .then(data => {
            console.log(data.response)
            /*
                TODO: this is a good spot to format the data and send what ever we need to the global state
            */
        })
        .catch(err => console.log(err))
    }

    //note: having a form here is kind of useless but for the sake of being semantic
=======
import React, { useState, useEffect } from 'react';
import dndApi from '../../utils/dnd5eApi';
import { useCharacter } from '../../state/logic';
import * as ACTION from '../../state/actions';

const ClassForm = () => {
    const { character, setCharacter, setDetails } = useCharacter();
    const [classChoices, setClassChoices] = useState([]);

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

>>>>>>> 81149a80e997d95cfb5b910ad72ddd9ffce54b23
    return (
        <>
            <form>
                <p>Pick a Class: </p>
<<<<<<< HEAD
                {
                    classChoices.map((classContent) => 
                        <React.Fragment key={`${classContent.index}`}>
                            <label htmlFor="class">{classContent.name}</label>
                            <input 
                                type="radio" 
                                name="class"
                                id="class"
                                value={classContent.index}
                                onClick={() => pickClass(classContent)}
                            /><br/>
                        </React.Fragment>
                    )
=======
                { //render radio options for classes
                    classChoices.map((classObj, idx) => (
                        <React.Fragment key={idx}>
                            <label htmlFor={classObj.name}>{classObj.name}</label>
                            <input
                                type="radio"
                                name="class"
                                id={classObj.name}
                                value={JSON.stringify(classObj)}
                                onClick={() => pickClass(classObj)}
                            />
                            <br />
                        </React.Fragment>
                    ))
>>>>>>> 81149a80e997d95cfb5b910ad72ddd9ffce54b23
                }
            </form>
        </>
    );
};

<<<<<<< HEAD
export default ClassForm;
=======
export default ClassForm;
>>>>>>> 81149a80e997d95cfb5b910ad72ddd9ffce54b23
