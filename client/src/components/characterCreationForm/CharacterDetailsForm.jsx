import React, { useState, useEffect } from 'react';

import dndApi from '../../utils/dnd5eApi';
import CONSTANTS from '../../utils/constants';

import { useCharacter } from '../../state/logic';
import * as ACTION from '../../state/actions';
import constants from '../../utils/constants';

const CharacterDetailsForm = () => {
    const { character, setCharacter, setDetails } = useCharacter();

    const [backgroundChoices, setBackgroundChoices] = useState([]);
    const [languageChoices, setLanguageChoices] = useState([]);
    // length of array = # choices based on background; value is index offset to add/remove 
    const [languageChoicesOffset, setLanguageChoicesOffset] = useState([]); 
    const [raceLanguages, setRaceLanguages] = useState();

    /*
    * Signature: useEffect(func, [])
    * Description: populates the background choices that users can
    *               pick from; populates the raceLanguage state and the 
    *               global state languages for languages that the user
    *               already has; populates languageChoices
    */
    useEffect(async () => {
        let mounted = true;
        if (mounted) {
            try {
                const backgroundList = (await dndApi.getBackgrounds()).data;
                setBackgroundChoices(backgroundList);
                setLanguageChoices((await dndApi.getLanguages()).data.results);

                // If there is a background already selected, pass selected object and render in details component
                /*if (character.background.name !== '') {
                    const backgroundDetails = backgroundList.filter((background) => background.name === character.background.name);
                    setDetails(...backgroundDetails);
                }*/

                const raceLanguages = (await dndApi.getMoreInfo(character.race.url[0])).data.languages;
                character.background.languages = raceLanguages.map((content) => {
                    return {
                        name: content.name, 
                        url: content.url, 
                        origin: "race"
                    }
                })
                setRaceLanguages([...character.background.languages]);
            } catch (err) {
                console.error(err);
            }
        }
        return () => {
            mounted = false;
        };
    }, []);

    // ====================================================================================================================
    /*
    * Signature: pickBackground(chosenBackground)
    * input: chosenBackground - the background object that the user picked
    * Description: set character State background
    */
    const pickBackground = (chosenBackground) => {
        setCharacter({ 
            type: ACTION.UPDATE_BACKGROUND, 
            payload: { 
                name: chosenBackground.name, 
                url: `/${chosenBackground.id}.json`
            } 
        });
        //setDetails(chosenBackgroundInfo);

        // Erase background languages, NOT race languages
        //setCharacter({ type: ACTION.UPDATE_BACKGROUND, payload: { languages: raceLanguages } });
        let arrOffset = []
        for(let i = 0; i < chosenBackground['language-choices']; i++){
            arrOffset.push(i)
        }
        setLanguageChoicesOffset(arrOffset)
    };

    // ===========================================================================================================================
    /*
    * Signature: pickLanguage(chosenLanguage, index)
    * input: chosenLanguage - the language object that is chosen by the user
    *        index - the index where we have to add/ change it in the character state
    * Description: format the language object and add it in state; if a chocie was 
    *              previously made, change the object at the index given
    */
    const pickLanguage = async (chosenLanguage, index) => {
        let indexToEdit = raceLanguages.length + parseInt(index)
        if(character.background.languages.length == indexToEdit){
            (character.background.languages).push({ 
                name: chosenLanguage.name, 
                origin: 'background', 
                url: chosenLanguage.url 
            })
        }
        else{
            character.background.languages[indexToEdit] = { 
                name: chosenLanguage.name, 
                origin: 'background', 
                url: chosenLanguage.url 
            }
        }
        setCharacter({
            type: ACTION.UPDATE_BACKGROUND,
            payload: {
                languages: [...character.background.languages]
            },
        });
        //setDetails();
        try {
            //setDetails((await dndApi.getMoreInfo(formatUrl)).data);
        } catch (err) {
            console.log(err);
        }
    };

    // ===========================================================================================================================
    /*
    * Signature: setAlignment(e)
    * input: e - the click event
    * Description: set the character state based off of the value
    *               of the event target
    */
    const setAlignment = (e) => {
        e.preventDefault();
        setCharacter({ 
            type: ACTION.UPDATE_BACKGROUND, 
            payload: { 
                alignment: e.target.value
            } 
        });
    };

    // ===========================================================================================================================
    /*
    * Signature: setStat(e, stat)
    * input: e - the event causing input change
    *        stat - the property from the background object that we want to update
    * Description: set the character state based off of the value
    *               of the event target
    */
    const setStat = (e, stat) => {
        e.preventDefault();
        setCharacter({ 
            type: ACTION.UPDATE_BACKGROUND, 
            payload: { 
                [stat]: e.target.value 
            } 
        });
    };

    // ===========================================================================================================================

    return (
        <>
            <form>
                {/* BACKGROUND====================================================================== */}
                <section>
                    <h3>Pick a Background: </h3>
                    {
                        backgroundChoices.map((backgroundContent, idx) => (
                            <React.Fragment key={idx}>
                                <input
                                    type="radio"
                                    name="background"
                                    id={backgroundContent.name}
                                    value={backgroundContent.name}
                                    onClick={() => pickBackground(backgroundContent)}
                                />
                                <label htmlFor={backgroundContent.name}>{backgroundContent.name}</label>
                                <br />
                            </React.Fragment>
                        ))
                    }
                    <br />

                    {/* appearance */}
                    <textarea
                        maxLength="255"
                        name="appearance"
                        style={{ resize: 'none', width: '100%' }}
                        rows="8"
                        value={character.background.appearance}
                        placeholder="Enter a description for your character's appearance."
                        onChange={(e) => setStat(e, 'appearance')}
                    ></textarea>

                    {/* personality */}
                    <textarea
                        maxLength="255"
                        name="personality"
                        style={{ resize: 'none', width: '100%' }}
                        rows="8"
                        value={character.background.personality}
                        placeholder="Enter a description for your character's personality."
                        onChange={(e) => setStat(e, 'personality')}
                    ></textarea>
                </section>

                {/* LANGUAGES=============================================================================== */}
                <section>
                    <h3>Select your Languages:</h3>
                    <p>Your current proficient languages determined by your race:</p>
                    { // render languages users already have based on their race
                        raceLanguages &&
                        raceLanguages.map((language, idx) => 
                            <p key={idx}>{language.name}</p>
                        )
                    }

                    { 
                        languageChoicesOffset.length !== 0 &&
                        <p>        
                            Pick {languageChoicesOffset.length === 1 ? 'one bonus language' : languageChoicesOffset.length === 2 ? 'two bonus languages' : ''} 
                            granted by your <strong> {character.background.name} </strong>background.
                        </p>
                    }

                    { //render total options for each language choice; disable languages that are already picked
                        languageChoicesOffset.map((e, idx) => (
                            <React.Fragment key={idx}>
                                <select defaultValue={-1} name="languages" id={idx} onChange={(e) => pickLanguage(JSON.parse(e.target.value), e.target.id)} required>
                                    <option value={-1} disabled> no assignment </option>
                                    {
                                        languageChoices.map((language, idxx) => (
                                            <option key={idxx} 
                                            value={JSON.stringify(language)}
                                            disabled={(character.background.languages).map((lang) => lang.url).includes(language.url)}
                                            >
                                                {language.name}
                                            </option>
                                        ))
                                    }
                                </select>
                                <br />
                            </React.Fragment>
                        ))
                    }
                </section>
                {/* AGE, HEIGHT, WEIGHT ===============================================================================================*/}
                <section>
                    <h3>Determine your Age, Height, and Weight.</h3>
                    <label htmlFor="age">Age: </label>
                    <input type="number" placeholder="18" id="age" name="age" defaultValue={character.background.age} onChange={(e) => setStat(e, 'age')} />
                    <br />
                    <label htmlFor="height">Height: </label>
                    <input type="text" id="height" name="height" defaultValue={character.background.height} onChange={(e) => setStat(e, 'height')} />
                    <br />
                    <label htmlFor="weight">Weight: </label>
                    <input type="text" id="weight" name="weight" defaultValue={character.background.weight} onChange={(e) => setStat(e, 'weight')} />
                    <br />
                </section>
                {/* ALIGNMENT ==========================================================================================================*/}
                <section>
                    <h3>Choose your Alignment</h3>
                    { // render buttons for each alignment
                        CONSTANTS.ALIGNMENTS.map((alignmentStr, idx) => 
                            <React.Fragment key={idx}>
                                <button
                                    key={idx}
                                    value={alignmentStr}
                                    onClick={(e) => setAlignment(e)}
                                    style={{ width: 200, backgroundColor: (alignmentStr === character.background.alignment) ? 'red' : '' }}
                                >
                                    {alignmentStr}
                                </button>
                                <br />
                            </React.Fragment>
                            
                        )
                    }
                </section>
            </form>
        </>
    );
};

export default CharacterDetailsForm;
