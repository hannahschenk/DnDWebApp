import React, { useEffect } from 'react';
import { useCharacter } from '../../state/logic';
import shortid from 'shortid';

const Details = () => {
    // Access state and set state function from the context with this custom hook
    const { details } = useCharacter();

    // Generate keys for React
    const keyGen = () => shortid.generate();

    // Does not render objects that have these key names, stored in conditions
    const conditions = [
        'index',
        'id',
        'url',
        'spells',
        'choose',
        'type',
        'starting_equipment',
        'class_levels',
        'race',
        'subclasses',
        'subraces',
        'language_choices',
        'skill-proficiencies',
        'starting_proficiencies',
    ];
    const keyMatch = (key) => !conditions.some((el) => key.includes(el));

    // Format JSON key names to have a capital first letter of any word, and replace _ or - with spaces
    const keyFormat = (key) => key.replace(/_|-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

    // The magic
    const createDetails = () => {
        let elements = [];

        const dealObject = (newObject) => {
            Object.entries(newObject).map(([key, value]) => {
                if (keyMatch(key) && typeof key === 'number') {
                    elements.push(<h4 key={keyGen()}>{keyFormat(key)}</h4>);
                }
                if (typeof value === 'object') {
                    dealObject(value);
                } else if (Array.isArray(value)) {
                    dealArray(value);
                } else {
                    if (keyMatch(key)) {
                        elements.push(
                            <React.Fragment key={keyGen()}>
                                {/* <h3>{key.replace('_', 's')}</h3> */}
                                <p>{value}</p>
                            </React.Fragment>
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
                        <React.Fragment key={keyGen()}>
                            <h3>{key}</h3>
                            <p>{value}</p>
                        </React.Fragment>
                    );
                }
            }
        };

        Object.entries(details).map(([key, value]) => {
            if (keyMatch(key)) {
                elements.push(<h3 key={keyGen()}>{keyFormat(key)}</h3>);
            }
            if (typeof value === 'object') {
                if(keyMatch(key)){
                    dealObject(value);
                }
            } else if (Array.isArray(value)) {
                dealArray(value);
            } else {
                if (keyMatch(key)) {
                    elements.push(
                        <React.Fragment key={keyGen()}>
                            {/* <h3>{key.replace('_', ' ')}</h3> */}
                            <p>{value}</p>
                        </React.Fragment>
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
