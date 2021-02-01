import React, { useEffect, useState } from 'react';
import { useHistory, useParams, useLocation } from 'react-router';

import { useCharacter } from '../state/logic';

import { deleteCharacter, postCharacter, getCharacter, updateCharacter } from '../utils/api';
import { useAuth0 } from "@auth0/auth0-react";
import * as ACTION from "./../state/actions";
import CONSTANTS from '../utils/constants';
import dndApi from '../utils/dnd5eApi';

const CharacterOverview = () => {
    const { character,setCharacter } = useCharacter();
    const [raceData, setRaceData] = useState([]);
    const [classData, setClassData] = useState([]);
    const [backgroundData, setBackgroundData] = useState();
    const [spellData, setSpellData] = useState([]);
    const [proficientSkills, setProficientSkills] = useState([]);
    const {getAccessTokenSilently, isAuthenticated, isLoading} = useAuth0();
    const history = useHistory();
    const sheetId = useParams().id;
    const location = useLocation();
    const newCharacterOverviewPath = "/overview";
    const savedCharacterOverviewPath = `/overview/${sheetId}`;
    const editCharacterOvewviewPath = `/edit-overview/${sheetId}`;
    const [backendLoading, setBackendLoading] = useState(false);

    /*
     * Signature: expandSpell(event)
     * Description: Enables user to open the collapsible with the space bar or enter key
     */
    const expandSpell = (e) => {
        // 32 === spacebar
        // 13 === enter
        if (e.which === 32 || e.which === 13) {
            e.preventDefault();
            label.click();
        }
    };

    /*
    * Description: after authentication loads, check if the user is authentiate and
    * get the character information from the backend given the sheetId if path is /overview/:id
    */
    useEffect(async () => {
        if(sheetId && location.pathname == savedCharacterOverviewPath){
            if(isAuthenticated){
                const token = await getAccessTokenSilently();
                let savedCharacter = (await getCharacter(sheetId, token)).data
                setCharacter({ type: ACTION.SET_CHARACTER, payload: {...savedCharacter}});
                
                if(!savedCharacter){
                    history.push("/404")
                }
            }
            else{
                history.push("/404")
            }
        }
    }, [isLoading])

    /*
     * Signature: useEffect(func, [])
     * Description: Pull spells data to render to details screen; this will change based on character sheet
     */
    useEffect(async () => {
        window.scrollTo(0, 0);

        let mounted = true;

        if (mounted) {
            // Format proficient skills to use in component
            setProficientSkills(Object.values(character.proficiencies.skills).map((skill) => skill.name));

            try {
                // Grab racial traits data
                const traitsData = (await dndApi.getMoreInfo(character.race.raceUrl)).data.traits;
                if (traitsData.length !== 0) {
                    let traits = await Promise.all(traitsData.map(async (trait) => (await dndApi.getMoreInfo(trait.url)).data));
                    setRaceData(traits);
                }

                // Grab level 1 data for class
                const level1Data = (await dndApi.getMoreInfo(`${character.character_class.url}/levels/1`)).data;
                if (level1Data.features.length !== 0) {
                    let features = await Promise.all(level1Data.features.map(async (feature) => (await dndApi.getMoreInfo(feature.url)).data));
                    setClassData(features);
                }

                // Grab spell data
                if (character.proficiencies.spells.length !== 0) {
                    let spells = await Promise.all(character.proficiencies.spells.map(async (spell) => (await dndApi.getMoreInfo(spell.url)).data));
                    setSpellData(spells);
                }

                // Grab background data
                setBackgroundData((await dndApi.getBackground(character.background.url)).data);

                // Enable user to press enter or space bar to open collapsible menus
                let collapsibleCheckboxes = document.querySelectorAll('.toggleInfo');
                Array.from(collapsibleCheckboxes).forEach((label) => {
                    label.addEventListener('keydown', (e) => expandSpell(e));
                });

                // setClassData((await dndApi.getMoreInfo(character.character_class.url)).data);
                setBackgroundData((await dndApi.getBackground(character.background.url)).data);
            } catch (err) {
                console.error(err);
            }
        }
        return () => {
            let spellCheckboxes = document.querySelectorAll('.toggleInfo');
            Array.from(spellCheckboxes).forEach((label) => {
                label.removeEventListener('keydown', (e) => expandSpell(e));
            });
            mounted = false;
        };
    }, [character]);

    /*
    * Description: decides what request to send to the back end 
    * based on what action is
    */
    const sendToBackend = async (action) => {
        try{
            if(isAuthenticated){
                setBackendLoading(true);
                const token = await getAccessTokenSilently();
                let backendRes = 
                (action == "SAVE") ? 
                   (await postCharacter(character, token)).data : 
                (action == "EDIT") ? 
                    (await updateCharacter(character, sheetId, token)).data:
                (await deleteCharacter(sheetId, token)).data


                setCharacter({ type: ACTION.RESET_CHARACTER });
                localStorage.removeItem("character");
                if(backendRes){
                    setBackendLoading(!backendRes)
                    history.push("/dashboard");
                }
            }
        } catch (e){
            console.error(e);
        }
    }

   /*
    * Description: decides what buttons to render based on the current path name
    */
    const generateButton = () => {
        let cancelRedirect = (isAuthenticated) ? "/dashboard" : "/"
        let saveCharacterButton = (isAuthenticated) ? 
            <button onClick={() => sendToBackend("SAVE")}>Save Character</button> : 
            <button onClick={() => window.print()}>Print Character</button>
        return(
            (location.pathname == newCharacterOverviewPath) ?
                <section className="ov__buttons">
                    {saveCharacterButton}
                    <button onClick={() => history.push(`/create-character`)}>Edit Character</button>
                    <button onClick={() => history.push(cancelRedirect)}>Cancel</button>
                </section> : 

            (location.pathname == editCharacterOvewviewPath) ? 
                <section className="ov__buttons">
                    <button onClick={() => history.push(`/dashboard`)}> Return to Dashboard</button>
                    <button onClick={() => sendToBackend("EDIT")}>Save Character Edits</button>
                    <button onClick={() => history.push(`/edit-character/${sheetId}`)}>Edit Character</button>
                    <button onClick={() => sendToBackend("DELETE")}>Delete</button>
                </section> :

                <section className="ov__buttons">
                    <button onClick={() => history.push(`/dashboard`)}> Return to Dashboard</button>
                    <button onClick={() => history.push(`/edit-character/${sheetId}`)}>Edit Character</button>
                    <button onClick={() => sendToBackend("DELETE")}>Delete</button>
                </section>
        )      
    }

    return raceData && classData && backgroundData && spellData ? (
        <main className="ov character" style={{ display: 'grid' }}>
            {/* Character Name */}
            <section className="character__container ov__name">
                <h2 className="container__header">{character.background.characterName}</h2>
            </section>

            {/* Race */}
            <section className="character__container ov--overview ov__race">
                <h3 className="container__header">Race</h3>
                <br />

                <CollapsibleData feature={character.race.subrace !== '' ? character.race.subrace : character.race.name} data={raceData} />

                <br />
                <div className="ov--race">
                    <div>
                        <h4 className="container__subheader">Base Speed</h4>
                        <p className="container__text">{character.race.speed} ft.</p>
                    </div>

                    <div>
                        <h4 className="container__subheader">Size</h4>
                        <p className="container__text">{character.race.size}</p>
                    </div>

                    <div>
                        <h3 className="container__subheader">Alignment</h3>
                        <p className="container__text">{character.background.alignment}</p>
                    </div>

                    <div className="ov--backgrounds">
                        <div className="ov--details">
                            <h4 className="container__subheader">Age</h4>
                            <p className="container__text">{character.background.age}</p>
                            <h4 className="container__subheader">Height</h4>
                            <p className="container__text">{character.background.height}</p>
                            <h4 className="container__subheader">Weight</h4>
                            <p className="container__text">{character.background.weight}</p>
                            <br />
                        </div>

                        {/* Languages */}
                        <div>
                            <h3 className="container__subheader">Languages</h3>
                            {Object.values(character.background.languages).map((language, idx) => (
                                <p className="container__text" key={idx}>
                                    {language.name}
                                </p>
                            ))}
                            <br />
                        </div>
                    </div>
                </div>
            </section>

            {/* Class and HP */}
            <section className="character__container ov--overview ov__class">
                <h3 className="container__header">Class</h3>
                <br />

                <CollapsibleData feature={character.character_class.name} data={classData} />

                <br />
                <div className="ov--class">
                    <h4 className="container__subheader">Hit Points</h4>
                    <p className="container__text">{character.character_class.hitDie + Math.floor((character.abilities.constitution - 10) / 2)}</p>
                    <h4 className="container__subheader">Hit Die</h4>
                    <p className="container__text">1d{character.character_class.hitDie}</p>
                </div>
                {/* Render class details / features here? */}
            </section>

            {/* Abilities and Saving Throws */}
            <section className="character__container ov--overview ov__abilities">
                <div>
                    <div className="ov--abilityNames">
                        <h3 className="container__header">Abilities</h3>
                        <h4 className="container__subheader" style={{ fontSize: '14px' }}>
                            Score
                        </h4>
                        <h4 className="container__subheader" style={{ fontSize: '14px' }}>
                            Modifier
                        </h4>
                        <h4 className="container__subheader" style={{ fontSize: '14px', textAlign: 'center' }}>
                            <p>Saving</p>
                            <p>Throw</p>
                            <p>Bonus</p>
                        </h4>
                    </div>
                    <div>
                        {Object.entries(character.abilities).map(([ability, score], idx) => {
                            let modifier = Math.floor((score - 10) / 2);
                            let save = modifier;
                            if (character.proficiencies.savingThrows.includes(ability)) save += 2;

                            return (
                                <div className="ov--abilities" key={idx}>
                                    <h4 className="container__subheader">
                                        {ability.charAt(0).toUpperCase() + ability.slice(1)}
                                        {character.proficiencies.savingThrows.includes(ability) && ' *'}
                                    </h4>
                                    <p className="container__text">{score}</p>
                                    <p className="container__text">
                                        {modifier >= 0 && '+'}
                                        {modifier}
                                    </p>
                                    <p className="container__text">
                                        {save >= 0 && '+'}
                                        {save}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Skills */}
            <section className="character__container ov--overview ov__skills">
                <h3 className="container__header">Skills</h3>
                <br />
                <div className="ov--skills">
                    {Object.entries(CONSTANTS.SKILLS).map(([skill, ability], idx) => {
                        // read ability from object, find matching stat in character.abilities, determine modifier
                        let skillModifier = Math.floor((character.abilities[ability] - 10) / 2);

                        // add +2 proficiency bonus if in the proficiencies.skills array
                        let skillProficiency = proficientSkills.includes(skill);
                        if (skillProficiency) skillModifier += 2;

                        return (
                            <React.Fragment key={idx}>
                                <h4 className="container__subheader">
                                    {skill}
                                    {skillProficiency && ' *'}
                                </h4>
                                <p className="container__text">
                                    {skillModifier > 0 && '+'}
                                    {skillModifier}
                                </p>
                            </React.Fragment>
                        );
                    })}
                </div>
            </section>

            {/* Spells - Only render if there are spells in the object! */}
            {character.proficiencies.spells.length !== 0 && spellData ? (
                <section className="character__container ov--overview ov__spells">
                    <h3 className="container__header">Spells</h3>

                    <br />
                    <div className="ov--spells">
                        {spellData.map((spell, idx) => {
                            return (
                                <article key={idx}>
                                    <input id={`collapsible--${idx}`} className="toggleInfo" type="checkbox" tabIndex="0" style={{ display: 'none' }} />
                                    <label htmlFor={`collapsible--${idx}`} className="container__subheader label__toggle">
                                        {spell.name}
                                        <i className="fa fa-chevron-down"></i>
                                    </label>
                                    {/* I'm imagining this as a drop down menu that expands and reveals this additional data */}
                                    <aside className="container--collapsible">
                                        <br />
                                        <p className="container__text">
                                            <strong>School: </strong>
                                            {spell.school.name}
                                        </p>
                                        <p className="container__text">
                                            <strong>Level: </strong>
                                            {spell.level}
                                        </p>
                                        {spell.concentration && (
                                            <p className="container__text">
                                                <em>Concentration</em>
                                            </p>
                                        )}
                                        {spell.ritual && (
                                            <p className="container__text">
                                                <em>Ritual</em>
                                            </p>
                                        )}
                                        {spell.components && (
                                            <p className="container__text">
                                                <strong>Components: </strong>
                                                {Object.values(spell.components).map((component) => ' ' + component)}
                                            </p>
                                        )}
                                        {spell.material && (
                                            <p className="container__text">
                                                <strong>Material: </strong>
                                                {spell.material}
                                            </p>
                                        )}
                                        {spell.range && (
                                            <p className="container__text">
                                                <strong>Range: </strong>
                                                {spell.range}
                                            </p>
                                        )}
                                        {spell.casting_time && (
                                            <p className="container__text">
                                                <strong>Casting Time: </strong>
                                                {spell.casting_time}
                                            </p>
                                        )}
                                        {spell.duration && (
                                            <p className="container__text">
                                                <strong>Duration: </strong>
                                                {spell.duration}
                                            </p>
                                        )}
                                        {spell.desc.map((desc, idx) => (
                                            <p className="container__text" key={idx}>
                                                {desc}
                                            </p>
                                        ))}
                                    </aside>
                                    <br />
                                </article>
                            );
                        })}
                    </div>
                </section>
            ) : null}

            {/* Equipment */}
            <section className="character__container ov--overview ov__equipment">
                {character.proficiencies.items.length !== 0 && (
                    <>
                        <h3 className="container__header">Proficient Items</h3>
                        <br />
                    </>
                )}
                {character.proficiencies.items.map((item, idx) => {
                    return (
                        <p className="container__text" key={idx}>
                            {item.name}
                        </p>
                    );
                })}
                {character.equipment.total.length !== 0 && <h3 className="container__header">Equipment</h3>}
                {character.equipment.total.map((item, idx) => {
                    return (
                        <p className="container__text" key={idx}>
                            {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
                        </p>
                    );
                })}
            </section>

            {/* Background */}
            <section className="character__container ov--overview ov__backgrounds">
                <h3 className="container__header">Character Details</h3>
                <br />
                <h3 className="container__header">Background</h3>
                <br />

                <input id="collapsible__background" className="toggleInfo" type="checkbox" tabIndex="0" style={{ display: 'none' }} />
                <label htmlFor="collapsible__background" className="container__subheader label__toggle">
                    <h4 className="container__subheader">{character.background.name}</h4>
                    <i className="fa fa-chevron-down"></i>
                </label>
                <article className="container--collapsible">
                    {backgroundData && (
                        <>
                            <br />
                            <p className="container__text">{backgroundData.description}</p>
                            <br />
                            <p className="container__text">
                                <em>{backgroundData.feature.name}</em>
                            </p>
                            <br />
                            <p className="container__text">{backgroundData.feature.description}</p>
                            <br />
                        </>
                    )}
                </article>

                <br />
                <h3 className="container__header">Appearance</h3>
                <p className="container__text">{character.background.appearance}</p>
                <br />

                <h3 className="container__header">Personality</h3>
                <p className="container__text">{character.background.personality}</p>
                <br />
            </section>

            {/* Buttons */}
            {generateButton()}
        </main>
    ) : 
    (backendLoading) ? 
    (
        <main className="backendLoading" style={{ display: 'grid' }}>
            Saving Changes
        </main>
    ) : 
    
    (
        <main className="character ov--overview character--loading" style={{ display: 'grid' }}>
            <section className="character__container">
                <h2 className="container__header" style={{ margin: '1rem' }}>
                    Loading character sheet for {character.background.characterName}...
                </h2>
            </section>
        </main>
    );
};

export default CharacterOverview;

// A reusable component for race and class!
const CollapsibleData = ({ feature, data }) => {
    if (data && data.length !== 0) {
        return (
            <>
                <input id={`collapsible__${feature}`} className="toggleInfo" type="checkbox" tabIndex="0" style={{ display: 'none' }} />
                <label htmlFor={`collapsible__${feature}`} className="container__subheader label__toggle">
                    <h4 className="container__subheader">{feature}</h4>
                    <i className="fa fa-chevron-down"></i>
                </label>
                <article className="container--collapsible">
                    {data.map((feature, idx) => (
                        <React.Fragment key={idx}>
                            <br />
                            <h4 className="container__text">
                                <em>{feature.name}</em>
                            </h4>
                            {feature.desc.map((p, idxx) => (
                                <p key={idxx} className="container__text">
                                    {p}
                                </p>
                            ))}
                        </React.Fragment>
                    ))}
                </article>
            </>
        );
    } else {
        return <h4 className="container__subheader">{feature}</h4>;
    }
};
