import React, { useState, useEffect } from 'react';

import constants from './../../utils/constants';

import { useCharacter } from '../../state/logic';
import * as ACTION from '../../state/actions';

const AbilityScoresForm = ({ formDetailsState }) => {
    const { character, setCharacter, setDetails } = useCharacter();

    const [abilityScoreChoices, setAbilityScoreChoices] = useState([]);

    //these shouldn't really be hard coded, it should be mapped from the global state ability score names:
    const [abilityScoreIdxMatch, setAbilityScoreIdxMatch] = useState({
        strength: -1,
        dexterity: -1,
        constitution: -1,
        intelligence: -1,
        wisdom: -1,
        charisma: -1,
    });

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

        if (scoreIdx != -1) {
            abilityScoreChoices[scoreIdx].used = true;
        }

        if (abilityScoreIdxMatch[abilityScoreName] != -1) {
            let idxNotUsed = abilityScoreIdxMatch[abilityScoreName];
            abilityScoreChoices[idxNotUsed].used = false;
        }

        setAbilityScoreChoices([...abilityScoreChoices]);
        setAbilityScoreIdxMatch({ ...abilityScoreIdxMatch, [abilityScoreName]: parseInt(scoreIdx) });

        setCharacter({ type: ACTION.UPDATE_ABILITIES, payload: { ...character.abilities, [abilityScoreName]: score } });
    };

    // useEffect(() => console.log(abilityScoreChoices));
    // useEffect(() => console.log(abilityScoreIdxMatch), [abilityScoreIdxMatch]);

    return (
        <>
            <p>{abilityScoreChoices.length == 0 ? 'Pick One:' : 'Distribute Ability Scores'}</p>
            {/* <button onClick={() => }>Clear Abilities</button> */}

            {abilityScoreChoices.length == 0 ? (
                <>
                    <button onClick={abilityScoreChoicesReducer('STANDARD_ARRAY')}>Use Standard Array</button>
                    <button onClick={abilityScoreChoicesReducer('RANDOM_ARRAY')}>Generate Random Scores</button>
                </>
            ) : (
                Object.entries(character.abilities).map(([ability, score]) => {
                    console.log(character.abilities[ability]);
                    return (
                        <React.Fragment key={ability}>
                            <label htmlFor={ability}>{ability}</label>
                            <select defaultValue={-1} name={ability} id={ability} onChange={assignScore}>
                                <option value={-1}> no assignment </option>
                                {abilityScoreChoices.map((scoreObj, scoreIdx) => (
                                    <option key={scoreIdx} value={scoreIdx} disabled={scoreObj.used}>
                                        {character.abilities[ability] && scoreObj.score}
                                        {/* NOTE THIS DOES NOT WORK TO DISPLAY THE DEFAULT VALUES */}
                                    </option>
                                ))}
                            </select>
                            <br />
                        </React.Fragment>
                    );
                })
            )}
        </>
    );
};

export default AbilityScoresForm;

/*TODO: this is dummy data; state should have initial scores filled out from race*/
// const abilityScoresState = [
//     {
//         name: 'strength',
//         score: 0,
//     },
//     {
//         name: 'dexterity',
//         score: 0,
//     },
//     {
//         name: 'constitution',
//         score: 2,
//     },
//     {
//         name: 'intelligence',
//         score: 0,
//     },
//     {
//         name: 'wisdom',
//         score: 1,
//     },
//     {
//         name: 'charisma',
//         score: 0,
//     },
// ];

/* end dummy data*/
