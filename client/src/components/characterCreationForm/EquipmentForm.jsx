import React, {useState, useEffect} from 'react';
import { characterReducer } from '../../state/logic';
import dndApi from "./../../utils/dnd5eApi";

import * as ACTION from '../../state/actions';
import { useCharacter } from '../../state/logic';
import axios from 'axios';
const EquipmentForm = () => {
    // DUMMY; info that will come from the global state
    const [initialEquipment, setInitialEquipment] = useState([]);
    const [totalChoices, setChoices] = useState({wrap:[]});
    const [backgroundEquipment, setBackgroundEquipment] = useState([]);


    const { character, setCharacter, setDetails } = useCharacter();


    //helper function
    const determineEquipmentType = (equipmentCat) => {
        if(equipmentCat.includes("weapon"))
            return "weapons"
        if(equipmentCat.includes("armor"))
            return "armor"
        if(equipmentCat.includes("tools"))
            return "tools"
        return "misc"
    }
    const addEquipmentChoice = async (index, option) => {
        if(option.hasOwnProperty('equipment')){

            let equipmentCat = (await dndApi.getMoreInfo(option.equipment.url)).data.equipment_category.index;
            
            totalChoices.wrap[index].push(
                {name: `${option.quantity} ${option.equipment.name}`, url: option.equipment.url, type: determineEquipmentType(equipmentCat)}
            )

            /*let equipmentKey = determineEquipmentType(equipmentCat);
            characterReducer.equipment[equipmentKey].push(equipmentToAdd)
            setCharacter({ type: ACTION.UPDATE_EQUIPMENT, payload: { [equipmentKey]: [...characterReducer.equipment[equipmentKey]] } });
            */
            setChoices({wrap: totalChoices.wrap})
        }
        else{
            let equipmentCat = (option.hasOwnProperty('equipment_option')) ? 
                                option.equipment_option.from.equipment_category.index : 
                                option.equipment_category.index

            let urlEndpoint = (option.hasOwnProperty('equipment_option')) ? 
                                option.equipment_option.from.equipment_category.url : 
                                option.equipment_category.url
            
            const equipmentCategory = (await dndApi.getMoreInfo(urlEndpoint)).data;
            totalChoices.wrap[index] = totalChoices.wrap[index].concat(
                (equipmentCategory.equipment).map((equipmentInfo) => {
                    return {name: `1 ${equipmentInfo.name}`, url: equipmentInfo.url, type: determineEquipmentType(equipmentCat)}
                })
            )

            setChoices({wrap: totalChoices.wrap})
        }
    }

    useEffect( async () => {

        //BACKGROUND EQUIPMENT INTIIAL----------------------------------------------------
        //will be changed to id of user selected background
        //dndApi.getBackground(0)
        axios(character.background.url)
        .then((response) => {
            let backgroundEquipments = response.data["misc-equipments"].map((content) => {
                return { name: content, url: null, type: "misc"}
            })
            if(character.equipment.total.length > 0){
                character.equipment.total = (character.equipment.total).concat(backgroundEquipments)
            }
            else{
                character.equipment.total = backgroundEquipments
            }
            setCharacter({ type: ACTION.UPDATE_EQUIPMENT, payload: { total: [...character.equipment.total] } })
            setBackgroundEquipment(response.data["misc-equipments"])
        })

        //CLASS EQUIPMENT INTIIAL----------------------------------------------------
        //will be changed to user choice
        let equipmentEndPoint = (await dndApi.getMoreInfo(character.class.url)).data.starting_equipment
        //let classEquipment = (await dndApi.getStartingEquipment("barbarian")).data
        //let classEquipment = (await dndApi.getMoreInfo(equipmentEndPoint)).data
        const equipmentObj = (await dndApi.getMoreInfo(equipmentEndPoint)).data
        setInitialEquipment(equipmentObj.starting_equipment);
        let initialEquipments = equipmentObj.starting_equipment
        for(let i = 0; i < initialEquipments.length; i++){
            let equipmentCat = (await dndApi.getMoreInfo(initialEquipments[i].equipment.url)).data.equipment_category.index;
            character.equipment.total.push({ name: `${initialEquipments[i].quantity} ${initialEquipments[i].equipment.name}`, 
                                            url: initialEquipments[i].equipment.url, type: determineEquipmentType(equipmentCat)}) 
            setCharacter({ type: ACTION.UPDATE_EQUIPMENT, payload: { total: [...character.equipment.total] } })
        }
            

        //const equipmentObj = (await dndApi.getStartingEquipment("fighter")).data;
        let allChoiceGroups = equipmentObj.starting_equipment_options
        for(let i = 0; i < allChoiceGroups.length; i++){
            (totalChoices.wrap).push([])
            setChoices({wrap: totalChoices.wrap})

            let optionsInGroup = allChoiceGroups[i].from
            for(let a = 0; a < optionsInGroup.length; a++){
                if(optionsInGroup[a].hasOwnProperty('0')){
                    for (const key in optionsInGroup[a]){
                        addEquipmentChoice(i, optionsInGroup[a][key])
                    }
                }
                else {
                    addEquipmentChoice(i, optionsInGroup[a])
                }
            }
            
        }
        
    }, []);

    useEffect(() => {console.log(totalChoices)}, [totalChoices])
    
    const pickEquipment = (e) => {
        let indexOffset = parseInt(e.target.id);
        let indexToEdit = (initialEquipment.length + backgroundEquipment.length) + indexOffset
        let equipmentToAdd = JSON.parse(e.target.value);
        if(character.equipment.total.length == indexToEdit){
            character.equipment.total.push(equipmentToAdd) 
        }
        else{
            character.equipment.total[indexToEdit] = equipmentToAdd
        }
        setCharacter({ type: ACTION.UPDATE_EQUIPMENT, payload: { total: [...character.equipment.total] } })
    }

    //note: having a form here is kind of useless but for the sake of being semantic
    return (
            <form>
                <h3>Class Equipment</h3>
                {
                    initialEquipment.map( (initialEquipmentContent, idx) => 
                        <p key={idx}> {initialEquipmentContent.equipment.name + " x" + initialEquipmentContent.quantity} </p>
                    )
                }
                <h3>Background Equipment</h3>
                {
                    backgroundEquipment.map((backgroundEquipmentContent, idx) =>
                        <p key={idx}>{backgroundEquipmentContent}</p>
                    )
                }
                <p>Pick your starting equipment: </p>
                {
                    totalChoices.wrap.map((equipmentContent, idx) => 
                        <React.Fragment key={idx}>
                            <label htmlFor="equipmentChoices">Pick one</label>
                            <select name={`equipmentChoices-${idx}`} key={idx} id={idx} onChange={(e) => pickEquipment(e)} defaultValue={-1}>
                                {/*createOptions()*/}
                                <option value={-1} disabled>no assignment</option>
                                {
                                    equipmentContent.map((groupChoice, index) => 
                                        <option key={index} value={JSON.stringify(groupChoice)}>{groupChoice.name}</option>
                                    )
                                
                                }
                            </select>
                        </React.Fragment>
                    )
                }
            </form>
    );
};

export default EquipmentForm;