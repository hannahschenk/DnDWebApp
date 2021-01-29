import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';

import { useCharacter } from '../state/logic';

import { deleteCharacter, postCharacter } from '../utils/api';
import CONSTANTS from '../utils/constants';
import dndApi from '../utils/dnd5eApi';

const CharacterOverview = () => {
    const { character } = useCharacter();

    // This is necessary to grab additional spell data from API
    const [spellData, setSpellData] = useState([]);
    // This is necessary because the skills are stored as an array objects, not as strings
    const [proficientSkills, setProficientSkills] = useState([]);

    const history = useHistory();

    /*
     * Signature: useEffect(func, [])
     * Description: Pull spells data to render to details screen
     */
    useEffect(async () => {
        window.scrollTo(0, 0);

        let mounted = true;

        if (mounted) {
            // Format proficient skills to use in component
            setProficientSkills(Object.values(character.proficiencies.skills).map((skill) => skill.name));

            // Grab spell data
            if (character.proficiencies.spells.length !== 0) {
                try {
                    let spells = await Promise.all(
                        character.proficiencies.spells.map(async (spell) => {
                            return (await dndApi.getMoreInfo(spell.url)).data;
                        })
                    );
                    setSpellData(spells);
                } catch (err) {
                    console.error(err);
                }
            }
        }
        return () => {
            mounted = false;
        };
    }, []);

    return (
        <main className="footer-grow">
            {/* Character Name */}
            <section>
                <h2 className="stat__title">{character.background.characterName}</h2>
                <hr />
            </section>

            {/* Race */}
            <section>
                <h3 className="stat__title">Race</h3>
                <h4 className="stat__name">
                    {character.race.name}
                    {character.race.subrace !== '' && `: ${character.race.subrace}`}
                </h4>
                <p className="stat__text">Base Speed: {character.race.speed} ft.</p>
                <p className="stat__text">Size: {character.race.size}</p>
                <hr />
            </section>

            {/* Class and HP */}
            <section>
                <h3 className="stat__title">Class</h3>
                <h4 className="stat__text">{character.character_class.name}</h4>
                <h3 className="stat__title">Hit Points</h3>
                <h4 className="stat__text">{character.character_class.hitDie + Math.floor((character.abilities.constitution - 10) / 2)}</h4>
                {/* Render class details / features here? */}
                <hr />
            </section>

            {/* Abilities and Saving Throws */}
            <section>
                <h3 className="stat__title">Abilities</h3>
                {Object.entries(character.abilities).map(([ability, score], idx) => {
                    const modifier = Math.floor((score - 10) / 2);
                    return (
                        <React.Fragment key={idx}>
                            <h4 className="stat__name">{ability.charAt(0).toUpperCase() + ability.slice(1)}: </h4>
                            <p className="stat__score">{score}</p>
                            <p className="stat__modifier">
                                {modifier > 0 && '+'}
                                {modifier}
                            </p>
                        </React.Fragment>
                    );
                })}
                <h3 className="stat__title">Saving Throws</h3>
                {Object.entries(character.abilities).map(([ability, score], idx) => {
                    let modifier = Math.floor((score - 10) / 2);

                    if (character.proficiencies.savingThrows.includes(ability)) modifier += 2;

                    return (
                        <React.Fragment key={idx}>
                            <h4 className="stat__name">
                                {ability.charAt(0).toUpperCase() + ability.slice(1)}:{character.proficiencies.savingThrows.includes(ability) && ' *'}
                            </h4>
                            <p className="stat__modifier">
                                {modifier > 0 && '+'}
                                {modifier}
                            </p>
                        </React.Fragment>
                    );
                })}
                <hr />
            </section>

            {/* Skills */}
            <section>
                <h3 className="stat__title">Skills</h3>
                {Object.entries(CONSTANTS.SKILLS).map(([skill, ability], idx) => {
                    // read ability from object, find matching stat in character.abilities, determine modifier
                    let skillModifier = Math.floor((character.abilities[ability] - 10) / 2);

                    // add +2 proficiency bonus if in the proficiencies.skills array
                    let skillProficiency = proficientSkills.includes(skill);
                    if (skillProficiency) skillModifier += 2;

                    return (
                        <React.Fragment key={idx}>
                            <h4 className="stat__name">
                                {skill}
                                {skillProficiency && ' *'}
                            </h4>
                            <p className="stat__modifier">
                                {skillModifier > 0 && '+'}
                                {skillModifier}
                            </p>
                        </React.Fragment>
                    );
                })}
                <hr />
            </section>

            {/* Spells - Only render if there are spells in the object! */}
            {character.proficiencies.spells.length !== 0 && spellData ? (
                <section>
                    <h3 className="stat__title">Spells</h3>
                    {spellData.map((spell, idx) => {
                        return (
                            <article key={idx}>
                                <h4 className="stat__text">{spell.name}</h4>
                                {/* I'm imagining this as a drop down menu that expands and reveals this additional data */}
                                <aside>
                                    <p className="stat__text">School: {spell.school.name}</p>
                                    <p className="stat__text">Level: {spell.level}</p>
                                    {spell.concentration && (
                                        <p className="stat__text">
                                            <em>Concentration</em>
                                        </p>
                                    )}
                                    {spell.ritual && (
                                        <p className="stat__text">
                                            <em>Ritual</em>
                                        </p>
                                    )}
                                    {spell.components && (
                                        <p className="stat__text">Components:{Object.values(spell.components).map((component) => ' ' + component)}</p>
                                    )}
                                    {spell.material && <p className="stat__text">Material: {spell.material}</p>}
                                    {spell.range && <p className="stat__text">Range: {spell.range}</p>}
                                    {spell.casting_time && <p className="stat__text">Casting Time: {spell.casting_time}</p>}
                                    {spell.duration && <p className="stat__text">Duration: {spell.duration}</p>}
                                    {spell.desc.map((desc, idx) => (
                                        <p className="stat__text" key={idx}>
                                            {desc}
                                        </p>
                                    ))}
                                </aside>
                            </article>
                        );
                    })}
                    <hr />
                </section>
            ) : null}

            {/* Equipment */}
            <section>
                <h3 className="stat__title">Proficient Items</h3>
                {character.proficiencies.items.map((item, idx) => {
                    return (
                        <p className="stat__text" key={idx}>
                            {item.name}
                        </p>
                    );
                })}
                <h3 className="stat__title">Equipment</h3>
                {character.equipment.total.map((item, idx) => {
                    return (
                        <p className="stat__text" key={idx}>
                            {item.name}
                        </p>
                    );
                })}
                <hr />
            </section>

            {/* Background */}
            <section>
                <h3 className="stat__title">Character Details</h3>
                <aside>
                    <h4 className="stat__title">Age</h4>
                    <p className="stat__text">{character.background.age}</p>
                    <h4 className="stat__title">Height</h4>
                    <p className="stat__text">{character.background.height}</p>
                    <h4 className="stat__title">Weight</h4>
                    <p className="stat__text">{character.background.weight}</p>
                </aside>

                {/* Languages */}
                <h3 className="stat__title">Languages</h3>
                {Object.values(character.background.languages).map((language, idx) => (
                    <p className="stat__text" key={idx}>
                        {language.name}
                    </p>
                ))}

                <h3 className="stat__title">Alignment: {character.background.alignment}</h3>

                <h3 className="stat__title">Background</h3>
                <p className="stat__text">{character.background.name}</p>
                {/* Render background details here? */}

                <h3 className="stat__title">Appearance</h3>
                <p className="stat__text">{character.background.appearance}</p>

                <h3 className="stat__title">Personality</h3>
                <p className="stat__text">{character.background.personality}</p>
            </section>

            {/* Buttons */}
            <section>
                <button onClick={() => postCharacter(character)}>Save</button>
                <button onClick={() => history.push('/')}>Edit</button>
                <button onClick={() => deleteCharacter(character, id)}>Delete</button>
            </section>
        </main>
    );
};

export default CharacterOverview;
