import React, {useState, useEffect} from 'react';
import CharacterSheetCard from "./../../components/characterSheetCard";
import {useAuth0, withAuthenticationRequired} from "@auth0/auth0-react";
import utilFunctions from "./../../utils/utilFunctions";
const DashboardPage = () => {

    const {isAuthenticated, user} = useAuth0();

    let userName = isAuthenticated ? utilFunctions.truncate(user.name, 20) : "";
    let userEmail = isAuthenticated ? utilFunctions.truncate(user.email, 20) : "";

    /* dummy character sheet data*/
    let characterSheets = [
        {
            name: "name1",
            race: "race1",
            class: "class1"
        },
        {
            name: "name2",
            race: "race2",
            class: "class2"
        },
        {
            name: "name3",
            race: "race3",
            class: "class3"
        },

    ]
    /* end dummy character sheet data*/

    /* 
    NOTE: truncate the user info if too long 
    */

    return (
        <main className="dashboardMain">
            <section className="dashBoard__profile">
                {/* I'll leave this section if we want to render anything about the user*/}
                <img className="profile__image" src={user.picture}/>
                <article className = "profile__details">
                    <h4 className="profile__details__title">User Profile</h4>
                    <ul className="profile__details__listContainer">
                        <li className="listItem">
                            <p id="userName"> 
                                <b className="listItem--label">Name: </b>
                                <br/>
                                {userName}
                            </p>
                        </li>
                        <li className="listItem">
                            <p id="userEmail"> 
                                <b className="listItem--label">Email: </b>
                                <br/>
                                {userEmail}
                            </p>
                        </li>
                        <li className="listItem">
                            <p id="numOfCharSheets"> 
                                <b className="listItem--label">Number of Characters: </b>
                                <br/>
                                3 characters
                            </p>
                        </li>
                    </ul>
                </article>
            </section>
            <section className="characterCardContainer">
                {/*this is where character sheet cards will be rendered*/}
                {   
                    characterSheets.map((characterSheet, idx) => (
                        <CharacterSheetCard key={idx} characterSheet={characterSheet}/>
                    ))
                }
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. 
                Dolore quae possimus harum commodi dignissimos tenetur veritatis nam eos? 
                Ratione eos ullam dolor facilis distinctio neque repellat praesentium, eaque quis temporibus?

                Lorem, ipsum dolor sit amet consectetur adipisicing elit. 
                Dolore quae possimus harum commodi dignissimos tenetur veritatis nam eos? 
                Ratione eos ullam dolor facilis distinctio neque repellat praesentium, eaque quis temporibus?

                Lorem, ipsum dolor sit amet consectetur adipisicing elit. 
                Dolore quae possimus harum commodi dignissimos tenetur veritatis nam eos? 
                Ratione eos ullam dolor facilis distinctio neque repellat praesentium, eaque quis temporibus?

                Lorem, ipsum dolor sit amet consectetur adipisicing elit. 
                Dolore quae possimus harum commodi dignissimos tenetur veritatis nam eos? 
                Ratione eos ullam dolor facilis distinctio neque repellat praesentium, eaque quis temporibus?

                Lorem, ipsum dolor sit amet consectetur adipisicing elit. 
                Dolore quae possimus harum commodi dignissimos tenetur veritatis nam eos? 
                Ratione eos ullam dolor facilis distinctio neque repellat praesentium, eaque quis temporibus?

                Lorem, ipsum dolor sit amet consectetur adipisicing elit. 
                Dolore quae possimus harum commodi dignissimos tenetur veritatis nam eos? 
                Ratione eos ullam dolor facilis distinctio neque repellat praesentium, eaque quis temporibus?

                Lorem, ipsum dolor sit amet consectetur adipisicing elit. 
                Dolore quae possimus harum commodi dignissimos tenetur veritatis nam eos? 
                Ratione eos ullam dolor facilis distinctio neque repellat praesentium, eaque quis temporibus?


                Lorem, ipsum dolor sit amet consectetur adipisicing elit. 
                Dolore quae possimus harum commodi dignissimos tenetur veritatis nam eos? 
                Ratione eos ullam dolor facilis distinctio neque repellat praesentium, eaque quis temporibus?

                Lorem, ipsum dolor sit amet consectetur adipisicing elit. 
                Dolore quae possimus harum commodi dignissimos tenetur veritatis nam eos? 
                Ratione eos ullam dolor facilis distinctio neque repellat praesentium, eaque quis temporibus?
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. 
                Dolore quae possimus harum commodi dignissimos tenetur veritatis nam eos? 
                Ratione eos ullam dolor facilis distinctio neque repellat praesentium, eaque quis temporibus?
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. 
                Dolore quae possimus harum commodi dignissimos tenetur veritatis nam eos? 
                Ratione eos ullam dolor facilis distinctio neque repellat praesentium, eaque quis temporibus?

                Lorem, ipsum dolor sit amet consectetur adipisicing elit. 
                Dolore quae possimus harum commodi dignissimos tenetur veritatis nam eos? 
                Ratione eos ullam dolor facilis distinctio neque repellat praesentium, eaque quis temporibus?

                Lorem, ipsum dolor sit amet consectetur adipisicing elit. 
                Dolore quae possimus harum commodi dignissimos tenetur veritatis nam eos? 
                Ratione eos ullam dolor facilis distinctio neque repellat praesentium, eaque quis temporibus?

                Lorem, ipsum dolor sit amet consectetur adipisicing elit. 
                Dolore quae possimus harum commodi dignissimos tenetur veritatis nam eos? 
                Ratione eos ullam dolor facilis distinctio neque repellat praesentium, eaque quis temporibus?

                Lorem, ipsum dolor sit amet consectetur adipisicing elit. 
                Dolore quae possimus harum commodi dignissimos tenetur veritatis nam eos? 
                Ratione eos ullam dolor facilis distinctio neque repellat praesentium, eaque quis temporibus?

                Lorem, ipsum dolor sit amet consectetur adipisicing elit. 
                Dolore quae possimus harum commodi dignissimos tenetur veritatis nam eos? 
                Ratione eos ullam dolor facilis distinctio neque repellat praesentium, eaque quis temporibus?

                Lorem, ipsum dolor sit amet consectetur adipisicing elit. 
                Dolore quae possimus harum commodi dignissimos tenetur veritatis nam eos? 
                Ratione eos ullam dolor facilis distinctio neque repellat praesentium, eaque quis temporibus?


                Lorem, ipsum dolor sit amet consectetur adipisicing elit. 
                Dolore quae possimus harum commodi dignissimos tenetur veritatis nam eos? 
                Ratione eos ullam dolor facilis distinctio neque repellat praesentium, eaque quis temporibus?

                Lorem, ipsum dolor sit amet consectetur adipisicing elit. 
                Dolore quae possimus harum commodi dignissimos tenetur veritatis nam eos? 
                Ratione eos ullam dolor facilis distinctio neque repellat praesentium, eaque quis temporibus?
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. 
                Dolore quae possimus harum commodi dignissimos tenetur veritatis nam eos? 
                Ratione eos ullam dolor facilis distinctio neque repellat praesentium, eaque quis temporibus?
            </section>

        </main>
    );
};

export default withAuthenticationRequired(DashboardPage);