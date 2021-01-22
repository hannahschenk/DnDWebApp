import React, {useState, useEffect} from 'react';
import dndApi from "./../../utils/dnd5eApi";

const RaceForm = () => {
    // DUMMY; info that will come from the global state
    const [initialEquipment, setInitialEquipment] = useState([]);
    const [totalChoices, setChoices] = useState({wrap:[]});

    useEffect(() => {
        //will be changed to user choice
        dndApi.getStartingEquipment("barbarian")
        .then((response) => {
            console.log(response.data.starting_equipment);
            setInitialEquipment(response.data.starting_equipment);
        })
        .catch(err => console.log(err))
        dndApi.getStartingEquipment("barbarian")
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
                            setChoices({wrap: totalChoices.wrap})
                        }
                        // if (optionsInGroup[a].hasOwnProperty('equipment_option')){
                        else {
                            let urlEndpoint = (optionsInGroup[a].hasOwnProperty('equipment_option')) ? 
                                optionsInGroup[a].equipment_option.from.equipment_category.url : 
                                optionsInGroup[a].equipment_category.url
                            fetch("https://www.dnd5eapi.co" + urlEndpoint)
                            .then(response => response.json())
                            .then(data => {
                                totalChoices.wrap[i] = totalChoices.wrap[i].concat(data.equipment)
                                setChoices({wrap: totalChoices.wrap})
                            })
                        }
                    }
                }
            });
    }, []);

    useEffect(() => {
        console.log(totalChoices);
    })


    const pickEquipment = (chosenEquipmentInfo) => {
        dndApi.getMoreInfo(chosenRaceInfo.url)
        .then((response) => {
            /*
                TODO: this is a good spot to format the data and send what ever we need to the global state
            */
            setSubRaceChoices(response.data.subraces)
        })
        .catch(err => console.log(err))
    };
    
    //needs to be outside of function, equipment array does not update fast enough to get length
    let index = 0;
    const createOptions = () => {
        let options = [];
        console.log(totalChoices.wrap.length);
            console.log(totalChoices.wrap.length);
            for (let ii = 0; ii < totalChoices.wrap[index].length; ii++) {
                options.push(<option key = {index} value = {ii}>{totalChoices.wrap[index][ii].name}</option>);
            }
            console.log(totalChoices.wrap[index].length);
        index++;
        return options;
    }
    // const createOptions = () => {
    //     let index = totalChoices.wrap.length;
    //     console.log(index);
    //     let options = [];
    //     for (let i = 0; i < index; i++) {
    //         options.push(<option key = {i} value = {i}>{totalChoices.wrap[index-1][i].name}</option>);
    //     }
    //     console.log(totalChoices.wrap[i].length);
        
    //     return options;
    // }

    //note: having a form here is kind of useless but for the sake of being semantic
    return (
            <form>
                {
                    initialEquipment.map( (initialEquipmentContent) => 
                        <p> {initialEquipmentContent.equipment.name} </p>
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