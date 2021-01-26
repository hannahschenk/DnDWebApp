import React from 'react';
import { useCharacter } from '../../../state/logic';
import * as ACTION from '../../../state/actions';

const SkillsForm = ({ skillProficiencies, field }) => {
    const { character, setCharacter } = useCharacter();
    /*
     * Signature: handleSkillChoice(e)
     * Input: e - the click event
     * Description: adds/ removes the skill from the character state
     */
    const handleSkillChoice = (e, skillObj) => {
        e.preventDefault();

        const skillName = e.target.name;
        const updatedSkills = Object.values(character.proficiencies[field]).filter((skill) => skill.name !== e.target.name);

        // Remove skill from character if button is clicked twice
        if (character.proficiencies[field].length > updatedSkills.length) {
            setCharacter({
                type: ACTION.UPDATE_PROFICIENCIES,
                payload: {
                    [field]: updatedSkills,
                },
            });
            e.target.style.backgroundColor = '';
        }
        // Otherwise add skill
        else {
            if (character.proficiencies[field].length == skillProficiencies.choose) return;
            setCharacter({
                type: ACTION.UPDATE_PROFICIENCIES,
                payload: {
                    [field]: [...character.proficiencies[field], { name: skillName, url: skillObj.url }],
                },
            });
            e.target.style.backgroundColor = 'red';
        }
    };

    return (
        <>
            <h3>
                Choose {skillProficiencies.choose}
                {field === 'skills' && ' Skill '}
                {field === 'items' && ' Item '}Proficiencies
            </h3>
            {
                //render buttons based on skill choices
                skillProficiencies.from.map((skill, idx) => {
                    const skillName = skill.name.match(/\b(?!Skill:\s\b)\w+.+/);
                    return (
                        <React.Fragment key={idx}>
                            <button onClick={(e) => handleSkillChoice(e, skill)} name={skillName} style={{ width: 200 }}>
                                {skillName}
                            </button>
                            <br />
                        </React.Fragment>
                    );
                })
            }
        </>
    );
};

export default SkillsForm;
