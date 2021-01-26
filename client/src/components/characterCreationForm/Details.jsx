<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import { useCharacter } from '../../state/logic';

const Details = () => {
    // Access state and set state function from the context with this custom hook
    //const [details, setDetails] = useState();
    const { details, setDetails } = useCharacter();
    const [oldCharacter, setOldCharacter] = useState();

    const createDetails = () => {
        let elements = [];

        const dealObject = (newObject) => {
            Object.entries(newObject).map(([key, value]) => {
                console.log(key);
                if(key !== 'index' && key !== 'url' && typeof key === 'number') {
                    elements.push(<h4>{key.replace('_', ' ')}</h4>);
                
                }
                if (typeof value === 'object') {
                    dealObject(value);
                } else if (Array.isArray(value)) {
                    dealArray(value);
                } else {
                    if (key !== 'index' && key !== 'url') {
                        elements.push(
                            <>
                                {/* <h3>{key.replace('_', 's')}</h3> */}
                                <p>{value}</p>
                            </>
                        );
                    }
                }
            });
        };

        const dealArray = (newArray) => {
            for (let i = 0; i < newArray; i++) {
                if (typeof newArray === 'object') {
                    dealObject(newArray);
                } else if (Array.isArray(newArray)) {
                    dealArray(newArray);
                } else {
                    elements.push(
                        <>
                            <h3>{key}</h3>
                            <p>{value}</p>
                        </>
                    );
                }
            }
        };

        Object.entries(details).map(([key, value]) => {
            if(key !== 'index' && key !== 'url') {
                elements.push(<h3>{key.replace('_', ' ')}</h3>);
            }
            
            if (typeof value === 'object') {
                dealObject(value);
            } else if (Array.isArray(value)) {
                dealArray(value);
            } else {
                if (key !== 'index' && key !== 'url') {
                    elements.push(
                        <>
                            {/* <h3>{key.replace('_', ' ')}</h3> */}
                            <p>{value}</p>
                        </>
                    );
                }
            }
        });
        return elements;
    };

    useEffect(() => {
        console.log(details);
    }, [details]);

    return <>{details && createDetails()}</>;
=======
import React from 'react';


const Details = () => {
    // Access state and set state function from the context with this custom hook
    

    return (
        <>
            <h2>Acolyte</h2>
            <p>You have spent your life in the service of a temple to a specific god or pantheon of gods. 
                You act as an intermediary between the realm of the holy and the mortal world, performing 
                sacred rites and offering sacrifices in order to conduct worshipers into the presence of the divine. 
                You are not necessarily a cleric-performing sacred rites is not the same thing as channeling divine power.</p>
            <h3>Skill Proficiencies:</h3> <p>Insight, Religion</p>
            <h3>Languages:</h3> <p>Two of your choice</p>
            <h3>Equipment:</h3> <p>A holy symbol (a gift to you when you entered the priesthood), a prayer book or prayer wheel, 5 sticks of incense, vestments, a set of common clothes, and a puch containing 15 gp.</p>
            
        </>
    );
>>>>>>> e23423b376c64a341ac60964d2226e831daba385
};

export default Details;
