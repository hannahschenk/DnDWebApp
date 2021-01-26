import React, {useState, useEffect, useContext} from 'react';
import { characterReducer } from '../../state/logic';
import dndApi from "./../../utils/dnd5eApi";

import * as ACTION from '../../state/actions';
import { useCharacter } from '../../state/logic';
import axios from 'axios';
import FormControlContext from "./../../state/formControlManager";
const EquipmentForm = () => {
    const [initialEquipment, setInitialEquipment] = useState([]);
    const [totalChoices, setChoices] = useState({wrap:[]});
    const [backgroundEquipment, setBackgroundEquipment] = useState([]);
    const { character, setCharacter, details, setDetails } = useCharacter();
    const {formControlState, setFormControlState} = useContext(FormControlContext);
    /*
    * Signature: useEffect(func, [])
    * Description: Fetches all initial equipments from background
    *               and race; get all choices for equipments
    */
    useEffect( async () => {
        // getting equipment from background------------------------------------------------------
        let bkEquipmentsRaw = ((await dndApi.getBackground(character.background.url)).data["misc-equipments"])
        let backgroundEquipments = bkEquipmentsRaw.map((content) => {
            return { 
                name: content, 
                url: null, 
                type: "misc"
            }  
        });
        character.equipment.total = (character.equipment.total.length > 0) ? 
            (character.equipment.total).concat(backgroundEquipments) :
            backgroundEquipments

        setCharacter({ type: ACTION.UPDATE_EQUIPMENT, payload: { total: [...character.equipment.total] } })
        setBackgroundEquipment(bkEquipmentsRaw)

        //getting initial equipment from race-------------------------------------------------------
        let equipmentEndPoint = (await dndApi.getMoreInfo(character.class.url)).data.starting_equipment
        const equipmentObj = (await dndApi.getMoreInfo(equipmentEndPoint)).data

        setInitialEquipment(equipmentObj.starting_equipment);
        let initialEquipments = equipmentObj.starting_equipment
        for(let i = 0; i < initialEquipments.length; i++){
            let equipmentCat = (await dndApi.getMoreInfo(initialEquipments[i].equipment.url)).data.equipment_category.index;
            
            character.equipment.total.push({ 
                name: `${initialEquipments[i].equipment.name} (${initialEquipments[i].quantity})`, 
                url: initialEquipments[i].equipment.url, 
                type: determineEquipmentType(equipmentCat)}) 

            setCharacter({ type: ACTION.UPDATE_EQUIPMENT, payload: { total: [...character.equipment.total] } })
        }
            
        //getting the equipment choices-----------------------------------------------------------------
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

    /*
    * Signature: useEffect(func, [character])
    * Description: watch for character changes on equipment to determine if the 
    *              user can move on to the next section via the formControlState
    */
    useEffect(() => {
        if(character.equipment.total.length == (initialEquipment.length + 
        backgroundEquipment.length + totalChoices.wrap.length)){
            setFormControlState({...formControlState, currentFormDone: true})
        }
        else{
            setFormControlState({...formControlState, currentFormDone: false})
        }
    }, [character])

    /*
    * Signature: determineEquipmentType(equipmentCat)
    * Input: equipmentCat - the category name of the weapon
    * Description: get a equipment type value based off of the 
    *               category name in the api
    */
    const determineEquipmentType = (equipmentCat) => {
        if(equipmentCat.includes("weapon"))
            return "weapons"
        if(equipmentCat.includes("armor"))
            return "armor"
        if(equipmentCat.includes("tools"))
            return "tools"
        return "misc"
    }

    /*
    * Signature: addEquipmentChoice(index, option)
    * Input: index - the index (outer array) to add the choice in
    *        option - the big option object we need to simplify
    * Description: helper function to add a correctly formatted 
    *               choice object to totalChoices
    */
    const addEquipmentChoice = async (index, option) => {
        if(option.hasOwnProperty('equipment')){
            let equipmentCat = (await dndApi.getMoreInfo(option.equipment.url)).data.equipment_category.index;
            
            totalChoices.wrap[index].push({
                name: `${option.equipment.name} (${option.quantity})`, 
                url: option.equipment.url, 
                type: determineEquipmentType(equipmentCat)
            })

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
                    return {
                        name: `${equipmentInfo.name} (1)`, 
                        url: equipmentInfo.url, 
                        type: determineEquipmentType(equipmentCat)}
                })
            )

            setChoices({wrap: totalChoices.wrap})
        }
    }
    
    /*
    * Signature: pickEquipment(e)
    * Input: e - the change event
    * Description: adds/replace an equipment in the character state
    */
    const pickEquipment = async (e) => {
        let indexOffset = parseInt(e.target.id);
        let indexToEdit = (initialEquipment.length + backgroundEquipment.length) + indexOffset
        let equipmentToAdd = JSON.parse(e.target.value);
        if(character.equipment.total.length == indexToEdit){
            character.equipment.total.push(equipmentToAdd) 
        }
        else{
            character.equipment.total[indexToEdit] = equipmentToAdd
        }
        setCharacter({ 
            type: ACTION.UPDATE_EQUIPMENT, 
            payload: { 
                total: [...character.equipment.total] 
            } 
        })
        setDetails((await dndApi.getMoreInfo(equipmentToAdd.url)).data.results)
    }

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