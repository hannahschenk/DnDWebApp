import React from 'react';
import { Link } from 'react-router-dom';


import { useAuth0 } from "@auth0/auth0-react";

const homePage = () => {
    const {isAuthenticated, logout, loginWithRedirect, isLoading} = useAuth0();
    const signInHandler = () => {
        loginWithRedirect()
    }
    return (
        <>
            <div className="landingContainer">
                <section className="character" id = "character">
                    <div className="character__container1">
                        <div className="container1__container">
                            <h2 className="container__header">Anonymous Character Creation</h2>
                            <p className="container__text">
                                Creating a character has never been easier with the help of D&D CC. This character creation tool has been simplified to a
                                process where we walk you through each step. <br></br>
                                <br></br>This sheet will take you through the race, classes, ability scores, character details, proficiencies, and equipment for
                                the character you want too create.<br></br>
                                <br></br> By creating your character anonymously, you will not be able to save your character sheet for later use, but you can
                                still use it immediately after creation.
                            </p>
                        </div>
                        <i className="fab fa-d-and-d"></i>
                        <div className="container1__buttonContainer">
                            <Link to="/create-character" className="button button button--red">
                                CREATE CHARACTER
                            </Link>
                        </div>
                    </div>
                </section>
                <section className="login" id="login">
                    <div className="login__container">
                        <div className="filler1"></div>
                        <div className="container__container1">
                            <i className="fas fa-dice-d20"></i>
                            <div className="container1__signin">
                                <div className="signin__google" onClick={signInHandler}>
                                    <div className="google__image">
                                        <i className="fab fa-google"></i>
                                    </div>
                                    <div className="gridColor"></div>
                                    <a className="google__text" href="#">
                                        Sign in with Google
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="container__container2">
                            <div className="container2__textContainer">
                                <h2 className="textContainer__header">Authenticated Character Creation</h2>
                                <p className="textContainer__text">
                                    Creating a character under an authenticated account will not only allow you to save your created character, but to also save
                                    multiple character sheets. These can be accessed at any time, and edited later.
                                </p>
                                <br></br>
                            </div>
                        </div>
                        <div className="filler2"></div>
                    </div>
                </section>
                <section className="about" id="about">
                    <div className="about__container">
                        <h2 className="container__header">About us</h2>
                        <p className="container__text">
                            We're a team of apprentices, The School Of Five Rats, and are a part of the Techtonic apprenticeship program. We are focused on
                            developing our skills as software developers by creating this app. Our group members include Ervey Del Rosario, Hunter Long, Ian
                            Goodwin, Hannah Schenk, and Tre Silknitter.
                        </p>
                    </div>
                    <div className="about__imageContainer">
                        <i className="fas fa-dice"></i>
                        <i className="fas fa-dice-four"></i>
                    </div>
                </section>
            </div>
        </>
    );
};

export default homePage;
