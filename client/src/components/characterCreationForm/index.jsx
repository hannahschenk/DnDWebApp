import React from 'react';
import RaceForm from "./RaceForm";
import ClassForm from "./ClassForm";

const characterCreationForm = ({currentSectionIdx}) => {

    const formGenerator = () => {
        switch(currentSectionIdx){
            case 0: 
                return <RaceForm/>
            case 1: 
                return <ClassForm/>
        }
    }

    return (
        <>
            {formGenerator()}
        </>
    );
};

export default characterCreationForm;