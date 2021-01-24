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
                //we need to have a completely different array
                setRaceLanguages([...character.background.languages]);

            } catch (err) {
                console.log(err);
            }
        }
        return () => {
            mounted = false;
        };
    }, []);
    
    useEffect(() => {
        console.log(numLanguageChoices)
    },[numLanguageChoices])

    // ===========================================================================================================================

    const pickBackground = (chosenBackgroundInfo) => {
        // Backgrounds do not have a separate url, bc we aren't using dnd5e API
        console.log(chosenBackgroundInfo)
        let chosenBackgroundUrl = `https://dnd-backgrounds-default-rtdb.firebaseio.com/backgrounds/${chosenBackgroundInfo.id}.json`
        setCharacter({ type: ACTION.UPDATE_BACKGROUND, payload: { name: chosenBackgroundInfo.name, url: chosenBackgroundUrl } });
        setDetails(chosenBackgroundInfo);

        // Erase background languages, NOT race languages
        //setCharacter({ type: ACTION.UPDATE_BACKGROUND, payload: { languages: raceLanguages } });
        setNumLanguageChoices(chosenBackgroundInfo['language-choices']);
    };

    // ===========================================================================================================================

    const pickLanguage = async (chosenLanguage, index, e) => {
        //const formatUrl = `/api/languages/${chosenLanguage.replace(/\s/g, '-').toLowerCase()}`;

        console.log(e.target.value)
        let indexToEdit = raceLanguages.length + parseInt(index)
        if(character.background.languages.length == indexToEdit){
            (character.background.languages).push({ name: chosenLanguage.name, origin: 'background', url: chosenLanguage.url })
        }
        else{
            character.background.languages[indexToEdit] = { name: chosenLanguage.name, origin: 'background', url: chosenLanguage.url }
        }
        setCharacter({
            type: ACTION.UPDATE_BACKGROUND,
            payload: {
                //languages: [...character.background.languages, { name: chosenLanguage, origin: 'background', url: formatUrl }],
                languages: [...character.background.languages]
            },
        });
        setDetails();
        try {
            //setDetails((await dndApi.getMoreInfo(formatUrl)).data);
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

    const numLanguageArray = () => {
        let arr = []
        for(let i = 0; i < numLanguageChoices; i++){
            arr.push(i)
        }
        return arr;
    }

    return (
        <>
            <form>
                {/* BACKGROUND====================================================================== */}
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

                    {/* appearance */}
                    <textarea
                        maxLength="255"
                        name="appearance"
                        style={{ resize: 'none', width: '100%' }}
                        rows="8"
                        defaultValue={character.background.appearance}
                        placeholder="Enter a description for your character's appearance."
                        onChange={(e) => setStat(e, 'appearance')}
                    ></textarea>

                    {/* personality */}
                    <textarea
                        maxLength="255"
                        name="personality"
                        style={{ resize: 'none', width: '100%' }}
                        rows="8"
                        defaultValue={character.background.personality}
                        placeholder="Enter a description for your character's personality."
                        onChange={(e) => setStat(e, 'personality')}
                    ></textarea>
                </section>
                {/* LANGUAGES=============================================================================== */}
                <section>
                    <h3>Select your Languages:</h3>
                    <p>Your current proficient languages determined by your race:</p>
                    {raceLanguages &&
                        raceLanguages.map((language, idx) => {
                            return language.origin === 'race' && <p key={idx}>{language.name}</p>;
                        })}

                    { numLanguageChoices !== 0 &&
                    <p>        
                        Pick {numLanguageChoices === 1 ? 'one bonus language' : numLanguageChoices === 2 ? 'two bonus languages' : ''} granted by your
                        <strong> {character.background.name} </strong>background.
                    </p>
                    }
                    { 
                        numLanguageArray().map((e, idx) => (
                            <React.Fragment key={idx}>
                                <select defaultValue={-1} name="languages" id={idx} onChange={(e) => pickLanguage(JSON.parse(e.target.value), e.target.id, e)} required>
                                    <option value={-1}> no assignment </option>
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
                {/* ALIGNMENT ==========================================================================================================*/}
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
