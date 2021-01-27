import React, { useState, useEffect, useContext } from 'react';

import dndApi from '../../utils/dnd5eApi';
import CONSTANTS from '../../utils/constants';

import { useCharacter } from '../../state/logic';
import * as ACTION from '../../state/actions';
import constants from '../../utils/constants';

import FormControlContext from './../../state/formControlManager';

const CharacterDetailsForm = () => {
    const { character, setCharacter, setDetails } = useCharacter();

    const { formControlState, setFormControlState } = useContext(FormControlContext);
    const [backgroundChoices, setBackgroundChoices] = useState([]);
    const [languageChoices, setLanguageChoices] = useState([]);

    // length of array = # choices based on background; value is index offset to add/remove
    const [languageChoicesOffset, setLanguageChoicesOffset] = useState([]);
    const [raceLanguages, setRaceLanguages] = useState([]);

    /*
     * Signature: useEffect(func, [])
     * Description: populates the background choices that users can
     *               pick from; populates the raceLanguage state and the
     *               global state languages for languages that the user
     *               already has; populates languageChoices
     */
    useEffect(async () => {
        // Reset details component
        setDetails({});

        let mounted = true;
        if (mounted) {
            try {
                const backgroundList = (await dndApi.getBackgrounds()).data;
                setBackgroundChoices(backgroundList);
                setLanguageChoices(
                    (await dndApi.getLanguages()).data.results.map((lang) => {
                        return {
                            name: lang.name,
                            origin: 'background',
                            url: lang.url,
                        };
                    })
                );

                // If there is a background already selected, pass selected object and render in details component
                /*if (character.background.name !== '') {
                    const backgroundDetails = backgroundList.filter((background) => background.name === character.background.name);
                    setDetails(...backgroundDetails);
                }*/

                const raceLanguagesArr = (await dndApi.getMoreInfo(character.race.url[0])).data.languages;

                const newCharacter = character.background.languages.length == 0;
                raceLanguagesArr.map((content) => {
                    let languageObj = {
                        name: content.name,
                        url: content.url,
                        origin: 'race',
                    };
                    raceLanguages.push(languageObj);
                    setRaceLanguages([...raceLanguages]);
                    if (newCharacter) {
                        character.background.languages.push(languageObj);
                        setCharacter({
                            type: ACTION.UPDATE_BACKGROUND,
                            payload: {
                                ...character.background,
                                languages: [...character.background.languages],
                            },
                        });
                    }
                });

                if (character.background.name != '') {
                    let arrOffset = [];
                    let chosenBackground = (await dndApi.getBackground(character.background.url)).data;
                    for (let i = 0; i < chosenBackground['language-choices']; i++) {
                        arrOffset.push(i);
                    }
                    setLanguageChoicesOffset(arrOffset);
                }
            } catch (err) {
                console.error(err);
            }
        }
        return () => {
            mounted = false;
        };
    }, []);
    /*
     * Signature: useEffect(func, [character,  abilityScoreIdxMatch, abilityScoreChoices])
     * Description: watch for character changes on background to determine if the
     *              user can move on to the next section via the formControlState
     */
    useEffect(() => {
        let formDone = true;
        for (const key in character.background) {
            let backgroundProp = character.background[key];

            console.log(Array.isArray(backgroundProp) && backgroundProp.length != raceLanguages.length + languageChoicesOffset.length);
            if (Array.isArray(backgroundProp) && backgroundProp.length != raceLanguages.length + languageChoicesOffset.length) {
                console.log(backgroundProp);
                console.log(backgroundProp.length);
                console.log(raceLanguages.length);
                console.log(languageChoicesOffset.length);
            }
            if (
                (typeof backgroundProp == 'string' && backgroundProp == '') ||
                (typeof backgroundProp == 'number' && backgroundProp == 0) ||
                (Array.isArray(backgroundProp) && backgroundProp.length != raceLanguages.length + languageChoicesOffset.length)
            ) {
                formDone = false;
                break;
            }
        }
        setFormControlState({ ...formControlState, currentFormDone: formDone });
    }, [character, raceLanguages, languageChoicesOffset]);

    // ====================================================================================================================
    /*
     * Signature: pickBackground(chosenBackground)
     * input: chosenBackground - the background object that the user picked
     * Description: set character State background
     */
    const pickBackground = (chosenBackground) => {
        if (chosenBackground.name != character.background.name) {
            let maxIndexOfBkLang = character.background.languages.length - raceLanguages.length;
            character.background.languages.splice(raceLanguages.length, maxIndexOfBkLang);
        }
        setCharacter({
            type: ACTION.UPDATE_BACKGROUND,
            payload: {
                ...character.background,
                name: chosenBackground.name,
                url: `/${chosenBackground.id}.json`,
            },
        });
        setDetails(chosenBackground);

        // Erase background languages, NOT race languages
        //setCharacter({ type: ACTION.UPDATE_BACKGROUND, payload: { languages: raceLanguages } });
        let arrOffset = [];
        for (let i = 0; i < chosenBackground['language-choices']; i++) {
            arrOffset.push(i);
        }
        setLanguageChoicesOffset(arrOffset);
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
        let indexToEdit = raceLanguages.length + parseInt(index);
        if (character.background.languages.length == indexToEdit) {
            character.background.languages.push(
                /*{
                name: chosenLanguage.name,
                origin: 'background',
                url: chosenLanguage.url,
            }*/ chosenLanguage
            );
        } else {
            character.background.languages[
                indexToEdit
            ] = chosenLanguage /*{
                name: chosenLanguage.name,
                origin: 'background',
                url: chosenLanguage.url,
            }*/;
        }
        setCharacter({
            type: ACTION.UPDATE_BACKGROUND,
            payload: {
                ...character.background,
                languages: [...character.background.languages],
            },
        });

        try {
            // setDetails((await dndApi.getMoreInfo(chosenLanguage.url)).data);
        } catch (err) {
            console.log(err);
        }
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
                ...character.background,
                [stat]: e.target.value,
            },
        });
    };

    // ===========================================================================================================================

    return (
        <>
            <form>
                {/* BACKGROUND====================================================================== */}
                <section>
                    <h3>Character Name</h3>
                    <input name="characterName" type="text" defaultValue={character.background.characterName} onChange={(e) => setStat(e, 'characterName')} />

                    <h3>Pick a Background: </h3>
                    {backgroundChoices.map((backgroundContent, idx) => (
                        <React.Fragment key={idx}>
                            <input
                                type="radio"
                                name="background"
                                id={backgroundContent.name}
                                value={backgroundContent.name}
                                defaultChecked={backgroundContent.name == character.background.name}
                                onClick={() => pickBackground(backgroundContent)}
                            />
                            <label htmlFor={backgroundContent.name}>{backgroundContent.name}</label>
                            <br />
                        </React.Fragment>
                    ))}
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
                    {
                        // render languages users already have based on their race
                        raceLanguages && raceLanguages.map((language, idx) => <p key={idx}>{language.name}</p>)
                    }

                    {languageChoicesOffset.length !== 0 && (
                        <p>
                            Pick {languageChoicesOffset.length === 1 ? 'one bonus language' : languageChoicesOffset.length === 2 ? 'two bonus languages' : ''}
                            granted by your <strong> {character.background.name} </strong>background.
                        </p>
                    )}

                    {
                        //render total options for each language choice; disable languages that are already picked
                        languageChoicesOffset.map((index, idx) => (
                            <React.Fragment key={idx}>
                                <select
                                    defaultValue={
                                        character.background.languages.length >= raceLanguages.length + idx + 1
                                            ? JSON.stringify(character.background.languages[raceLanguages.length + idx])
                                            : -1
                                    }
                                    name="languages"
                                    id={idx}
                                    onChange={(e) => pickLanguage(JSON.parse(e.target.value), e.target.id)}
                                    required
                                >
                                    <option value={-1} disabled>
                                        {' '}
                                        no assignment{' '}
                                    </option>
                                    {languageChoices.map((language, idxx) => (
                                        <option
                                            key={idxx}
                                            value={JSON.stringify(language)}
                                            disabled={character.background.languages
                                                .map((lang) => (lang.hasOwnProperty('name') ? lang.name : ''))
                                                .includes(language.name)}
                                        >
                                            {language.name}
                                        </option>
                                    ))}
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
                    {
                        // render buttons for each alignment
                        CONSTANTS.ALIGNMENTS.map((alignmentStr, idx) => (
                            <React.Fragment key={idx}>
                                <button
                                    key={idx}
                                    value={alignmentStr}
                                    onClick={(e) => setStat(e, 'alignment')}
                                    style={{ width: 200, backgroundColor: alignmentStr === character.background.alignment ? 'red' : '' }}
                                >
                                    {alignmentStr}
                                </button>
                                <br />
                            </React.Fragment>
                        ))
                    }
                </section>
            </form>
        </>
    );
};

export default CharacterDetailsForm;
