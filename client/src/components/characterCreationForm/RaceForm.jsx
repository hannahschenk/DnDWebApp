import React, { useState, useEffect } from 'react';

import dndApi from './../../utils/dnd5eApi';

import { useCharacter } from '../../state/logic';
import * as ACTION from '../../state/actions';

const RaceForm = () => {
    const { character, setCharacter, setDetails } = useCharacter();

    const [raceChoices, setRaceChoices] = useState([]);
    const [subRaceChoices, setSubRaceChoices] = useState([]);

    useEffect(async () => {
        let mounted = true;

        if (mounted) {
            try {
                setRaceChoices((await dndApi.getRaces()).data.results);

                if (character.race.name !== '') {
                    const raceInfo = (await dndApi.getMoreInfo(character.race.url[0])).data;
                    setSubRaceChoices(raceInfo.subraces);

                    if (character.race.subrace !== '') {
                        // Simulate a click to check the subrace box if the user selected a subrace
                        document.getElementById(character.race.subrace.toLowerCase()).click();
                    } else {
                        setDetails(raceInfo);
                    }
                }
            } catch (err) {
                console.error(err);
            }
        }
        return () => {
            mounted = false;
        };
    }, []);

    const pickRace = async (chosenRaceInfo) => {
        try {
            const getRaceInfo = await dndApi.getMoreInfo(chosenRaceInfo.url);
            getRaceInfo && setSubRaceChoices(getRaceInfo.data.subraces);

            // Formats the info to store in state: an array of objects like this
            // languages: [
            //     {
            //       name: "",
            //       origin: "", // Either 'race' or 'background'
            //       url: ""
            //     }
            //   ],
            const getRaceLanguages =
                getRaceInfo &&
                getRaceInfo.data.languages.map((language) => {
                    return { name: language.name, origin: 'race', url: language.url };
                });

            setCharacter({ type: ACTION.CLEAR_RACE }); // Clear race and subrace before selecting a new race
            setCharacter({
                type: ACTION.UPDATE_RACE,
                payload: { name: chosenRaceInfo.index, url: [chosenRaceInfo.url], size: getRaceInfo.data.size, speed: getRaceInfo.data.speed },
            });

            setCharacter({ type: ACTION.CLEAR_BACKGROUND }); // Clear all background state before adding languages?

            getRaceInfo && setCharacter({ type: ACTION.UPDATE_BACKGROUND, payload: { languages: [...getRaceLanguages] } });

            setDetails(chosenRaceInfo);
        } catch (err) {
            console.error(err);
        }
    };

    const pickSubRace = (chosenSubRaceInfo) => {
        setCharacter({ type: ACTION.UPDATE_RACE, payload: { subrace: chosenSubRaceInfo.index, url: [...character.race.url, chosenSubRaceInfo.url] } });

        setDetails(chosenSubRaceInfo); // Update details with info contained in object
    };

    //note: having a form here is kind of useless but for the sake of being semantic
    return (
        <>
            <form>
                <p>Pick a Race: </p>
                {raceChoices.map((raceContent) => (
                    <React.Fragment key={`${raceContent.index}`}>
                        <label htmlFor="race">{raceContent.name}</label>
                        <input
                            type="radio"
                            name="race"
                            id={raceContent.index}
                            defaultChecked={character.race.name === raceContent.index}
                            value={raceContent.index}
                            onClick={() => pickRace(raceContent)}
                        />
                        <br />
                    </React.Fragment>
                ))}
            </form>
            <hr />
            <form>
                <p>Pick a SubRace: </p>
                {subRaceChoices.length > 0 ? (
                    subRaceChoices.map((subRaceContent) => (
                        <React.Fragment key={`${subRaceContent.index}`}>
                            <label htmlFor="subrace">{subRaceContent.name}</label>
                            <input
                                type="radio"
                                name="subrace"
                                id={subRaceContent.index}
                                defaultChecked={character.race.name === subRaceContent.index}
                                value={subRaceContent.index}
                                onClick={() => pickSubRace(subRaceContent)}
                            />
                            <br />
                        </React.Fragment>
                    ))
                ) : (
                    <p> No Subraces</p>
                )}
            </form>
        </>
    );
};

export default RaceForm;
