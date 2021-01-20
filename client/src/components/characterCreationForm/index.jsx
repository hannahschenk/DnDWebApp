import React from 'react';
import RaceForm from "./RaceForm";

const characterCreationForm = ({currentSectionIdx}) => {

    const formGenerator = () => {
        switch(currentSectionIdx){
            case 0: 
                return <RaceForm/>
        }
    }

    return (
        <>
            {formGenerator()}
        </>
    );
};

export default characterCreationForm;