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
                //console.log(key);
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
        //console.log(details);
    }, [details]);

    return <>{details && createDetails()}</>;
};

export default Details;
