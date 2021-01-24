import React, { useState, useEffect } from 'react';

import constants from './../../utils/constants';
import dndApi from './../../utils/dnd5eApi';
import { useCharacter } from '../../state/logic';
import * as ACTION from '../../state/actions';
import axios from 'axios';

const AbilityScoresForm = ({ formDetailsState }) => {
    const { character, setCharacter, setDetails } = useCharacter();

    const [abilityScoreChoices, setAbilityScoreChoices] = useState([]);

    const ApiToAppAbilityScoreMap = {
        "str": "strength",
        "dex": "dexterity",
        "con": "constitution",
        "int": "intelligence",
        "wis": "wisdom",
        "cha": "charisma"
    }

    //these shouldn't really be hard coded, it should be mapped from the global state ability score names:
    const [abilityScoreIdxMatch, setAbilityScoreIdxMatch] = useState({
        strength: -1,
        dexterity: -1,
        constitution: -1,
        intelligence: -1,
        wisdom: -1,
        charisma: -1,
    });

    useEffect(async() => {
        //there are 
        try{
            let apiRaceEndpoints = character.race.url
            let abilityCopy = character.abilities;
            for(let i = 0; i < apiRaceEndpoints.length; i++){
                let raceObj = (await dndApi.getMoreInfo(apiRaceEndpoints[i])).data
                let abilityBonusArr = raceObj.ability_bonuses
                
                for(let a = 0; a < abilityBonusArr.length; a++){
                    let abilityScoreName = ApiToAppAbilityScoreMap[abilityBonusArr[a].ability_score.index]
                    console.log(character.abilities)
                    abilityCopy[abilityScoreName] = abilityBonusArr[a].bonus
                }
                setCharacter({ type: ACTION.UPDATE_ABILITIES, payload: {...abilityCopy} });
            }
        }
        catch (e){
            console.log(e) 
        }
    }, [])

    const abilityScoreChoicesReducer = (actionType) => {
        switch (actionType) {
            case 'STANDARD_ARRAY':
                setAbilityScoreChoices(
                    constants.STANDARD_ARRAY.map((score) => {
                        return { score, used: false };
                    })
                );
                break;
            case 'RANDOM_ARRAY':
                let scoresArr = [];
                for (let i = 0; i < 6; i++) {
                    scoresArr.push(Math.floor(Math.random() * 16) + 3);
                }
                setAbilityScoreChoices(
                    scoresArr.map((score) => {
                        return { score, used: false };
                    })
                );
                break;
        }
    };

    const assignScore = (e) => {
        let abilityScoreName = e.target.id;
        let scoreIdx = e.target.value;

        const score = abilityScoreChoices[scoreIdx] ? abilityScoreChoices[scoreIdx].score : 0;
        let newScore = character.abilities[abilityScoreName] + score

        if (scoreIdx != -1) {
            abilityScoreChoices[scoreIdx].used = true;
        }

        if (abilityScoreIdxMatch[abilityScoreName] != -1) {
            let idxNotUsed = abilityScoreIdxMatch[abilityScoreName];
            abilityScoreChoices[idxNotUsed].used = false;
            newScore = newScore - abilityScoreChoices[idxNotUsed].score
        }

        setAbilityScoreChoices([...abilityScoreChoices]);
        setAbilityScoreIdxMatch({ ...abilityScoreIdxMatch, [abilityScoreName]: parseInt(scoreIdx) });

        setCharacter({ type: ACTION.UPDATE_ABILITIES, payload: { ...character.abilities, [abilityScoreName]: newScore } });
    };


    return (
        <>
            <p>{abilityScoreChoices.length == 0 ? 'Pick One:' : 'Distribute Ability Scores'}</p>
            {/* <button onClick={() => }>Clear Abilities</button> */}

            {abilityScoreChoices.length == 0 ? (
                <>
                    <button onClick={() => abilityScoreChoicesReducer('STANDARD_ARRAY')}>Use Standard Array</button>
                    <button onClick={() => abilityScoreChoicesReducer('RANDOM_ARRAY')}>Generate Random Scores</button>
                </>
            ) : (
                Object.entries(character.abilities).map(([ability, score]) => {
                    return (
                        <React.Fragment key={ability}>
                            <label htmlFor={ability}>{ability}</label>
                            <select defaultValue={-1} name={ability} id={ability} onChange={assignScore}>
                                <option value={-1}> no assignment </option>
                                {abilityScoreChoices.map((scoreObj, scoreIdx) => (
                                    <option key={scoreIdx} value={scoreIdx} disabled={scoreObj.used}>
                                        {scoreObj.score}
                                    </option>
                                ))}
                            </select>
                            <p>current score: {character.abilities[ability]}</p>

                            <br />
                        </React.Fragment>
                    );
                })
            )}
        </>
    );
};

export default AbilityScoresForm;

