import React from 'react';

import RaceForm from './RaceForm';
import ClassForm from './ClassForm';
import AbilityScoresForm from './AbilityScoresForm';
import CharacterDetailsForm from './CharacterDetailsForm';
import ProficienciesForm from './ProficienciesForm';

const characterCreationForm = ({ currentSectionIdx }) => {
    const formGenerator = () => {
        switch (currentSectionIdx) {
            case 0:
                return <RaceForm />;
            case 1:
                return <ClassForm />;
            case 2:
                return <AbilityScoresForm />;
            case 3:
                return <CharacterDetailsForm />;
            case 4:
                return <ProficienciesForm />;
        }
    };

    return <>{formGenerator()}</>;
};

export default characterCreationForm;
