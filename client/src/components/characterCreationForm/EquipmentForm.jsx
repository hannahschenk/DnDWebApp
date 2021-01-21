import React, {useState, useEffect} from 'react';
import dndApi from "./../../utils/dnd5eApi";

const RaceForm = () => {
    /* DUMMY; info that will come from the global state*/
    const [initialEquipment, setInitialEquipment] = useState([]);
    /* end dummy*/

    const [equipmentChoices, setEquipmentChoices]  = useState([]);
    //const [subRaceChoices, setSubRaceChoices] = useState([]);

    useEffect(() => {
        dndApi.getEquipment("druid")
        .then((response) => {
            setInitialEquipment(response.data.starting_equipment);
            //setEquipmentChoices(response.data.results)
        })
        .catch(err => console.log(err))
    }, []);


    const pickRace = (chosenRaceInfo) => {
        dndApi.getMoreInfo(chosenRaceInfo.url)
        .then((response) => {
            /*
                TODO: this is a good spot to format the data and send what ever we need to the global state
            */
            setSubRaceChoices(response.data.subraces)
        })
        .catch(err => console.log(err))
    }

    const pickSubRace = (chosenSubRaceInfo) => {
        console.log(chosenSubRaceInfo)
        /*
            TODO: do a fetch again about the subrace and save more data to state
        */
    }
    var startingEquipmentA = [];
    var startingEquipmentB = [];

    const getEquipmentPacks = (equipment) => {
        for(var i = 0; i < equipment.starting_equipment_options.length; i++) {
            console.log()
        }
        // for(var i = 0; i < equipment.starting_equipment_options.length; i++) {
        //     for (var ii = 0; ii < equipment.starting_equipment_options[i].from.length; ii++) {
        //         if(i == 0) {
        //             startingEquipmentA[ii] = equipment.starting_equipment_options[i].from[ii].equipment.name;
        //         }
        //         else {
        //             startingEquipmentB[ii] = equipment.starting_equipment_options[i].from[ii].equipment.name;
        //         }
        //     }
        // }
    };
    

    //note: having a form here is kind of useless but for the sake of being semantic
    return (
            <form>
                <p>
                    {
                        initialEquipment.map( (initialEquipmentContent) => 
                            <p> {initialEquipmentContent.equipment.name} </p>
                        )
                        
                    }
                </p>


                <p>Pick your starting equipment: </p>
                <button onClick={()=>getEquipmentPacks(equipmentChoices)}>test</button>
                {
                    equipmentChoices.map((equipmentContent) => 
                        <React.Fragment key={`${equipmentContent.index}`}>
                            <label htmlFor="class">{classContent.name}</label>
                            <select name = "class">
                            <React.Fragment key={`${equipmentContent.index}`}>
                                <option>
                                    
                                    value = {equipmentContent.starting_equipment_options.form}
                                </option>
                            </React.Fragment>
                            </select>
                            <input 
                                type="radio" 
                                name="class"
                                id="class"
                                value={classContent.index}
                                onClick={() => pickClass(classContent)}
                            /><br/>
                        </React.Fragment>
                    )
                }
            </form>
    );
};

export default RaceForm;