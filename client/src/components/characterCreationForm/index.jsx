import React from 'react';

import RaceForm from './RaceForm';
import ClassForm from './ClassForm';
import AbilityScoresForm from './AbilityScoresForm';
import CharacterDetailsForm from './CharacterDetailsForm';
<<<<<<< HEAD
import ProficienciesForm from './ProficienciesForm';
=======
import EquipmentForm from './EquipmentForm';
import ProficienciesForm from './proficienciesForm/index';
>>>>>>> 81149a80e997d95cfb5b910ad72ddd9ffce54b23

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
<<<<<<< HEAD
=======
            case 5:
                return <EquipmentForm/>;
>>>>>>> 81149a80e997d95cfb5b910ad72ddd9ffce54b23
        }
    };

    return <>{formGenerator()}</>;
};

export default characterCreationForm;
