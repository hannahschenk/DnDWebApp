import React from 'react';
import RaceForm from "./RaceForm";
import ClassForm from "./ClassForm";
import AbilityScoresForm from "./AbilityScoresForm";

const characterCreationForm = ({sectionIndex, formDetailsState}) => {
    const formGenerator = () => {
        switch(sectionIndex){
            case 0: 
                return <RaceForm formDetailsState={formDetailsState}/>
            case 1: 
                return <ClassForm formDetailsState={formDetailsState}/>
            case 2: 
                return <AbilityScoresForm formDetailsState={formDetailsState}/>
        }
    }
    return (
        <>
            {formGenerator()}
        </>
    );
};

export default characterCreationForm;