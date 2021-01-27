import React, { useState, useEffect, useContext } from 'react';

import dndApi from './../../../utils/dnd5eApi';
import SkillsForm from './SkillsForm';
import SpellsForm from './SpellsForm';

import { useCharacter } from './../../../state/logic';
import * as ACTION from './../../../state/actions';
import constants from '../../../utils/constants';
        
import FormControlContext from './../../../state/formControlManager';

const ProficienciesForm = () => {
    
    const { character, setCharacter, setDetails } = useCharacter();

    const [skillProficiencies, setSkillProficiencies] = useState([]);
    const [spellCasting, setSpellCasting] = useState(undefined);
    const [availableSpells, setAvailableSpells] = useState([]);

    const [skillsFormDone, setSkillsFormDone] = useState(false);
    const [spellsFormDone, setSpellsFormDone] = useState(false);
    const { formControlState, setFormControlState } = useContext(FormControlContext);
    /*
     * Signature: useEffect(func, [])
     * Description: sets all the skill choices and all the
     *               spells that the user can have
     */
    useEffect(async () => {
        // Reset details component
        setDetails({});

        let mounted = true;
        if (mounted) {
            try {
                // Grab the class's skills
                const classObj = (await dndApi.getMoreInfo(character.character_class.url)).data;
                setSkillProficiencies(classObj.proficiency_choices);

                // Set ifSpellcaster to the spellcasting object if a spellcasting class, or undefined if not (controls rendering of <SpellsForm /> component)
                const isSpellcaster = classObj.spellcasting;
                setSpellCasting(isSpellcaster);

                // Adding on the saving throws:
                let savingThrowsStringArr = classObj.saving_throws.map((obj) => constants.ABILITY_KEY_MAP[obj.index]);
                if (character.proficiencies.savingThrows.length == 0) {
                    setCharacter({ type: ACTION.UPDATE_PROFICIENCIES, payload: { savingThrows: savingThrowsStringArr } });
                }

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

    /*
     * Signature: useEffect(func, [character])
     * Description: watch for character changes on class name to
     *               determine if the user can move on to the next section
     *               via the formControlState
     */
    useEffect(() => {
        let mounted = true;
        // set it as setSkillsFormDone && spellsFormDone once we get spells figured out
        mounted && setFormControlState({ ...formControlState, currentFormDone: skillsFormDone });

        return () => {
            mounted = false;
        };
    }, [skillsFormDone, spellsFormDone]);

    return (
        <>
            {skillProficiencies.length >= 1 && (
                <SkillsForm skillProficiencies={skillProficiencies[0]} field="skills" skillsFormDoneState={{ skillsFormDone, setSkillsFormDone }} />
            )}
            {skillProficiencies.length == 2 && (
                <SkillsForm skillProficiencies={skillProficiencies[1]} field="items" skillsFormDoneState={{ skillsFormDone, setSkillsFormDone }} />
            )}
            {/* Render spells form only if user's class is: 'bard', 'cleric', 'druid', 'paladin', 'ranger', 'sorcerer', 'warlock', 'wizard' */}
            {spellCasting && <SpellsForm availableSpells={availableSpells} />}
        </>
    );
};
export default ProficienciesForm;
