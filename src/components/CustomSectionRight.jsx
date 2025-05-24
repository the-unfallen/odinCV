import { useState } from "react";
import NewSectionLeft from "./NewSectionLeft"
import NewSectionRight from "./NewSectionRight";
import '../styles/CustomSectionLeft.css'
import CustomUnitR from "./customUnitR";

export default function CustomSectionRight() {
    // const [miniCustom, setMiniCustom] = useState({customName: ''});
    const rightCustomSectionRecord = JSON.parse(localStorage.getItem('rightCustomRecord')) || [];
    const [rightRecord, setRightRecord] = useState(rightCustomSectionRecord);
    const addCustomSection = () => {
        const newRightRecord = [
            ...rightRecord,
            {
                id: crypto.randomUUID(),
                itemState: true,
                customName: "",
                modified: false,
                cnEditState: false,
                newSectionState: true,
                sectionValues: [{id: crypto.randomUUID(), text: '', state: false }],
            },
        ];
        localStorage.setItem('rightCustomRecord', JSON.stringify(newRightRecord));
        setRightRecord(newRightRecord);
    }
    
    const removeItem = (ref_id) => {
        let indexOfRefId = -1;
        for(let i = 0; i < rightRecord.length; i++){
            if(rightRecord[i].id === ref_id){
                indexOfRefId = i;
                break;
            }
        }
        if (indexOfRefId === -1)return;
        const newRightRecord = [...rightRecord.slice(0, indexOfRefId), ...rightRecord.slice(indexOfRefId + 1)];
        localStorage.setItem('rightCustomRecord', JSON.stringify(newRightRecord));
        setRightRecord(newRightRecord);
    };

    const toggleItemState = (ref_id) => {
        const refRightRecord = [...rightRecord];
        for(let i = 0; i < refRightRecord.length; i++){
            if(refRightRecord[i].id === ref_id){
                refRightRecord[i].itemState = true;
            }else{
                refRightRecord[i].itemState = false;
            }
        }
        localStorage.setItem('rightCustomRecord', JSON.stringify(refRightRecord));
        setRightRecord(refRightRecord);
    }

    const handleCustomNameInputChange = (e) => {
        const {value} = e.target;
        const ref_id = e.target.dataset.refId;
        const refRightRecord = [...rightRecord];
        for(let i = 0; i < refRightRecord.length; i++){
            if(refRightRecord[i].id === ref_id){
                refRightRecord[i].customName = value;
                break;
            }
        }
        localStorage.setItem('rightCustomRecord', JSON.stringify(refRightRecord));
        setRightRecord(refRightRecord);
    }

    const submitCustomDetails = (ref_id) => {
        const refRightRecord = [...rightRecord];
        for(let i = 0; i < refRightRecord.length; i++){
            if(refRightRecord[i].id === ref_id){
                refRightRecord[i].modified = true;
                refRightRecord[i].itemState = false;
                refRightRecord[i].cnEditState = false;
                break;
            }
        }
        localStorage.setItem('rightCustomRecord', JSON.stringify(refRightRecord));
        setRightRecord(refRightRecord);
    }

    const setStateToFalse = (ref_id) => {
        const refRightRecord = [...rightRecord];
        for(let i = 0; i < refRightRecord.length; i++){
            if(refRightRecord[i].id === ref_id){
                refRightRecord[i].modified = true;
                refRightRecord[i].itemState = false;
                break;
            }
        }
        localStorage.setItem('rightCustomRecord', JSON.stringify(refRightRecord));
        setRightRecord(refRightRecord);
    }

    const ToggleCustomNameEditState = (ref_id) => {
        const refRightRecord = [...rightRecord];
        for(let i = 0; i < refRightRecord.length; i++){
            if(refRightRecord[i].id === ref_id){
                refRightRecord[i].cnEditState = true;
                break;
            }
        }
        localStorage.setItem('rightCustomRecord', JSON.stringify(refRightRecord));
        setRightRecord(refRightRecord);
    }

    
    

    const addNewValuesBlock = (ref_id) => {
        console.log(ref_id);
        const refRightRecord = [...rightRecord];
        const newBlock = {id: crypto.randomUUID(), text: '', state: true };
        for(let i = 0; i < refRightRecord.length; i++){
            if(refRightRecord[i].id === ref_id){
                console.log(refRightRecord[i].sectionValues);
                refRightRecord[i].sectionValues.push(newBlock);
                refRightRecord[i].modified = true;
                refRightRecord[i].itemState = true;
                break;
            }
        }
        localStorage.setItem('rightCustomRecord', JSON.stringify(refRightRecord));
        setRightRecord(refRightRecord);
    }

    const textValueChange = (e) => {
        const {value} = e.target;
        const ref_id = e.target.dataset.refId;
        const value_id = e.target.dataset.valueId;
        const refRightRecord = [...rightRecord];
        for(let i = 0; i < refRightRecord.length; i++){
            if(refRightRecord[i].id === ref_id){
                let valueBlock = refRightRecord[i].sectionValues 
                for(let j = 0; j < valueBlock.length; j++){
                    if(valueBlock[j].id === value_id){
                        refRightRecord[i].sectionValues[j].text = value;
                        break;
                    }
                }
                break;
            }
        }
        localStorage.setItem('rightCustomRecord', JSON.stringify(refRightRecord));
        setRightRecord(refRightRecord);

    }

    const miniStateToFalse = (refId, valueId) => {
        const refRightRecord = [...rightRecord];
        for(let i = 0; i < refRightRecord.length; i++){
            if(refRightRecord[i].id === refId){
                let valueBlock = refRightRecord[i].sectionValues 
                for(let j = 0; j < valueBlock.length; j++){
                    if(valueBlock[j].id === valueId){
                        refRightRecord[i].sectionValues[j].state = false;
                        break;
                    }
                }
                break;
            }
        }
        localStorage.setItem('rightCustomRecord', JSON.stringify(refRightRecord));
        setRightRecord(refRightRecord);
    }

    
    const miniStateToTrue = (refId, valueId) => {
        const refRightRecord = [...rightRecord];
        for(let i = 0; i < refRightRecord.length; i++){
            if(refRightRecord[i].id === refId){
                let valueBlock = refRightRecord[i].sectionValues 
                for(let j = 0; j < valueBlock.length; j++){
                    if(valueBlock[j].id === valueId){
                        refRightRecord[i].sectionValues[j].state = true;
                        break;
                    }
                }
                break;
            }
        }
        localStorage.setItem('rightCustomRecord', JSON.stringify(refRightRecord));
        setRightRecord(refRightRecord);
    }


    const removeMiniValue = (refId, valueId) => {
        let indexOfRefId;
        let indexOfValueId;
        const refRightRecord = [...rightRecord];
        for(let i = 0; i < refRightRecord.length; i++){
            if(refRightRecord[i].id === refId){
                indexOfRefId = i;
                break;
            }
        }
        const itemObject = refRightRecord[indexOfRefId];
        const valueArray = itemObject.sectionValues;
        for(let j = 0; j < valueArray.length; j++){
            if(valueArray[j].id === valueId){
                indexOfValueId = j;
            }
        }

        const newValueArray = [...valueArray.slice(0, indexOfValueId), ...valueArray.slice(indexOfValueId + 1)];
        refRightRecord[indexOfRefId].sectionValues = newValueArray;
        localStorage.setItem('rightCustomRecord', JSON.stringify(refRightRecord));
        setRightRecord(refRightRecord);
    }



    




    return (
        <div>
            {rightRecord.length > 0 && (
                rightRecord.map(record => {
                    let sectionTitle;
                    if (record.customName === '' || !record.customName){
                        sectionTitle = record.id.slice(4, 10);
                    }else{
                        sectionTitle = record.customName;
                    }
                    return(
                        <CustomUnitR
                            item_state={record.itemState}
                            key = {record.id}
                            item_ref={record.id}
                            MainEditStateToggle={toggleItemState}
                            removeSelf={removeItem}
                            modified={record.modified}
                            customNameValue={record.customName}
                            customName={'customName'}
                            customNameChange={handleCustomNameInputChange}
                            submitCustomDetails={submitCustomDetails}
                            setStateToFalse={setStateToFalse}
                            customUnitName={sectionTitle}
                            customNameEditState={record.cnEditState}
                            ToggleCustomNameEditState={ToggleCustomNameEditState}
                            // setValueStateToFalse={setValueStateToFalse}
                            valuesBlock={record.sectionValues}
                            addNewValuesBlock={addNewValuesBlock}
                            textValueChange={textValueChange}
                            miniStateToFalse={miniStateToFalse}
                            miniStateToTrue={miniStateToTrue}
                            removeMiniValue={removeMiniValue}



                        />

                    )
                })
            )}
            <NewSectionRight
                sectionClass={'width100 manageSectionDisplay'}
                displayNewCustomSection={addCustomSection}
            />
        </div>
    )
}