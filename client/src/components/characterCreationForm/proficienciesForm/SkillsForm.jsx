import React, { useEffect } from 'react';

import { useCharacter } from './../../../state/logic';
import * as ACTION from './../../../state/actions';
import CONSTANTS from '../../../utils/constants';

const SkillsForm = ({ skillProficiencies, skillsFormDoneState, field }) => {
    const { character, setCharacter } = useCharacter();
    const { skillsFormDone, setSkillsFormDone } = skillsFormDoneState;

    /*
     * Signature: handleSkillChoice(e)
     * Input: e - the click event
     * Description: adds/ removes the skill from the character state
     */
    const handleSkillChoice = async (e, skillObj) => {
        e.preventDefault();

        const skillName = e.target.name;
        const abilityName = CONSTANTS.SKILLS[skillName];
        const updatedSkills = Object.values(character.proficiencies[field]).filter((skill) => skill.name !== e.target.name);

        // Remove skill from character if button is clicked twice
        if (character.proficiencies[field].length > updatedSkills.length) {
            setCharacter({
                type: ACTION.UPDATE_PROFICIENCIES,
                payload: {
                    [field]: updatedSkills,
                },
            });
            e.target.style.color = '';
        }
        // Otherwise add skill
        else {
            if (character.proficiencies[field].length == skillProficiencies.choose) return;
            setCharacter({
                type: ACTION.UPDATE_PROFICIENCIES,
                payload: {
                    [field]: [...character.proficiencies[field], { name: skillName, ability: abilityName, origin: 'selected', url: skillObj.url }],
                },
            });
            e.target.style.color = '#dc2626';
        }
    };

    // UPDATE FORM CONTROL TO ALLOW TO GO TO NEXT SECTION
    useEffect(() => {
        // let totalSkillChoices = skillProficiencies.map((content) => content.choose).reduce((accum, currVal) => accum + currVal);
        if (character.proficiencies[field].length == skillProficiencies.choose) {
            setSkillsFormDone(true);
        } else {
            setSkillsFormDone(false);
        }
    }, [character]);

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
                    const selected = character.proficiencies.skills.map((skillObj) => skillObj.name).includes(skillName[0]);
                    return (
                        <React.Fragment key={idx}>
                            <button
                                onClick={(e) => handleSkillChoice(e, skill)}
                                name={skillName}
                                style={{
                                    width: 200,
                                    color: selected ? '#dc2626' : '',
                                }}
                            >
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
