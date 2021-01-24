import React, { useState, useEffect } from 'react';

import dndApi from '../../utils/dnd5eApi';

import { useCharacter } from '../../state/logic';
import * as ACTION from '../../state/actions';

const ProficienciesForm = () => {
    const { character, setCharacter } = useCharacter();

    const [skillProficiencies, setSkillProficiencies] = useState([]);
    const [skillList, setSkillList] = useState([]);


    const [spellCasting, setSpellCasting] = useState(undefined);
    const [availableSpells, setAvailableSpells] = useState([]);
    const [spellList, setSpellList] = useState([]);

    const ApiToAppAbilityScoreMap = {
        "str": "strength",
        "dex": "dexterity",
        "con": "constitution",
        "int": "intelligence",
        "wis": "wisdom",
        "cha": "charisma"
    }
    useEffect(async () => {
        let mounted = true;

        if (mounted) {
            try {
                const classObj = (await dndApi.getClass(character.class.name)).data;

                // Grab the class's skills
                const skillProficiencies = classObj.proficiency_choices;
                setSkillProficiencies(skillProficiencies);

                // Set ifSpellcaster to the spellcasting object if a spellcasting class, or undefined if not (controls rendering of <SpellsForm /> component)
                const ifSpellcaster = classObj.spellcasting;
                setSpellCasting(ifSpellcaster);

                //adding on the saving throws:
                let savingThrowsStringArr =  classObj.saving_throws.map((obj) => ApiToAppAbilityScoreMap[obj.index])
                setCharacter({ type: ACTION.UPDATE_PROFICIENCIES, payload: { savingThrows: savingThrowsStringArr } });



                if (ifSpellcaster) {
                    // Assigns these two constants to a string array containing the spells for the class and all level 1 spells
                    const classSpells = (await dndApi.getClass(character.class.name + '/spells')).data.results.map((spell) => spell.name);
                    const levelOneSpells = (await dndApi.getMoreInfo('/api/spells?level=1')).data.results.map((spell) => spell.name);

                    // Grabs intersection of level spells 1 and class's spells and sets to the available spells the user can choose
                    const filteredSpells = classSpells.filter((spell) => levelOneSpells.includes(spell));
                    setAvailableSpells(filteredSpells);
                }

            } catch (err) {
                console.error(err);
            }
        }

        return () => {
            mounted = false;
        };
    }, []);

    return (
        <>
            {skillProficiencies.length !== 0 && <SkillsForm skillProficiencies={skillProficiencies} />}
            {/* Render spells form only if user's class is: 'bard', 'cleric', 'druid', 'paladin', 'ranger', 'sorcerer', 'warlock', 'wizard' */}
            {spellCasting && <SpellsForm availableSpells={availableSpells} />}
        </>
    );
};

const SkillsForm = ({ skillProficiencies }) => {
    const { character, setCharacter } = useCharacter();

    // console.log(skillProficiencies[0].from);

    const handleSkillChoice = (e) => {
        e.preventDefault();


        const skill = e.target.name;
        const skillUrl = '/api/skills/' + skill.replace(/\s/g, '-').toLowerCase();
        const updatedSkills = Object.values(character.proficiencies.skills).filter((skill) => skill.name !== e.target.name);

        // Remove spell from character if button is clicked twice
        if (character.proficiencies.skills.length > updatedSkills.length) {
            // console.log(updatedSkills);
            console.log('removed ' + skill);
            setCharacter({ type: ACTION.UPDATE_PROFICIENCIES, payload: { skills: updatedSkills } });
            e.target.style.backgroundColor = '';
        }
        // Otherwise add spell
        else {

            if(character.proficiencies.skills.length == skillProficiencies[0].choose) return;
            // console.log([...character.proficiencies.skills, { name: skill, url: skillUrl }]);
            console.log('added ' + skill);
            setCharacter({ type: ACTION.UPDATE_PROFICIENCIES, payload: { skills: [...character.proficiencies.skills, { name: skill, url: skillUrl }] } });
            e.target.style.backgroundColor = 'red';
        }
    };

    return (
        <>
            {skillProficiencies.map((proficiency, idx) => {
                return (
                    <React.Fragment key={idx}>
                        <h3>Choose {proficiency.choose} Skill Proficiencies</h3>
                        {proficiency.from.map((skill, idxx) => {
                            const skillName = skill.name.match(/\b(?!Skill:\s\b)\w+.+/);
                            // const selected = character.background.skills.includes(skill) ? 'red' : '';

                            return (
                                <React.Fragment key={idxx}>
                                    <button onClick={(e) => handleSkillChoice(e)} name={skillName} style={{ width: 200 }}>
                                        {skillName}
                                    </button>
                                    <br />
                                </React.Fragment>
                            );
                        })}
                    </React.Fragment>
                );
            })}
        </>
    );
};

const SpellsForm = ({ availableSpells }) => {
    const { character, setCharacter } = useCharacter();

    const handleSpellChoice = (e) => {
        e.preventDefault();
        const spell = e.target.name;
        const spellUrl = '/api/spells/' + spell.replace(/\s/g, '-').toLowerCase();

        const updatedSpells = Object.values(character.proficiencies.spells).filter((spell) => spell.name !== e.target.name);
        // console.log(character.proficiencies.spells.length, updatedSpells.length, character.proficiencies.spells.length > updatedSpells.length);

        // Remove spell from character if button is clicked twice
        if (character.proficiencies.spells.length > updatedSpells.length) {
            // console.log(updatedSpells);
            console.log('removed ' + spell);
            setCharacter({ type: ACTION.UPDATE_PROFICIENCIES, payload: { spells: updatedSpells } });
            e.target.style.backgroundColor = '';
        }
        // Otherwise add spell
        else {
            // console.log([...character.proficiencies.spells, { name: spell, url: spellUrl }]);
            console.log('added ' + spell);
            setCharacter({ type: ACTION.UPDATE_PROFICIENCIES, payload: { spells: [...character.proficiencies.spells, { name: spell, url: spellUrl }] } });
            e.target.style.backgroundColor = 'red';
        }
    };

    return (
        <>
            <h3>Select Spells</h3>
            {/* PLACE IN CHARACTER DETAILS FORM - HUNTER! */}

            {/* RENDER SPELLS HERE */}
            {availableSpells.map((spell, idx) => {
                // const selected = character.background.spells.includes(spell) ? 'red' : '';

                return (
                    <React.Fragment key={idx}>
                        <button name={spell} onClick={(e) => handleSpellChoice(e)} style={{ width: 200 }}>
                            {spell}
                        </button>
                        <br />
                    </React.Fragment>
                );
            })}
        </>
    );
};

export default ProficienciesForm;
