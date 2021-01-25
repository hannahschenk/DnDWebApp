import React, { useEffect, useState } from 'react';

import { useCharacter } from '../state/logic';
import CONSTANTS from '../utils/constants';

import dndApi from '../utils/dnd5eApi';

const CharacterOverview = () => {
    const { character } = useCharacter();

    const [spellData, setSpellData] = useState([]);

    // Pull spells data to render to details screen
    useEffect(() => {
        let mounted = true;
        let spellsArray = [];

        if (mounted) {
            try {
                //   character.proficiencies.spells.map((spell) => {
                //     // console.log((await dndApi.getMoreInfo(spell.url)).data);
                //     dndApi.getMoreInfo(spell.url).then((s) => {
                //         spellsArray.push(s.data);
                //     });
                // });
                character.proficiencies.spells.map(async (spell) => {
                    // console.log((await dndApi.getMoreInfo(spell.url)).data);
                    spellsArray.push((await dndApi.getMoreInfo(spell.url)).data);
                });
                setSpellData(spellsArray);
            } catch (err) {
                console.error(err);
            }
        }
        console.log(spellsArray.length);
        return () => {
            mounted = false;
        };
    }, []);

    useEffect(() => {
        console.log(spellData);
        // This does not work
        // console.log(spellData.length); // returns 0
        // spellData.map((spell) => console.log(spell));
    }, [spellData]);

    return (
        <>
            <h2 className="stat__title">{character.background.characterName}</h2>
            <hr />

            {/* Race */}
            <section>
                <h3 className="stat__title">Race</h3>
                <h4 className="stat__name">
                    {character.race.name} : {character.race.subrace}
                </h4>
                <p className="stat__text">Base Speed: {character.race.speed} ft.</p>
                <p className="stat__text">Size: {character.race.size}</p>
                <hr />
            </section>

            {/* Class */}
            <section>
                <h3 className="stat__title">Class</h3>
                <h4 className="stat__text">{character.class.name}</h4>
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
                            <h4 className="stat__name">{ability.charAt(0).toUpperCase() + ability.slice(1)}: </h4>
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
                    Object.values(character.proficiencies.skills).map((proficientSkill) => {
                        if (skill === proficientSkill.name) skillModifier += 2;
                    });

                    return (
                        <React.Fragment key={idx}>
                            <h4 className="stat__name">{skill}</h4>
                            <p className="stat__modifier">
                                {skillModifier > 0 && '+'}
                                {skillModifier}
                            </p>
                        </React.Fragment>
                    );
                })}
                <hr />
            </section>

            {/* Spells */}
            <section>
                <h3 className="stat__title">Spells</h3>
                {spellData.map((spell, idx) => {
                    console.log(spell);
                    return (
                        <aside key={idx}>
                            <h4 className="stat__text">{spell.name}</h4>
                            <p className="stat_text">School: {spell.school.name}</p>
                            <p className="stat_text">Casting Time: {spell.casting_time}</p>
                            <p className="stat_text">Components: {Object.values(spell.components).map((component) => `${component} `)}</p>
                            <p className="stat_text">{spell.concentration ? 'Required' : 'Not Required'}</p>
                        </aside>
                    );
                })}
                <hr />
            </section>

            {/* Equipment */}

            {/* Background */}
            <section>
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
        </>
    );
};

export default CharacterOverview;
