import React, { useState, useEffect } from 'react';

import dndApi from './../../utils/dnd5eApi';

import { useCharacter } from '../../state/logic';
import * as ACTION from '../../state/actions';

const RaceForm = () => {
    const { character, setCharacter, setDetails } = useCharacter();

    const [raceChoices, setRaceChoices] = useState([]);
    const [subRaceChoices, setSubRaceChoices] = useState([]);

    useEffect(async () => {
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
            console.log(err);
        }
    }, []);

    const pickRace = (chosenRaceInfo) => {
        dndApi
            .getMoreInfo(chosenRaceInfo.url)
            .then((res) => {
                setSubRaceChoices(res.data.subraces);
                setDetails(chosenRaceInfo);
            })
            .catch((err) => console.log(err));

        setCharacter({ type: ACTION.CLEAR_RACE }); // Clear race and subrace before selecting a new race
        setCharacter({ type: ACTION.UPDATE_RACE, payload: { name: chosenRaceInfo.index, url: [chosenRaceInfo.url] } });

        setDetails(chosenRaceInfo);
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
