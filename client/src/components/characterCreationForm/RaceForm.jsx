import React, {useState, useEffect} from 'react';
import dndApi from "./../../utils/dnd5eApi";
import { useCharacter } from '../../state/logic';
import * as ACTION from '../../state/actions';


const RaceForm = () => {
    const [raceChoices, setRaceChoices]  = useState([]);
    const [subRaceChoices, setSubRaceChoices] = useState([]);
    const { character, setCharacter, details, setDetails } = useCharacter();
    

    useEffect(() => {
        dndApi.getRaces()
        .then((response) => setRaceChoices(response.data.results))
        .catch(err => console.log(err))
    }, []);


    const pickRace = (chosenRaceInfo) => {
        dndApi.getMoreInfo(chosenRaceInfo.url)
        .then((response) => {
            /*
                TODO: this is a good spot to format the data and send what ever we need to the global state
            */
           setDetails(response.data);
           //console.log(response.data);
            setSubRaceChoices(response.data.subraces);
        })
        .catch(err => console.log(err))
    }

    const pickSubRace = (chosenSubRaceInfo) => {
        console.log(chosenSubRaceInfo)
        /*
            TODO: do a fetch again about the subrace and save more data to state
        */
    }

    //note: having a form here is kind of useless but for the sake of being semantic
    return (
        <>
            <form>
                <p>Pick a Race: </p>
                {
                    raceChoices.map((raceContent) => 
                        <React.Fragment key={`${raceContent.index}`}>
                            <label htmlFor="race">{raceContent.name}</label>
                            <input 
                                type="radio" 
                                name="race"
                                id="race"
                                value={raceContent.index}
                                onClick={() => pickRace(raceContent)}
                            /><br/>
                        </React.Fragment>
                    )
                }
            </form>
            <hr/>
            <form>
                <p>Pick a SubRace: </p>
                {
                    (subRaceChoices.length > 0) ? 
                        subRaceChoices.map((subRaceContent) => 
                            <React.Fragment key={`${subRaceContent.index}`}>
                                <label htmlFor="subRace">{subRaceContent.name}</label>
                                <input 
                                    type="radio" 
                                    name="subRace"
                                    id="race"
                                    value={subRaceContent.index}
                                    onClick={() => pickSubRace(subRaceContent)}
                                /><br/>
                            </React.Fragment>
                        ) : 
                        <p> No Subraces</p>
                }
            </form>

        </>
    );
};

export default RaceForm;