import React, {useState, useEffect} from 'react';
import CharacterSheetCard from "./../../components/characterSheetCard";
import {useAuth0, withAuthenticationRequired} from "@auth0/auth0-react";
import utilFunctions from "./../../utils/utilFunctions";
import {getCharacters} from "./../../utils/api";
const DashboardPage = () => {
    const {isAuthenticated, user, getAccessTokenSilently} = useAuth0();
    let userName = isAuthenticated ? utilFunctions.truncate(user.name, 20) : "";
    let userEmail = isAuthenticated ? utilFunctions.truncate(user.email, 20) : "";
    let [userSheets, setUserSheets] = useState([])

    /*
    * Description: get all the character sheets associated to the user
    */
    useEffect(async () => {
        try{
            if(isAuthenticated){
                const token = await getAccessTokenSilently();
                let userSheets = (await getCharacters(token)).data
                setUserSheets([...userSheets])
            }
        } catch (e){
            console.error(e);
        }
    }, [])

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
                                {userSheets.length} characters
                            </p>
                        </li>
                    </ul>
                </article>
            </section>
            <section className="characterCardContainer">
                {/*this is where character sheet cards will be rendered*/}
                <div className="card-container">
                {   
                    userSheets.map((characterSheet, idx) => 
                        <CharacterSheetCard key={idx} characterSheet={characterSheet} sheetId={characterSheet.id}/>
                    )
                }
                </div>
            </section>

        </main>
    );
};

export default withAuthenticationRequired(DashboardPage);