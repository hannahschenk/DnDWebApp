import React from 'react';
import { Link } from 'react-router-dom';

const homePage = () => {

    return(
        <>
            <section>
                <h2>Anonymous Character Creation</h2>
                <p>Creating a character has never been easier with the help of DndCC. This character creation has been
                simplified down to a step by step process where we walk you through. This sheet will take you through the Race, Classes,
                Ability scores, Character details, Proficiencies and Equipment. By creating your character anonymously, you will not be
                able to save your character sheet for later use, but you can still use it immediately after creation.</p>
                <Link to="/CharacterCreationPage">Get Started</Link>
            </section>
            <section>
                <h2>Authenticated Character Creation</h2>
                <p>Creating a character under an authenticated account, will not only allow you to save your created character,
                but to also save multiple created characters. These can be accessed at any time, and edited upon later.</p>
                <br></br>
                <a href="#">Sign Up Here</a>
            </section>
            <section>
                <h2>About us</h2>
                <p>We're a team of apprentices, The School Of Five Rats, and are apart of the Techtonic team. We are focused on developing 
                our skills as software developers by creating this app. Our group members include, Ervey Del Rosario, Hunter Long, Ian Goodwin, 
                Hannah Schenk and Tre Silknitter. 
                </p>
            </section>
        </>
    )
};

export default homePage;