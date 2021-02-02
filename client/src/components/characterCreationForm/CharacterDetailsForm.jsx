import React, { useState, useEffect, useContext, useRef } from 'react';

import dndApi from '../../utils/dnd5eApi';
import CONSTANTS from '../../utils/constants';

import { useCharacter } from '../../state/logic';
import * as ACTION from '../../state/actions';

import FormControlContext from './../../state/formControlManager';

const CharacterDetailsForm = () => {
    const { character, setCharacter, setDetails } = useCharacter();

    const { formControlState, setFormControlState } = useContext(FormControlContext);
    const [backgroundChoices, setBackgroundChoices] = useState([]);

    const [raceLanguages, setRaceLanguages] = useState([]);
    const [raceLanguagesDesc, setRaceLanguagesDesc] = useState();
    const [languageChoices, setLanguageChoices] = useState();
    const [numLanguageChoices, setNumLanguageChoices] = useState(0);
    // const [bonusRaceLanguage, setBonusRaceLanguage] = useState();

    const firstLanguageChoiceRef = useRef(null);
    const secondLanguageChoiceRef = useRef(null);
    const bonusRaceLanguageRef = useRef(null);

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
                // Set backgrounds in local state
                const backgroundList = (await dndApi.getBackgrounds()).data;
                setBackgroundChoices(backgroundList);

                // If there is a background already selected, click the element to render the details
                if (character.background.name !== '') {
                    // *: Resets language in <option> field on component render
                    document.getElementById(character.background.name).click();
                    // const backgroundDetails = backgroundList.filter((background) => background.name === character.background.name);
                    // setDetails(...backgroundDetails);
                }

                // Stores the character's race language, used in case a new background is selected
                const raceLanguagesData = (await dndApi.getMoreInfo(character.race.raceUrl)).data.languages;
                raceLanguagesData.map((language) => {
                    let languageObj = {
                        name: language.name,
                        origin: 'race',
                        url: language.url,
                    };
                    raceLanguages.push(languageObj);
                    if (!character.background.languages.map((lang) => lang.name).includes(languageObj.name)) {
                        character.background.languages.push(languageObj);
                    }
                });
                setRaceLanguages([...raceLanguages]);
                setRaceLanguagesDesc((await dndApi.getMoreInfo(character.race.raceUrl)).data.language_desc);
                setCharacter({ type: ACTION.UPDATE_BACKGROUND, payload: { languages: [...character.background.languages] } });

                // Stores all possible languages, formats data to have name, origin, and url fields
                setLanguageChoices(
                    (await dndApi.getLanguages()).data.results.map((lang) => {
                        return {
                            name: lang.name,
                            origin: 'background',
                            url: lang.url,
                        };
                    })
                );
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

            if (
                (typeof backgroundProp == 'string' && backgroundProp == '') ||
                (typeof backgroundProp == 'number' && backgroundProp == 0) ||
                (Array.isArray(backgroundProp) && backgroundProp.length !== raceLanguages.length + numLanguageChoices + (bonusRaceLanguageRef.current ? 1 : 0))
            ) {
                formDone = false;
                break;
            }
        }
        setFormControlState({ ...formControlState, currentFormDone: formDone });
    }, [character]);

    // ====================================================================================================================
    /*
     * Signature: pickBackground(chosenBackground)
     * input: chosenBackground - the background object that the user picked
     * Description: set character State background
     */
    const pickBackground = (chosenBackground) => {
        // Erase languages that !== origin: "race" by capturing only race languages in a new array of objects
        if (character.background.name != chosenBackground.name) {
            setCharacter({
                type: ACTION.UPDATE_BACKGROUND,
                payload: {
                    languages: raceLanguages,
                    name: chosenBackground.name,
                    url: `/${chosenBackground.id}.json`,
                },
            });
        }
        setDetails(chosenBackground);

        setNumLanguageChoices(chosenBackground['language-choices']);
        // Reset languages if background is changed
        if (bonusRaceLanguageRef.current) bonusRaceLanguageRef.current.value = 'Choose a language';
        if (firstLanguageChoiceRef.current) firstLanguageChoiceRef.current.value = 'Choose a language';
        if (secondLanguageChoiceRef.current) secondLanguageChoiceRef.current.value = 'Choose a language';
    };

    // ===========================================================================================================================
    /*
     * Signature: pickLanguage()
     * Description: Adds languages to state by reading from all fields every time
     */
    const pickLanguage = () => {
        let newLanguages = [];

        if (bonusRaceLanguageRef.current && bonusRaceLanguageRef.current.value !== 'Choose a language') {
            newLanguages.push(JSON.parse(bonusRaceLanguageRef.current.value));
        }
        if (firstLanguageChoiceRef.current && firstLanguageChoiceRef.current.value !== 'Choose a language') {
            newLanguages.push(JSON.parse(firstLanguageChoiceRef.current.value));
        }
        if (secondLanguageChoiceRef.current && secondLanguageChoiceRef.current.value !== 'Choose a language') {
            newLanguages.push(JSON.parse(secondLanguageChoiceRef.current.value));
        }

        setCharacter({ type: ACTION.UPDATE_BACKGROUND, payload: { languages: [...raceLanguages, ...newLanguages] } });
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
                [stat]: e.target.value,
            },
        });
    };

    // ===========================================================================================================================

    return (
        <>
            <main>
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
                                onClick={(e) => pickBackground(backgroundContent)}
                            />
                            <label htmlFor={backgroundContent.name}>
                                {'  '}
                                {backgroundContent.name}
                            </label>
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
                {/* LANGUAGES======================================================================= */}
                <section>
                    <h3>Select your Languages:</h3>
                    <p>{raceLanguagesDesc}</p>

                    {(character.race.name === 'Human' || character.race.name === 'Half-Elf') && (
                        <>
                            <p>Pick one bonus language granted by your race.</p>
                            <select
                                // defaultValue={lang.length !== 0 && JSON.stringify(lang[idx])}
                                name="languages"
                                className="select-style"
                                onChange={(e) => pickLanguage()}
                                ref={bonusRaceLanguageRef}
                                required
                            >
                                <option value="Choose a language">Choose a language</option>
                                {languageChoices &&
                                    languageChoices.map((language, idx) => (
                                        <option
                                            key={idx}
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
                        </>
                    )}
                    {numLanguageChoices !== 0 && (
                        <>
                            <p>
                                Pick {numLanguageChoices === 1 ? 'one bonus language ' : numLanguageChoices === 2 ? 'two bonus languages ' : ''}
                                granted by your <strong>{character.background.name}</strong> background.
                            </p>
                        </>
                    )}

                    {
                        // Render total options for each language choice; disable languages that are already picked
                        [...Array(numLanguageChoices)].map((e, idx) => {
                            const lang = character.background.languages.filter((language) => language.origin === 'background');
                            let selectDefault =
                                character.background.languages.length >= raceLanguages.length + idx + 1
                                    ? JSON.stringify(character.background.languages[raceLanguages.length + idx])
                                    : -1;
                            return (
                                <React.Fragment key={idx}>
                                    <select
                                        className="select-style"
                                        name="languages"
                                        ref={idx === 0 ? firstLanguageChoiceRef : idx === 1 ? secondLanguageChoiceRef : ''}
                                        onChange={(e) => pickLanguage()}
                                        value={selectDefault}
                                        required
                                    >
                                        <option key={idx + 1} value={-1}>
                                            Choose a language
                                        </option>
                                        {languageChoices &&
                                            languageChoices.map((language, idxx) => (
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
                            );
                        })
                    }
                </section>
                {/* AGE, HEIGHT, WEIGHT ============================================================ */}
                <section>
                    <h3>Determine your Age, Height, and Weight.</h3>
                    <label htmlFor="age">Age:</label>
                    <br />
                    <input type="number" placeholder="18" id="age" name="age" defaultValue={character.background.age} onChange={(e) => setStat(e, 'age')} />
                    <br />
                    <label htmlFor="height">Height: </label>
                    <br />
                    <input type="text" id="height" name="height" defaultValue={character.background.height} onChange={(e) => setStat(e, 'height')} />
                    <br />
                    <label htmlFor="weight">Weight: </label>
                    <br />
                    <input type="text" id="weight" name="weight" defaultValue={character.background.weight} onChange={(e) => setStat(e, 'weight')} />
                    <br />
                </section>
                {/* ALIGNMENT ====================================================================== */}
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
                                    style={{ backgroundColor: alignmentStr === character.background.alignment ? '#9b7f30' : '' }}
                                >
                                    {alignmentStr}
                                </button>
                                <br />
                            </React.Fragment>
                        ))
                    }
                </section>
            </main>
        </>
    );
};

export default CharacterDetailsForm;
