import React from 'react';
import RaceForm from './RaceForm';
import ClassForm from './ClassForm';
import CharacterDetailsForm from './CharacterDetailsForm';

const characterCreationForm = ({ currentSectionIdx }) => {
    const formGenerator = () => {
        switch (currentSectionIdx) {
            case 0:
                return <RaceForm />;
            case 1:
                return <ClassForm />;
            case 3:
                return <CharacterDetailsForm />;
        }
    };

    return <>{formGenerator()}</>;
};

export default characterCreationForm;
