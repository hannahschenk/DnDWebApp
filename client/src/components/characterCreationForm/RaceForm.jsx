import React, { useState, useEffect, useContext } from 'react';

import dndApi from './../../utils/dnd5eApi';

import FormControlContext from './../../state/formControlManager';

import { useCharacter } from '../../state/logic';
import * as ACTION from '../../state/actions';

const RaceForm = () => {
    const [raceChoices, setRaceChoices] = useState([]);
    const [subRaceChoices, setSubRaceChoices] = useState([]);
    const { formControlState, setFormControlState } = useContext(FormControlContext);
    const { character, setCharacter, setDetails } = useCharacter();

    /*
     * Signature: useEffect(func, [])
     * Description: Fetches all possible race choices from dnd5e api
     *               each race choice is an object with the format
     *               {index, name, url}
     */
    useEffect(async () => {
        // Reset details component
        setDetails({});

        let mounted = true;
        if (mounted) {
            try {
                setRaceChoices((await dndApi.getRaces()).data.results);
                if (character.race.name !== '') {
                    // a race is already picked
                    const raceInfo = (await dndApi.getMoreInfo(character.race.raceUrl)).data;
                    setSubRaceChoices(raceInfo.subraces);
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
     * Signature: useEffect(func, [character, subRaceChoices])
     * Description: watch for character changes and subRaceChoices state to
     *               determine if the user can move on to the next section
     *               via the formControlState
     */
    useEffect(() => {
        let isSubRaceFilled = (subRaceChoices.length != 0 && character.race.subrace != '') || (subRaceChoices.length == 0 && character.race.subrace == '');
        if (character.race.name != '' && isSubRaceFilled) {
            setFormControlState({ ...formControlState, currentFormDone: true });
        } else {
            setFormControlState({ ...formControlState, currentFormDone: false });
        }
    }, [character, subRaceChoices]);

    /*
     * Signature: pickRace(chosenRace)
     * Input: chosenRace - the race object ({name, index, url}) the user chooses
     * Description: Sets the character state property race to reflect the user's
     *               chosen race; it also populates the subrace states if any exists
     */
    const pickRace = async (chosenRace) => {
        try {
            const raceInfo = (await dndApi.getMoreInfo(chosenRace.url)).data;
            setSubRaceChoices(raceInfo.subraces);

            setDetails(raceInfo);

            // Clear race and subrace before selecting a new race
            if (chosenRace.name != character.race.name) {
                setCharacter({ type: ACTION.CLEAR_RACE });
                setCharacter({
                    type: ACTION.UPDATE_RACE,
                    payload: {
                        name: chosenRace.name,
                        raceUrl: chosenRace.url,
                        size: raceInfo.size,
                        speed: raceInfo.speed,
                    },
                });
            }
            

            setDetails(raceInfo);
        } catch (err) {
            console.error(err);
        }
    };

    /*
     * Signature: pickSubRace(chosenSubRace)
     * Input: chosenSubRace - the subrace object ({name, index, url}) the user chooses
     * Description: Sets the character state subrace to reflect the user's
     *               chosen subrace
     */
    const pickSubRace = async (chosenSubRace) => {

        if (chosenSubRace.name != character.race.subrace) {
            setCharacter({
                type: ACTION.UPDATE_RACE,
                payload: {
                    subrace: chosenSubRace.name,
                    subraceUrl: chosenSubRace.url,
                },
            });
        }

        const chosenSubRaceInfo = (await dndApi.getMoreInfo(chosenSubRace.url)).data;
        setDetails(chosenSubRaceInfo);
    };

    return (
        <main>
            <section>
                <p>Pick a Race: </p>
                {
                    //render radio options for races
                    raceChoices.map((raceObj, idx) => (
                        <React.Fragment key={idx}>
                            <input
                                type="radio"
                                name="race"
                                id={raceObj.name}
                                defaultChecked={raceObj.name == character.race.name}
                                value={JSON.stringify(raceObj)}
                                onClick={() => pickRace(raceObj)}
                            />
                            <label htmlFor={raceObj.name}>
                                {'  '}
                                {raceObj.name}
                            </label>
                            <br />
                        </React.Fragment>
                    ))
                }
                <hr />
            </section>
            <section>
                <p>Pick a SubRace: </p>
                {
                    //render radio options for subraces if they exist
                    subRaceChoices.length > 0 ? ( //if block:
                        subRaceChoices.map((subRaceObj, idx) => (
                            <React.Fragment key={idx}>
                                <input
                                    type="radio"
                                    name="subrace"
                                    id={subRaceObj.name}
                                    defaultChecked={subRaceObj.name == character.race.subrace}
                                    value={JSON.stringify(subRaceObj)}
                                    onClick={() => pickSubRace(subRaceObj)}
                                />
                                <label htmlFor={subRaceObj.name}>
                                    {'  '}
                                    {subRaceObj.name}
                                </label>

                                <br />
                            </React.Fragment>
                        ))
                    ) : (
                        //else block:
                        <p> No Subraces</p>
                    )
                }
            </section>
        </main>
    );
};

export default RaceForm;
