import React, { useState, useEffect } from 'react';

import dndApi from '../../utils/dnd5eApi';
import CONSTANTS from '../../utils/constants';

import { useCharacter } from '../../state/logic';
import * as ACTION from '../../state/actions';

const CharacterDetailsForm = () => {
    const { character, setCharacter, setDetails } = useCharacter();

    const [backgroundChoices, setBackgroundChoices] = useState([]);
    const [languageChoices, setLanguageChoices] = useState([]);
    const [numLanguageChoices, setNumLanguageChoices] = useState(0);

    useEffect(() => {
        let mounted = true;

        if (mounted) {
            try {
                dndApi.getBackgrounds().then((response) => setBackgroundChoices(response.data));
                dndApi.getLanguages().then((response) => setLanguageChoices(response.data.results.map((language) => language.name)));
            } catch (err) {
                console.log(err);
            }
        }
        return () => {
            mounted = false;
        };
    }, []);

    const pickBackground = (chosenBackgroundInfo) => {
        setCharacter({ type: ACTION.UPDATE_BACKGROUND, payload: { name: chosenBackgroundInfo.name } });
        setCharacter({ type: ACTION.UPDATE_BACKGROUND, payload: { languages: [] } });

        // setDetailComponentData(chosenBackgroundInfo)

        setNumLanguageChoices(chosenBackgroundInfo['language-choices']);

        // TODO The code to pull the background description can be easily pulled from the backgroundChoices object
        // TODO I was unable to pull the data from the link by id, this does not work!

        // TODO This is something that should be passed to the DETAILS component
        // https://dnd-backgrounds-default-rtdb.firebaseio.com/backgrounds.json/1
        // dndApi
        //     .getMoreBackgroundInfo(chosenBackgroundInfo.name)
        //     .then((data) => {
        //         console.log(data.response);
        //         /*
        //         TODO: this is a good spot to format the data and send what ever we need to the global state
        //     */
        //     })
        //     .catch((err) => console.log(err));
    };

    const pickLanguage = (chosenLanguage, chooseTwo) => {
        console.log(chosenLanguage);
        if (chooseTwo) {
            // TODO Logic that puts languages in state, not yet working
            // let languagesToUpdate = character.background.languages;
            // character.background.languages.length === 2 && languagesToUpdate.shift();
            // languagesToUpdate.push(chosenLanguage);
            // setCharacter({ type: ACTION.UPDATE_BACKGROUND, payload: { languages: [] } });
            // setCharacter({ type: ACTION.UPDATE_BACKGROUND, payload: { languages: languagesToUpdate } });
        } else {
            // setCharacter({ type: ACTION.UPDATE_BACKGROUND, payload: { languages: [] } });
            // setCharacter({ type: ACTION.UPDATE_BACKGROUND, payload: { languages: [chosenLanguage] } });
        }
    };

    const setAlignment = (e) => {
        e.preventDefault();
        console.log(e.target.name);
        // Maybe include a setTimeout to limit the number of hits to update state?
        // setCharacter({ type: ACTION.UPDATE_BACKGROUND, payload: { alignment: e.target.name } });
    };

    const setStat = (e, stat) => {
        e.preventDefault();
        console.log(stat, e.target.value);
        // Maybe include a setTimeout to limit the number of hits to update state?
        // setCharacter({ type: ACTION.UPDATE_BACKGROUND, payload: { [stat]: e.target.value } });
    };

    return (
        <>
            <form>
                {/* BACKGROUND */}
                <section>
                    <h3>Pick a Background: </h3>
                    {backgroundChoices.map((backgroundContent, idx) => (
                        <React.Fragment key={idx}>
                            <input
                                type="radio"
                                name="background"
                                id={backgroundContent.name}
                                value={backgroundContent.index}
                                onClick={() => pickBackground(backgroundContent)}
                            />
                            <label htmlFor={backgroundContent.name}>{backgroundContent.name}</label>
                            <br />
                        </React.Fragment>
                    ))}
                    <br />
                    <textarea
                        maxLength="255"
                        name="personality"
                        style={{ resize: 'none', width: '100%' }}
                        rows="8"
                        placeholder="Enter a description for your character's personality and appearance."
                    ></textarea>
                </section>
                {/* LANGUAGES */}
                <section>
                    <h3>Select your Languages:</h3>
                    <p>Your current proficient languages determined by your race:</p>
                    {character.race.languages.map((raceLanguage, idx) => (
                        <p key={idx}>{raceLanguage}</p>
                    ))}

                    {/* I was getting strange bugs here, I had to separate these two lines of code that check the same condition */}
                    {numLanguageChoices !== 0 && (
                        <p>
                            Pick {numLanguageChoices === 1 ? 'one bonus language' : numLanguageChoices === 2 ? 'two bonus languages' : ''} granted by your
                            <strong> {character.background.name} </strong>background.
                        </p>
                    )}
                    {numLanguageChoices !== 0 &&
                        // Creates an array that is either: [1] or [1, 2]. Enables one or two <select> objects to render
                        [...Array(numLanguageChoices)].map((e, idx) => (
                            <React.Fragment key={idx}>
                                <select name="languages" onChange={(e) => pickLanguage(e.target.value, false)} required>
                                    {languageChoices.map((language, idxx) => (
                                        <option
                                            key={idxx}
                                            value={language}
                                            disabled={
                                                !(
                                                    language !== character.race.languages[0] &&
                                                    language !== character.race.languages[1] &&
                                                    language !== character.background.languages[0] &&
                                                    language !== character.background.languages[1]
                                                )
                                            }
                                        >
                                            {language}
                                        </option>
                                    ))}
                                </select>
                                <br />
                            </React.Fragment>
                        ))}
                </section>
                {/* AGE, HEIGHT, WEIGHT */}
                <section>
                    {/* TODO - Implement logic / checks based on race */}
                    <h3>Determine your Age, Height, and Weight.</h3>
                    <label htmlFor="age">Age: </label>
                    <input type="number" placeholder="18" id="age" name="age" onChange={(e) => setStat(e, 'age')} />
                    <br />
                    <label htmlFor="height">Height: </label>
                    <input type="text" id="height" name="height" onChange={(e) => setStat(e, 'height')} />
                    <br />
                    <label htmlFor="weight">Weight: </label>
                    <input type="text" id="weight" name="weight" onChange={(e) => setStat(e, 'weight')} />
                    <br />
                </section>
                {/* ALIGNMENT */}
                <section>
                    <h3>Choose your Alignment</h3>
                    {/* Render details of each alignment in DETAILS component. */}
                    {CONSTANTS.ALIGNMENTS.map((alignment, idx) => (
                        <React.Fragment key={idx}>
                            <button key={idx} name={alignment} onClick={(e) => setAlignment(e)} style={{ width: 200 }}>
                                {alignment}
                            </button>
                            <br />
                        </React.Fragment>
                    ))}
                </section>
            </form>
        </>
    );
};

export default CharacterDetailsForm;
