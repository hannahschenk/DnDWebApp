import React, { useState, useEffect } from 'react';

import dndApi from "./../../../utils/dnd5eApi";
import SkillsForm from "./SkillsForm"
import SpellsForm from "./SpellsForm"
import { useCharacter } from './../../../state/logic';
import * as ACTION from './../../../state/actions';
import constants from '../../../utils/constants';

const ProficienciesForm = () => {
    const { character, setCharacter } = useCharacter();

    const [skillProficiencies, setSkillProficiencies] = useState([]);

    const [spellCasting, setSpellCasting] = useState(undefined);
    const [availableSpells, setAvailableSpells] = useState([]);

    /*
    * Signature: useEffect(func, [])
    * Description: sets all the skill choices and all the 
    *               spells that the user can have 
    */
    useEffect(async () => {
        let mounted = true;
        if (mounted) {
            try {
                console.log(character.class.url)
                const classObj = (await dndApi.getMoreInfo(character.class.url)).data;

                // Grab the class's skills
                const skillProficiencies = classObj.proficiency_choices;
                setSkillProficiencies(skillProficiencies);

                // Set ifSpellcaster to the spellcasting object if a spellcasting class, or undefined if not (controls rendering of <SpellsForm /> component)
                const isSpellcaster = classObj.spellcasting;
                setSpellCasting(isSpellcaster);

                //adding on the saving throws:
                let savingThrowsStringArr =  classObj.saving_throws.map((obj) => constants.ABILITY_KEY_MAP[obj.index])
                setCharacter({ type: ACTION.UPDATE_PROFICIENCIES, payload: { savingThrows: savingThrowsStringArr } });

                if (isSpellcaster) {
                    // Assigns these two constants to a string array containing the spells for the class and all level 1 spells
                    const classSpells = (await dndApi.getMoreInfo(classObj.spells)).data.results.map((spell) => spell.name);
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
export default ProficienciesForm;
