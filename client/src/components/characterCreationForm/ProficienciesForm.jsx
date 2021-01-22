import React, { useState, useEffect } from 'react';

import dndApi from '../../utils/dnd5eApi';

import { useCharacter } from '../../state/logic';
import * as ACTION from '../../state/actions';

const ProficienciesForm = () => {
    const { character, setCharacter } = useCharacter();

    const [skillProficiencies, setSkillProficiencies] = useState([]);
    const [spellCasting, setSpellCasting] = useState(undefined);
    const [availableSpells, setAvailableSpells] = useState([]);

    useEffect(async () => {
        let mounted = true;

        if (mounted) {
            try {
                // Grab the class's skills
                const skillProficiencies = (await dndApi.getClass('cleric')).data.proficiency_choices;
                setSkillProficiencies(skillProficiencies);

                // Set ifSpellcaster to the spellcasting object if a spellcasting class, or undefined if not (controls rendering of <SpellsForm /> component)
                const ifSpellcaster = await dndApi.getClass('cleric');
                setSpellCasting(ifSpellcaster.data.spellcasting);
                // const ifSpellcaster = await dndApi.getClass(character.class.name);

                if (ifSpellcaster.data.spellcasting) {
                    // Assigns these two constants to a string array containing the spells for the class and all level 1 spells
                    const classSpells = (await dndApi.getClass('cleric/spells')).data.results.map((spell) => spell.name);
                    const levelOneSpells = (await dndApi.getMoreInfo('/spells?level=1')).data.results.map((spell) => spell.name);
                    // const classSpells = (await dndApi.getClass(character.class.name + '/spells')).data.results.map((spell) => spell.name);
                    // const levelOneSpells =  (await dndApi.getMoreInfo('/spells?level=1')).data.results.map((spell) => spell.name);

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

    useEffect(() => {
        console.log(skillProficiencies);
    }, [skillProficiencies]);

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
        console.log(e.target.name);
    };

    return (
        <>
            {skillProficiencies.map((proficiency, idx) => {
                return (
                    <React.Fragment key={idx}>
                        <h3>Choose {proficiency.choose} Proficiencies</h3>
                        {proficiency.from.map((skill, idxx) => {
                            const skillName = skill.name.match(/\b(?!Skill:\s\b)\w+/);
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
        console.log(e.target.name);
        //TODO Grab the user's selected spells and store in state
    };

    return (
        <>
            <h3>Select Spells</h3>
            {/* PLACE IN CHARACTER DETAILS FORM - HUNTER! */}

            {/* <section>
                {spellCasting.info.map((sectionTitle, idx) => {
                    return (
                        <React.Fragment key={idx}>
                            <h4>{sectionTitle.name}</h4>
                            <article>
                                {spellCasting.info[idx].desc.map((paragraph, idx) => {
                                    return <p key={idx}>{paragraph}</p>;
                                })}
                            </article>
                        </React.Fragment>
                    );
                })}
            </section> */}

            {/* RENDER SPELLS HERE */}
            {availableSpells.map((spell, idx) => {
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
