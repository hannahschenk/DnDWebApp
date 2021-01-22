import React, {useState, useEffect} from 'react';
import dndApi from "./../../utils/dnd5eApi";

const RaceForm = () => {
    // DUMMY; info that will come from the global state
    const [initialEquipment, setInitialEquipment] = useState([]);
    const [totalChoices, setChoices] = useState({wrap:[]});
    const [backgroundEquipment, setBackgroundEquipment] = useState([]);

    useEffect(() => {
        //will be changed to id of user selected background
        dndApi.getBackground(0)
        .then((response) => {
            setBackgroundEquipment(response.data["misc-equipments"])
        })
        //will be changed to user choice
        dndApi.getStartingEquipment("fighter")
        .then((response) => {
            setInitialEquipment(response.data.starting_equipment);
        })
        .catch(err => console.log(err))
        dndApi.getStartingEquipment("fighter")
            .then(response => {
                let data = response.data;
                let allChoiceGroups = data.starting_equipment_options
                for(let i = 0; i < allChoiceGroups.length; i++){
                    (totalChoices.wrap).push([])
                    setChoices({wrap: totalChoices.wrap})
                    //i is the outer index 
                    let optionsInGroup = allChoiceGroups[i].from
                    for(let a = 0; a < optionsInGroup.length; a++){
                    //a is the inner index
                        if (optionsInGroup[a].hasOwnProperty('equipment')){
                            totalChoices.wrap[i].push(optionsInGroup[a].equipment)
                            totalChoices.wrap[i][a]["quantity"] = optionsInGroup[a].quantity;
                            setChoices({wrap: totalChoices.wrap})
                        }
                        //some classes allow multiple items with one choice, ie crossbow and bolts
                        //TODO: does not display 
                        else if(optionsInGroup[a].hasOwnProperty('0') || optionsInGroup[a].hasOwnProperty('1') || optionsInGroup[a].hasOwnProperty('2')) {
                            totalChoices.wrap[i].push(optionsInGroup[a]);
                        }
                        else {
                            let urlEndpoint = (optionsInGroup[a].hasOwnProperty('equipment_option')) ? 
                                optionsInGroup[a].equipment_option.from.equipment_category.url : 
                                optionsInGroup[a].equipment_category.url
                            fetch("https://www.dnd5eapi.co" + urlEndpoint)
                            .then(response => response.json())
                            .then(data => {
                                
                                totalChoices.wrap[i] = totalChoices.wrap[i].concat(data.equipment)
                                for (let ii = 0; ii < data.equipment.length; ii++) {
                                    totalChoices.wrap[i][ii +1]["quantity"] = allChoiceGroups[i].choose;
                                }
                                setChoices({wrap: totalChoices.wrap})
                            })
                        }
                    }
                }
            });
    }, []);

    const pickEquipment = (chosenEquipmentInfo) => {
        dndApi.getMoreInfo(chosenEquipmentInfo.url)
        .then((response) => {
            /*
                TODO: this is a good spot to format the data and send what ever we need to the global state
            */
        })
        .catch(err => console.log(err))
    };
    
    //index needs to be outside of function, equipment array does not update fast enough to get length
    let index = 0;
    const createOptions = () => {
        let options = [];
            for (let i = 0; i < totalChoices.wrap[index].length; i++) {
                //TODO: display multiple items for one option
                if (totalChoices.wrap[index][i].quantity > 1) {
                    options.push(<option key = {i} value = {i}>{totalChoices.wrap[index][i].name + " x" + totalChoices.wrap[index][i].quantity}</option>);
                }
                else {
                    options.push(<option key = {i} value = {i}>{totalChoices.wrap[index][i].name}</option>);
                }
                
            }
        index++;
        return options;
    }

    //note: having a form here is kind of useless but for the sake of being semantic
    return (
            <form>
                <h3>Class Equipment</h3>
                {
                    initialEquipment.map( (initialEquipmentContent) => 
                        <p> {initialEquipmentContent.equipment.name + " x" + initialEquipmentContent.quantity} </p>
                    )
                }
                <h3>Background Equipment</h3>
                {
                    backgroundEquipment.map((backgroundEquipmentContent) =>
                        <p>{backgroundEquipmentContent}</p>
                    )
                }
                <p>Pick your starting equipment: </p>
                {
                    totalChoices.wrap.map((equipmentContent) => 
                        <React.Fragment key={`${equipmentContent.index}`}>
                            <label htmlFor="equipmentChoices">Pick one</label>
                            <select name = "equipmentChoices">
                                {createOptions()}
                            </select>
                        </React.Fragment>
                    )
                }
            </form>
    );
};

export default RaceForm;