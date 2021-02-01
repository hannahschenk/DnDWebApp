import React from 'react';
import { Link } from 'react-router-dom';

const homePage = () => {

    return(
        <div className = "landingContainer">
            <section className = "character">
                <div className = "character__container">
                    <h2 className = "container__header">Anonymous Character Creation</h2>
                    <p className = "container__text">Creating a character has never been easier with the help of DndCC. This character creation has been
                        simplified down to a step by step process where we walk you through. This sheet will take you through the Race, Classes,
                        Ability scores, Character details, Proficiencies and Equipment. By creating your character anonymously, you will not be
                        able to save your character sheet for later use, but you can still use it immediately after creation.
                    </p>
                </div> 
                <i class='fab fa-d-and-d'></i>
                <Link to="/create-character" className = "character__button button button--red">Create Character</Link>
            </section>
            <section className = "login">
                <div className = "login__container">
                    <i class="fas fa-dice-d20"></i>
                    <div className = "container__signin">
                        <div className = "signin__google">
                            <img src = "" className = "google__image"></img>
                            <a className = "google__text" href="#">Sign in with google</a>
                        </div>
                    </div>
                </div>
                <div className = "login__container2">
                    <div className = "container2__textContainer">
                        <h2 className = "textContainer__header">Authenticated Character Creation</h2>
                        <p className = "textContainer__text">Creating a character under an authenticated account, will not only allow you to save your created character,
                            but to also save multiple created characters. These can be accessed at any time, and edited upon later.
                        </p>
                        <br></br>
                    </div>
                </div> 
            </section>
            <section className = "about">
                <div className = "about__container">
                    <h2 className = "container__header">About us</h2>
                    <p className = "container__text">We're a team of apprentices, The School Of Five Rats, and are apart of the Techtonic team. We are focused on developing 
                        our skills as software developers by creating this app. Our group members include, Ervey Del Rosario, Hunter Long, Ian Goodwin, 
                        Hannah Schenk and Tre Silknitter. 
                    </p>
                </div>
                <img src = "" className = "about__image1"></img>
                <img src = "" className = "about__image2"></img>
            </section>
        </div>
    )
};

export default homePage;