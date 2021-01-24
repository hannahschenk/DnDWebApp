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
    const [raceLanguages, setRaceLanguages] = useState();

    useEffect(async () => {
        let mounted = true;

        if (mounted) {
            try {
                const backgroundInfo = (await dndApi.getBackgrounds()).data;
                setBackgroundChoices(backgroundInfo);

                // If there is a background already selected, pass selected object and render in details component
                if (character.background.name !== '') {
                    const backgroundDetails = backgroundInfo.filter((background) => background.name === character.background.name);
                    setDetails(...backgroundDetails);
                }

                setLanguageChoices((await dndApi.getLanguages()).data.results);
                setRaceLanguages(character.background.languages);
            } catch (err) {
                console.log(err);
            }
        }
        return () => {
            mounted = false;
        };
    }, []);

    // ===========================================================================================================================

    const pickBackground = (chosenBackgroundInfo) => {
        // Backgrounds do not have a separate url, bc we aren't using dnd5e API
        setCharacter({ type: ACTION.UPDATE_BACKGROUND, payload: { name: chosenBackgroundInfo.name } });
        setDetails(chosenBackgroundInfo);

        // Erase background languages, NOT race languages
        setCharacter({ type: ACTION.UPDATE_BACKGROUND, payload: { languages: raceLanguages } });
        setNumLanguageChoices(chosenBackgroundInfo['language-choices']);
    };

    // ===========================================================================================================================

    const pickLanguage = async (chosenLanguage) => {
        const formatUrl = `/api/languages/${chosenLanguage.replace(/\s/g, '-').toLowerCase()}`;

        setCharacter({
            type: ACTION.UPDATE_BACKGROUND,
            payload: {
                languages: [...character.background.languages, { name: chosenLanguage, origin: 'background', url: formatUrl }],
            },
        });
        setDetails();
        try {
            setDetails((await dndApi.getMoreInfo(formatUrl)).data);
        } catch (err) {
            console.log(err);
        }
    };

    // ===========================================================================================================================

    const setAlignment = (e) => {
        e.preventDefault();

        document.querySelectorAll('.alignments__btn').forEach((alignmentButton) => {
            alignmentButton.style.backgroundColor = '';
        });

        e.target.style.backgroundColor = 'red';

        setCharacter({ type: ACTION.UPDATE_BACKGROUND, payload: { alignment: e.target.name } });
    };

    // ===========================================================================================================================

    // This logic makes changes to the state (at most) once a second
    let timer;
    const setStat = (e, stat) => {
        e.preventDefault();

        if (timer) return;

        timer = setTimeout(() => {
            setCharacter({ type: ACTION.UPDATE_BACKGROUND, payload: { [stat]: e.target.value } });
            timer = undefined;
        }, 1000);
    };

    // ===========================================================================================================================

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
                                defaultChecked={character.background.name === backgroundContent.name}
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
                        defaultValue={character.background.appearance}
                        placeholder="Enter a description for your character's personality and appearance."
                        onChange={(e) => setStat(e, 'appearance')}
                    ></textarea>
                </section>
                {/* LANGUAGES */}
                <section>
                    <h3>Select your Languages:</h3>
                    <p>Your current proficient languages determined by your race:</p>
                    {raceLanguages &&
                        raceLanguages.map((language, idx) => {
                            return language.origin === 'race' && <p key={idx}>{language.name}</p>;
                        })}

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
                                <select name="languages" onChange={(e) => pickLanguage(e.target.value, numLanguageChoices)} required>
                                    {languageChoices.map((language, idxx) => (
                                        <option
                                            key={idxx}
                                            value={language.name}
                                            // defaultValue={}
                                            disabled={
                                                // There has to be a better way of doing this...
                                                // console.log(language)
                                                character.background.languages.filter((lang) => language.name !== lang.name).length !== 0 ? false : true

                                                // (character.background.languages[0] && character.background.languages[0].name === language.name) ||
                                                // (character.background.languages[1] && character.background.languages[1].name === language.name) ||
                                                // (character.background.languages[2] && character.background.languages[2].name === language.name) ||
                                                // (character.background.languages[3] && character.background.languages[3].name === language.name)
                                            }
                                        >
                                            {language.name}
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
                    <input type="number" placeholder="18" id="age" name="age" defaultValue={character.background.age} onChange={(e) => setStat(e, 'age')} />
                    <br />
                    <label htmlFor="height">Height: </label>
                    <input type="text" id="height" name="height" defaultValue={character.background.height} onChange={(e) => setStat(e, 'height')} />
                    <br />
                    <label htmlFor="weight">Weight: </label>
                    <input type="text" id="weight" name="weight" defaultValue={character.background.weight} onChange={(e) => setStat(e, 'weight')} />
                    <br />
                </section>
                {/* ALIGNMENT */}
                <section>
                    <h3>Choose your Alignment</h3>
                    {/* Render details of each alignment in DETAILS component. */}
                    {CONSTANTS.ALIGNMENTS.map((alignment, idx) => {
                        // console.log(alignment, character.background.alignment);
                        const selected = alignment === character.background.alignment ? 'red' : '';

                        return (
                            <React.Fragment key={idx}>
                                <button
                                    className="alignments__btn"
                                    key={idx}
                                    name={alignment}
                                    onClick={(e) => setAlignment(e)}
                                    style={{ width: 200, backgroundColor: selected }}
                                >
                                    {alignment}
                                </button>
                                <br />
                            </React.Fragment>
                        );
                    })}
                </section>
            </form>
        </>
    );
};

export default CharacterDetailsForm;
