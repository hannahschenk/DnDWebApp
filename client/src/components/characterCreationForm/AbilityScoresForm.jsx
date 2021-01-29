import React, { useState, useEffect, useContext } from 'react';

import constants from './../../utils/constants';
import dndApi from './../../utils/dnd5eApi';

import { useCharacter } from '../../state/logic';
import * as ACTION from '../../state/actions';

import axios from 'axios';

import FormControlContext from './../../state/formControlManager';

const AbilityScoresForm = ({ formDetailsState }) => {
    const { character, setCharacter, setDetails } = useCharacter();
    const [abilityScoreChoices, setAbilityScoreChoices] = useState([]);
    const [abilityScoreIdxMatch, setAbilityScoreIdxMatch] = useState({
        strength: -1,
        dexterity: -1,
        constitution: -1,
        intelligence: -1,
        wisdom: -1,
        charisma: -1,
    });

    const [forceRemount, setForceRemount] = useState(false);
    const { formControlState, setFormControlState } = useContext(FormControlContext);

    /*
     * Signature: useEffect(func, [])
     * Description: populates initial character state ability scores
     *               based on the user's chosen race
     */
    useEffect(async () => {
        // Reset details component
        setDetails({});

        let mounted = true;
        if (mounted) {
            try {
                if (Object.values(character.abilities).includes(0)) {
                    // Reinitialize based on race
                    let apiRaceEndpoints = [character.race.raceUrl];
                    if (character.race.subraceUrl !== '') apiRaceEndpoints.push(character.race.subraceUrl);

                    for (let i = 0; i < apiRaceEndpoints.length; i++) {
                        let raceObj = (await dndApi.getMoreInfo(apiRaceEndpoints[i])).data;

                        let abilityBonusArr = raceObj.ability_bonuses;
                        for (let a = 0; a < abilityBonusArr.length; a++) {
                            let abilityScoreKey = constants.ABILITY_KEY_MAP[abilityBonusArr[a].ability_score.index];
                            character.abilities[abilityScoreKey] = abilityBonusArr[a].bonus;
                        }
                        setCharacter({ type: ACTION.UPDATE_ABILITIES, payload: { ...character.abilities } });
                    }
                }
            } catch (e) {
                console.error(e);
            }
        }
        return () => {
            mounted = false;
        };
    }, [forceRemount]);

    /*
     * Signature: useEffect(func, [character,  abilityScoreIdxMatch, abilityScoreChoices])
     * Description: watch for character changes on abilities, and state changes on
     *              abilityScoreIdxMatch and abilityScoreChoices to determine if the
     *              user can move on to the next section via the formControlState
     */
    useEffect(() => {
        let abilitiesFilled = !scoresAreInitial();
        let choicesConsumed = !Object.values(abilityScoreIdxMatch).includes(-1) || abilityScoreChoices.length == 0;
        if (abilitiesFilled && choicesConsumed) {
            setFormControlState({ ...formControlState, currentFormDone: true });
        } else {
            setFormControlState({ ...formControlState, currentFormDone: false });
        }
    }, [character, abilityScoreIdxMatch, abilityScoreChoices]);

    /*
     * Signature: generateAbilityScoreChoices(choiceType)
     * input: choiceType - determines if choices are determined by
     *                      randomization or the standard array
     * Description: populates ability score choices based on
     *               user preference of choice generation
     */
    const generateAbilityScoreChoices = (choiceType) => {
        let scoresArr = [];
        if (choiceType == 'STANDARD_ARRAY') {
            scoresArr = constants.STANDARD_ARRAY;
        } else if (choiceType == 'RANDOM_ARRAY') {
            scoresArr = [];
            for (let i = 0; i < 6; i++) {
                scoresArr.push(Math.floor(Math.random() * 16) + 3);
            }
        }
        setAbilityScoreChoices(
            scoresArr.map((score) => {
                return {
                    score,
                    used: false,
                };
            })
        );
    };

    /*
     * Signature: assignScore(e)
     * Input: e - this is the event that triggered the change in the select element
     * Description: match the index of the score choice object ({score, used}) from
     *           abilityScoreChoices by setting the value of abilityScoreIdxMatch to the index
     *           of the score choice object being used; if no score is being used, make the
     *           abilityScoreIdxMatch equal to -1
     */
    const assignScore = (e) => {
        let abilityScoreName = e.target.id;
        let scoreIdx = e.target.value;

        const scoreToAdd = abilityScoreChoices[scoreIdx] ? abilityScoreChoices[scoreIdx].score : 0;
        let newScore = character.abilities[abilityScoreName] + scoreToAdd;

        if (scoreIdx != -1) {
            abilityScoreChoices[scoreIdx].used = true;
        }
        // if a choice is being replaced, make the use property false and subtract the score from the total
        if (abilityScoreIdxMatch[abilityScoreName] != -1) {
            let idxNotUsed = abilityScoreIdxMatch[abilityScoreName];
            abilityScoreChoices[idxNotUsed].used = false;
            newScore = newScore - abilityScoreChoices[idxNotUsed].score;
        }

        setAbilityScoreChoices([...abilityScoreChoices]);
        setAbilityScoreIdxMatch({ ...abilityScoreIdxMatch, [abilityScoreName]: parseInt(scoreIdx) });

        setCharacter({
            type: ACTION.UPDATE_ABILITIES,
            payload: {
                ...character.abilities,
                [abilityScoreName]: newScore,
            },
        });
    };

    /*
     * Signature: resetComponent()
     * Description: this will chnage the value of forceRemount state
     *               after clearing out the ability scores in order
     *               to get new choices
     */
    const resetComponent = () => {
        setAbilityScoreIdxMatch({
            strength: -1,
            dexterity: -1,
            constitution: -1,
            intelligence: -1,
            wisdom: -1,
            charisma: -1,
        });
        setAbilityScoreChoices([]);
        setCharacter({ type: ACTION.CLEAR_ABILITIES });
        setForceRemount(!forceRemount);
    };

    /*
     * Signature: scoresAreInitial()
     * Description: this will check if the choices were distributed;
     *               if not all are distributed, this will return true
     *               else false
     */
    const scoresAreInitial = () => {
        let scores = Object.values(character.abilities);
        for (let i = 0; i < scores.length; i++) {
            if (scores[i] < 3) {
                // if distributed, no scores < 3
                return true;
            }
        }
        return false;
    };

    return (
        <>
            <p>{abilityScoreChoices.length == 0 ? 'Pick a method to generate ability score choices:' : 'Distribute Ability Scores'}</p>

            {!scoresAreInitial() && (!Object.values(abilityScoreIdxMatch).includes(-1) || abilityScoreChoices.length == 0) ? (
                <>
                    <button onClick={resetComponent}>Reset Scores</button>
                    {Object.entries(character.abilities).map(([abilityName, score]) => (
                        <p key={abilityName}>
                            current score for {abilityName}: {character.abilities[abilityName]}
                        </p>
                    ))}
                </>
            ) : abilityScoreChoices.length == 0 ? ( //if block
                <>
                    <button onClick={() => generateAbilityScoreChoices('STANDARD_ARRAY')}>Use Standard Array</button>
                    <button onClick={() => generateAbilityScoreChoices('RANDOM_ARRAY')}>Generate Random Scores</button>
                </>
            ) : (
                Object.entries(character.abilities).map(([abilityName, score]) => {
                    return (
                        <React.Fragment key={abilityName}>
                            <label htmlFor={abilityName}>{abilityName}</label>
                            <select defaultValue={-1} name={abilityName} id={abilityName} onChange={assignScore}>
                                <option value={-1}> no assignment </option>
                                {abilityScoreChoices.map((scoreObj, scoreIdx) => (
                                    <option key={scoreIdx} value={scoreIdx} disabled={scoreObj.used}>
                                        {scoreObj.score}
                                    </option>
                                ))}
                            </select>
                            <p>current score: {character.abilities[abilityName]}</p>

                            <br />
                        </React.Fragment>
                    );
                })
            )}
        </>
    );
};

export default AbilityScoresForm;
