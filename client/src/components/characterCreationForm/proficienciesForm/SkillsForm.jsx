import React, { useState, useEffect } from 'react';
import { useCharacter } from './../../../state/logic';
import * as ACTION from './../../../state/actions';
import dndApi from '../../../utils/dnd5eApi';

const SkillsForm = ({ skillProficiencies }) => {
    const { character, setCharacter, details, setDetails } = useCharacter();

   
    /*
    * Signature: handleSkillChoice(e)
    * Input: e - the click event
    * Description: adds/ removes the skill from the character state
    */
    const handleSkillChoice = async (e) => {
        e.preventDefault();

        const skill = e.target.name;
        const skillUrl = '/api/skills/' + skill.replace(/\s/g, '-').toLowerCase();
        const updatedSkills = Object.values(character.proficiencies.skills).filter((skill) => skill.name !== e.target.name);

        // Remove spell from character if button is clicked twice
        if (character.proficiencies.skills.length > updatedSkills.length) {
            setCharacter({ type: ACTION.UPDATE_PROFICIENCIES, 
                payload: { 
                    skills: updatedSkills 
                } 
            });
            e.target.style.backgroundColor = '';
        }
        // Otherwise add spell
        else {
            if(character.proficiencies.skills.length == skillProficiencies[0].choose) return;
            setCharacter({ 
                type: ACTION.UPDATE_PROFICIENCIES, 
                payload: { 
                    skills: [...character.proficiencies.skills, { name: skill, url: skillUrl }] 
                } 
            });
            e.target.style.backgroundColor = 'red';
            try{
                let skillInfo = (await dndApi.getMoreInfo(skillUrl)).data;
                setDetails(skillInfo)
            } catch (err) {
                console.error(err)
            }
        }
    };

    return (
        <>
            {skillProficiencies.map((proficiency, idx) => {
                return (
                    <React.Fragment key={idx}>
                        <h3>Choose {proficiency.choose} Skill Proficiencies</h3>
                        { //render buttons based on skill choices
                            proficiency.from.map((skill, idxx) => {
                                const skillName = skill.name.match(/\b(?!Skill:\s\b)\w+.+/);
                                return (
                                    <React.Fragment key={idxx}>
                                        <button onClick={(e) => handleSkillChoice(e)} name={skillName} style={{ width: 200 }}>
                                            {skillName}
                                        </button>
                                        <br />
                                    </React.Fragment>
                                );
                            })
                        }
                    </React.Fragment>
                );
            })}
        </>
    );
};


export default SkillsForm;