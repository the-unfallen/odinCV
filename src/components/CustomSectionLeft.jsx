import { useState } from "react";
import NewSectionLeft from "./NewSectionLeft"
import '../styles/CustomSectionLeft.css'
import CustomUnit from "./CustomUnit";

export default function CustomSectionLeft() {
    // const [miniCustom, setMiniCustom] = useState({customName: ''});
    const leftCustomSectionRecord = JSON.parse(localStorage.getItem('leftCustomRecord')) || [];
    const [leftRecord, setLeftRecord] = useState(leftCustomSectionRecord);
    const addCustomSection = () => {
        const newLeftRecord = [
            ...leftRecord,
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
        localStorage.setItem('leftCustomRecord', JSON.stringify(newLeftRecord));
        setLeftRecord(newLeftRecord);
    }
    
    const removeItem = (ref_id) => {
        let indexOfRefId = -1;
        for(let i = 0; i < leftRecord.length; i++){
            if(leftRecord[i].id === ref_id){
                indexOfRefId = i;
                break;
            }
        }
        if (indexOfRefId === -1)return;
        const newLeftRecord = [...leftRecord.slice(0, indexOfRefId), ...leftRecord.slice(indexOfRefId + 1)];
        localStorage.setItem('leftCustomRecord', JSON.stringify(newLeftRecord));
        setLeftRecord(newLeftRecord);
    };

    const toggleItemState = (ref_id) => {
        const refLeftRecord = [...leftRecord];
        for(let i = 0; i < refLeftRecord.length; i++){
            if(refLeftRecord[i].id === ref_id){
                refLeftRecord[i].itemState = true;
            }else{
                refLeftRecord[i].itemState = false;
            }
        }
        localStorage.setItem('leftCustomRecord', JSON.stringify(refLeftRecord));
        setLeftRecord(refLeftRecord);
    }

    const handleCustomNameInputChange = (e) => {
        const {value} = e.target;
        const ref_id = e.target.dataset.refId;
        const refLeftRecord = [...leftRecord];
        for(let i = 0; i < refLeftRecord.length; i++){
            if(refLeftRecord[i].id === ref_id){
                refLeftRecord[i].customName = value;
                break;
            }
        }
        localStorage.setItem('leftCustomRecord', JSON.stringify(refLeftRecord));
        setLeftRecord(refLeftRecord);
    }

    const submitCustomDetails = (ref_id) => {
        const refLeftRecord = [...leftRecord];
        for(let i = 0; i < refLeftRecord.length; i++){
            if(refLeftRecord[i].id === ref_id){
                refLeftRecord[i].modified = true;
                refLeftRecord[i].itemState = false;
                refLeftRecord[i].cnEditState = false;

                break;
            }
        }
        localStorage.setItem('leftCustomRecord', JSON.stringify(refLeftRecord));
        setLeftRecord(refLeftRecord);
    }

    const setStateToFalse = (ref_id) => {
        const refLeftRecord = [...leftRecord];
        for(let i = 0; i < refLeftRecord.length; i++){
            if(refLeftRecord[i].id === ref_id){
                refLeftRecord[i].modified = true;
                refLeftRecord[i].itemState = false;
                break;
            }
        }
        localStorage.setItem('leftCustomRecord', JSON.stringify(refLeftRecord));
        setLeftRecord(refLeftRecord);
    }

    const ToggleCustomNameEditState = (ref_id) => {
        const refLeftRecord = [...leftRecord];
        for(let i = 0; i < refLeftRecord.length; i++){
            if(refLeftRecord[i].id === ref_id){
                refLeftRecord[i].cnEditState = true;
                break;
            }
        }
        localStorage.setItem('leftCustomRecord', JSON.stringify(refLeftRecord));
        setLeftRecord(refLeftRecord);
    }

    
    // const setValueStateToFalse = (ref_id) => {
    //     const refLeftRecord = [...leftRecord];
    //     for(let i = 0; i < refLeftRecord.length; i++){
    //         if(refLeftRecord[i].id === ref_id){
    //             refLeftRecord[i].newSectionState = false;
    //             break;
    //         }
    //     }
    //     setLeftRecord(refLeftRecord);
    // }

    const addNewValuesBlock = (ref_id) => {
        console.log(ref_id);
        const refLeftRecord = [...leftRecord];
        const newBlock = {id: crypto.randomUUID(), text: '', state: true };
        for(let i = 0; i < refLeftRecord.length; i++){
            if(refLeftRecord[i].id === ref_id){
                console.log(refLeftRecord[i].sectionValues);
                refLeftRecord[i].sectionValues.push(newBlock);
                refLeftRecord[i].modified = true;
                refLeftRecord[i].itemState = true;
                break;
            }
        }
        localStorage.setItem('leftCustomRecord', JSON.stringify(refLeftRecord));
        setLeftRecord(refLeftRecord);
    }

    const textValueChange = (e) => {
        const {value} = e.target;
        const ref_id = e.target.dataset.refId;
        const value_id = e.target.dataset.valueId;
        const refLeftRecord = [...leftRecord];
        for(let i = 0; i < refLeftRecord.length; i++){
            if(refLeftRecord[i].id === ref_id){
                let valueBlock = refLeftRecord[i].sectionValues 
                for(let j = 0; j < valueBlock.length; j++){
                    if(valueBlock[j].id === value_id){
                        refLeftRecord[i].sectionValues[j].text = value;
                        break;
                    }
                }
                break;
            }
        }
        localStorage.setItem('leftCustomRecord', JSON.stringify(refLeftRecord));
        setLeftRecord(refLeftRecord);

    }

    const miniStateToFalse = (refId, valueId) => {
        const refLeftRecord = [...leftRecord];
        for(let i = 0; i < refLeftRecord.length; i++){
            if(refLeftRecord[i].id === refId){
                let valueBlock = refLeftRecord[i].sectionValues 
                for(let j = 0; j < valueBlock.length; j++){
                    if(valueBlock[j].id === valueId){
                        refLeftRecord[i].sectionValues[j].state = false;
                        break;
                    }
                }
                break;
            }
        }
        localStorage.setItem('leftCustomRecord', JSON.stringify(refLeftRecord));
        setLeftRecord(refLeftRecord);
    }

    
    const miniStateToTrue = (refId, valueId) => {
        const refLeftRecord = [...leftRecord];
        for(let i = 0; i < refLeftRecord.length; i++){
            if(refLeftRecord[i].id === refId){
                let valueBlock = refLeftRecord[i].sectionValues 
                for(let j = 0; j < valueBlock.length; j++){
                    if(valueBlock[j].id === valueId){
                        refLeftRecord[i].sectionValues[j].state = true;
                        break;
                    }
                }
                break;
            }
        }
        localStorage.setItem('leftCustomRecord', JSON.stringify(refLeftRecord));
        setLeftRecord(refLeftRecord);
    }


    const removeMiniValue = (refId, valueId) => {
        let indexOfRefId;
        let indexOfValueId;
        const refLeftRecord = [...leftRecord];
        for(let i = 0; i < refLeftRecord.length; i++){
            if(refLeftRecord[i].id === refId){
                indexOfRefId = i;
                break;
            }
        }
        const itemObject = refLeftRecord[indexOfRefId];
        const valueArray = itemObject.sectionValues;
        for(let j = 0; j < valueArray.length; j++){
            if(valueArray[j].id === valueId){
                indexOfValueId = j;
            }
        }

        const newValueArray = [...valueArray.slice(0, indexOfValueId), ...valueArray.slice(indexOfValueId + 1)];
        refLeftRecord[indexOfRefId].sectionValues = newValueArray;
        localStorage.setItem('leftCustomRecord', JSON.stringify(refLeftRecord));
        setLeftRecord(refLeftRecord);
    }



    




    return (
        <div>
            {leftRecord.length > 0 && (
                leftRecord.map(record => {
                    let sectionTitle;
                    if (record.customName === '' || !record.customName){
                        sectionTitle = record.id.slice(4, 10);
                    }else{
                        sectionTitle = record.customName;
                    }
                    return(
                        <CustomUnit
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
            <NewSectionLeft
                sectionClass={'width100 manageSectionDisplay'}
                displayNewCustomSection={addCustomSection}
            />
        </div>
    )
}