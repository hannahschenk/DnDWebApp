<<<<<<< HEAD
import React, {useState, useEffect} from 'react';
import constants from "./../../utils/constants";

const AbilityScoresForm = ({formDetailsState}) => {

    /*TODO: this is dummy data; state should have initial scores filled out from race*/
    const abilityScoresState = [
        {
            name: "strength",
            score: 0
        }, 
        {
            name: "dexterity",
            score: 0
        }, 
        {
            name: "constitution",
            score: 2
        },  
        {
            name: "intelligence",
            score: 0
        },  
        {
            name: "wisdom",
            score: 1
        },  
        {
            name: "charisma",
            score: 0
        }
    ];

    /* end dummy data*/

    /*NOTE: These are all local states: change if needed*/
    const [abilityScoreChoices, setAbilityScoreChoices]  = useState([]);

    //these shouldn't really be hard coded, it should be mapped from the global state ability score names:
    const [abilityScoreIdxMatch, setAbilityScoreIdxMatch] = useState(
        {
            "strength": -1,
            "dexterity": -1,
            "constitution": -1,
            "intelligence":  -1,
            "wisdom": -1,
            "charisma": -1
        }
    );

    const abilityScoreChoicesReducer = (actionType) => {
        switch(actionType){
            case "STANDARD_ARRAY": 
                setAbilityScoreChoices(
                    constants.STANDARD_ARRAY.map((score) => { 
                        return {score, "used": false} 
                    })
                );
                break;
            case "RANDOM_ARRAY": 
                let scoresArr = []
                for(let i = 0; i < 6; i++){
                    scoresArr.push(Math.floor(Math.random() * 16) + 3);
                }
                setAbilityScoreChoices(
                    scoresArr.map((score) => { 
                        return {score, "used": false} 
                    })
                );
                break;
        }
    }
    /*END NOTE*/


=======
import React, { useState, useEffect } from 'react';
import constants from './../../utils/constants';
import dndApi from './../../utils/dnd5eApi';
import { useCharacter } from '../../state/logic';
import * as ACTION from '../../state/actions';
import axios from 'axios';

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

    /*
    * Signature: useEffect(func, [])
    * Description: populates initial character state ability scores 
    *               based on the user's chosen race
    */
    useEffect(async() => {
        let mounted = true;
        if (mounted) {
            try{
                let apiRaceEndpoints = character.race.url
                for(let i = 0; i < apiRaceEndpoints.length; i++){
                    let raceObj = (await dndApi.getMoreInfo(apiRaceEndpoints[i])).data
                    
                    let abilityBonusArr = raceObj.ability_bonuses
                    for(let a = 0; a < abilityBonusArr.length; a++){
                        let abilityScoreKey = constants.ABILITY_KEY_MAP[abilityBonusArr[a].ability_score.index]
                        character.abilities[abilityScoreKey] = abilityBonusArr[a].bonus
                    }
                    setCharacter({ type: ACTION.UPDATE_ABILITIES, payload: {...character.abilities} });
                }
            } catch (e){
                console.error(e) 
            }
        }
        return () => {
            mounted = false;
        };
    }, [])

    /*
    * Signature: generateAbilityScoreChoices(choiceType)
    * input: choiceType - determines if choices are determined by 
    *                      randomization or the standard array
    * Description: populates ability score choices based on 
    *               user preference of choice generation
    */
    const generateAbilityScoreChoices = (choiceType) => {
        let scoresArr = []
        if (choiceType == 'STANDARD_ARRAY'){
            scoresArr = constants.STANDARD_ARRAY
        }
        else if (choiceType == 'RANDOM_ARRAY'){
            scoresArr = [];
            for (let i = 0; i < 6; i++) {
                scoresArr.push(Math.floor(Math.random() * 16) + 3);
            }
        }
        setAbilityScoreChoices(
            scoresArr.map((score) => {
                return { 
                    score, 
                    used: false 
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
>>>>>>> 81149a80e997d95cfb5b910ad72ddd9ffce54b23
    const assignScore = (e) => {
        let abilityScoreName = e.target.id;
        let scoreIdx = e.target.value;

<<<<<<< HEAD
        if(scoreIdx != -1){
            abilityScoreChoices[scoreIdx].used = true;
        }

        if(abilityScoreIdxMatch[abilityScoreName] != -1){
            let idxNotUsed = abilityScoreIdxMatch[abilityScoreName]
            abilityScoreChoices[idxNotUsed].used = false;
        } 

        setAbilityScoreChoices([...abilityScoreChoices]);

        setAbilityScoreIdxMatch({...abilityScoreIdxMatch, [abilityScoreName]: parseInt(scoreIdx)});

        /*TODO: we can change the global state here, all we need is to get initial score + 
            abilityScoreChoices[abilityScoreIdxAssignment[abilityScoreName]]*/
    }


    useEffect(() => console.log(abilityScoreChoices))
    useEffect(() => console.log(abilityScoreIdxMatch), [abilityScoreIdxMatch])
    
    return (
        <>
            <p>{(abilityScoreChoices.length == 0)? "Pick One:" : "Distribute Ability Scores"}</p>
            {
                (abilityScoreChoices.length == 0) ?
                    <>
                        <button onClick={abilityScoreChoicesReducer("STANDARD_ARRAY")}>
                            Use Standard Array
                        </button>
                        <button onClick={abilityScoreChoicesReducer("RANDOM_ARRAY")}>
                            Generate Random Scores
                        </button>
                    </>:

                    abilityScoresState.map((abilityScore) => 
                        <React.Fragment key={abilityScore.name}>
                        <label htmlFor={abilityScore.name}>{abilityScore.name}</label>
                        <select 
                            defaultValue={-1}
                            name={abilityScore.name} 
                            id={abilityScore.name} 
                            onChange={assignScore}
                        >
                            <option value={-1}> no assignment </option>
                            {
                                abilityScoreChoices.map((scoreObj, scoreIdx) => 
                                    <option key={scoreIdx} value={scoreIdx} disabled={scoreObj.used}>
                                        {scoreObj.score}
                                    </option>
                                )
                            }   
                        </select>
                        </React.Fragment>
                    )
                    
=======
        const scoreToAdd = abilityScoreChoices[scoreIdx] ? abilityScoreChoices[scoreIdx].score : 0;
        let newScore = character.abilities[abilityScoreName] + scoreToAdd

        if (scoreIdx != -1) {
            abilityScoreChoices[scoreIdx].used = true;
        }
        // if a choice is being replaced, make the use property false and subtract the score from the total
        if (abilityScoreIdxMatch[abilityScoreName] != -1) {
            let idxNotUsed = abilityScoreIdxMatch[abilityScoreName];
            abilityScoreChoices[idxNotUsed].used = false;
            newScore = newScore - abilityScoreChoices[idxNotUsed].score
        }

        setAbilityScoreChoices([...abilityScoreChoices]);
        setAbilityScoreIdxMatch({ ...abilityScoreIdxMatch, [abilityScoreName]: parseInt(scoreIdx) });

        setCharacter({ 
            type: ACTION.UPDATE_ABILITIES, 
            payload: {
                 ...character.abilities, 
                 [abilityScoreName]: newScore 
            } 
        });
    };


    return (
        <>
            <p>
                {abilityScoreChoices.length == 0 ? 'Pick a method to generate ability score choices:' : 'Distribute Ability Scores'}
            </p>

            {
                abilityScoreChoices.length == 0 ? //if block
                    <>
                        <button onClick={() => generateAbilityScoreChoices('STANDARD_ARRAY')}>Use Standard Array</button>
                        <button onClick={() => generateAbilityScoreChoices('RANDOM_ARRAY')}>Generate Random Scores</button>
                    </>
                : //else block
                    Object.entries(character.abilities).map(([abilityName, score]) => {
                        return (
                            <React.Fragment key={abilityName}>
                                <label htmlFor={abilityName}>{abilityName}</label>
                                <select defaultValue={-1} name={abilityName} id={abilityName} onChange={assignScore}>
                                    <option value={-1}> no assignment </option>
                                    {
                                        abilityScoreChoices.map((scoreObj, scoreIdx) => (
                                            <option key={scoreIdx} value={scoreIdx} disabled={scoreObj.used}>
                                                {scoreObj.score}
                                            </option>
                                        ))
                                    }
                                </select>
                                <p>current score: {character.abilities[abilityName]}</p>

                                <br />
                            </React.Fragment>
                        );
                    })
>>>>>>> 81149a80e997d95cfb5b910ad72ddd9ffce54b23
            }
        </>
    );
};

export default AbilityScoresForm;
<<<<<<< HEAD
=======

>>>>>>> 81149a80e997d95cfb5b910ad72ddd9ffce54b23
