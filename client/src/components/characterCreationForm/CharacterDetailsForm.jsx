import React, { useState, useEffect } from 'react';
import dndApi from '../../utils/dnd5eApi';
import { useCharacter } from '../../state/logic';
import * as ACTION from '../../state/actions';

const CharacterDetailsForm = () => {
    const { character, setCharacter } = useCharacter();

    const [backgroundChoices, setBackgroundChoices] = useState([]);
    const [languageChoices, setLanguageChoices] = useState([]);
    const [numLanguageChoices, setNumLanguageChoices] = useState(0);

    useEffect(() => {
        dndApi
            .getBackgrounds()
            .then((response) => setBackgroundChoices(response.data))
            .catch((err) => console.log(err));
        dndApi
            .getLanguages()
            .then((response) => setLanguageChoices(response.data.results.map((language) => language.name)))
            .catch((err) => console.log(err));
    }, []);

    const pickBackground = (chosenBackgroundInfo) => {
        setCharacter({ type: ACTION.UPDATE_BACKGROUND, payload: { name: chosenBackgroundInfo.name } });
        setCharacter({ type: ACTION.UPDATE_BACKGROUND, payload: { languages: [] } });

        setNumLanguageChoices(chosenBackgroundInfo['language-choices']);

        // TODO The code to pull the background description can be easily pulled from the backgroundChoices object
        // TODO I was unable to pull the data from the link by id, this does not work!
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
        if (chooseTwo) {
            let languagesToUpdate = character.background.languages;
            character.background.languages.length === 2 && languagesToUpdate.shift();
            languagesToUpdate.push(chosenLanguage);

            setCharacter({ type: ACTION.UPDATE_BACKGROUND, payload: { languages: [] } });
            setCharacter({ type: ACTION.UPDATE_BACKGROUND, payload: { languages: languagesToUpdate } });
        } else {
            setCharacter({ type: ACTION.UPDATE_BACKGROUND, payload: { languages: [] } });
            setCharacter({ type: ACTION.UPDATE_BACKGROUND, payload: { languages: [chosenLanguage] } });
        }
    };

    //note: having a form here is kind of useless but for the sake of being semantic
    return (
        <>
            <form>
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

                <section>
                    <h3>Select your Languages:</h3>
                    <p>Your current proficient languages determined by your race:</p>
                    {character.race.languages.map((raceLanguage, idx) => (
                        <p key={idx}>{raceLanguage}</p>
                    ))}
                    {numLanguageChoices ? (
                        numLanguageChoices === 1 ? (
                            <>
                                <p>
                                    Pick one bonus language granted by your <strong>{character.background.name}</strong> background.
                                </p>
                                {/* <SelectLanguages languageChoices={languageChoices} setLanguageChoices={setLanguageChoices} /> */}
                                <select name="languages" onChange={(e) => pickLanguage(e.target.value, false)} required>
                                    {languageChoices.map((language, idx) => (
                                        <option
                                            key={idx}
                                            value={language}
                                            disabled={
                                                !(
                                                    language !== character.race.languages[0] &&
                                                    language !== character.race.languages[1] &&
                                                    language !== character.background.languages[0]
                                                )
                                            }
                                        >
                                            {language}
                                        </option>
                                    ))}
                                </select>
                            </>
                        ) : numLanguageChoices === 2 ? (
                            <>
                                <p>
                                    Pick two bonus languages granted by your <strong>{character.background.name}</strong> background.
                                </p>

                                {/* DOES NOT CURRENTLY ADD BOTH LANGUAGES TO STATE */}
                                {/* <SelectLanguages languageChoices={languageChoices} setLanguageChoices={setLanguageChoices} chooseTwo /> */}
                                <>
                                    <select name="languages" onChange={(e) => pickLanguage(e.target.value, true)} required>
                                        {languageChoices.map((language, idx) => (
                                            <option
                                                key={idx}
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
                                    <select name="languages" onChange={(e) => pickLanguage(e.target.value, true)} required>
                                        {languageChoices.map((language, idx) => (
                                            <option
                                                key={idx}
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
                                </>
                                <br />
                            </>
                        ) : null
                    ) : null}
                </section>
            </form>
        </>
    );
};

export default CharacterDetailsForm;

const SelectLanguages = ({ languageChoices, chooseTwo }) => {
    const { character, setCharacter } = useCharacter();

    const pickLanguage = (chosenLanguage) => {
        if (chooseTwo) {
        } else {
            setCharacter({ type: ACTION.UPDATE_BACKGROUND, payload: { languages: [] } });
            setCharacter({ type: ACTION.UPDATE_BACKGROUND, payload: { languages: [chosenLanguage] } });
        }
    };

    if (chooseTwo) {
        return (
            <>
                <select name="languages" onChange={(e) => pickLanguage(e.target.value)} required>
                    {languageChoices.map((language, idx) => (
                        <option
                            key={idx}
                            value={language}
                            disabled={
                                !(
                                    language !== character.race.languages[0] &&
                                    language !== character.race.languages[1] &&
                                    language !== character.background.languages[0]
                                )
                            }
                        >
                            {language}
                        </option>
                    ))}
                </select>
                <select name="languages" onChange={(e) => pickLanguage(e.target.value)} required>
                    {languageChoices.map((language, idx) => (
                        <option
                            key={idx}
                            value={language}
                            disabled={
                                !(
                                    language !== character.race.languages[0] &&
                                    language !== character.race.languages[1] &&
                                    language !== character.background.languages[0]
                                )
                            }
                        >
                            {language}
                        </option>
                    ))}
                </select>
            </>
        );
    } else {
        return (
            <select name="languages" onChange={(e) => pickLanguage(e.target.value)} required>
                {languageChoices.map((language, idx) => (
                    <option
                        key={idx}
                        value={language}
                        disabled={
                            !(
                                language !== character.race.languages[0] &&
                                language !== character.race.languages[1] &&
                                language !== character.background.languages[0]
                            )
                        }
                    >
                        {language}
                    </option>
                ))}
            </select>
        );
    }
};
