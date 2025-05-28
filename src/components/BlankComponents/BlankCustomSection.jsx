import { useState } from "react";
import Button from "../Button";
import BlankCustomUnit from "./BlankCustomUnit";

export default function BlankCustomSection() {
    // const [miniCustom, setMiniCustom] = useState({customName: ''});
    const leftCustomSectionRecord = JSON.parse(localStorage.getItem('leftCustomRecord')) || [];
    const rightCustomSectionRecord = JSON.parse(localStorage.getItem('rightCustomRecord')) || [];
    const mainDefaultRecord = [...leftCustomSectionRecord, ...rightCustomSectionRecord];
    localStorage.setItem('mainCustomRecord', JSON.stringify(mainDefaultRecord));
    const [mainRecord, setMainRecord] = useState(mainDefaultRecord);

    // To update, left and right records where neccessary.
    // left records will be original left records and right records will be original right records
    // plus any additional items;

    const updateAxis = (mainRecordData) => {
        // we go through every item in the main
        // if the item is in the left array, we update, if not we look for it in the right array,
        // if it is there, we add it there, if not we update it.
        const refMainRecord = [...mainRecordData];
        let refLeftRecord = JSON.parse(localStorage.getItem('leftCustomRecord')) || [];
        let refRightRecord = JSON.parse(localStorage.getItem('rightCustomRecord')) || [];
        
        const leftIds = new Set(refLeftRecord.map(item => item.id));
        const rightIds = new Set(refRightRecord.map(item => item.id));
        
        for (const item of refMainRecord){
            if (leftIds.has(item.id)) {
                refLeftRecord = refLeftRecord.map(rec => rec.id === item.id ? item : rec);
            } else if (rightIds.has(item.id)) {
                refRightRecord = refRightRecord.map(rec => rec.id === item.id ? item : rec);
            } else {
                refRightRecord.push(item); // New items go to right
            }
        }
        localStorage.setItem('leftCustomRecord', JSON.stringify(refLeftRecord));
        localStorage.setItem('rightCustomRecord', JSON.stringify(refRightRecord));
    }
   

    const addCustomSection = () => {
        const newMainRecord = [
            ...mainRecord,
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
        localStorage.setItem('mainCustomRecord', JSON.stringify(newMainRecord));
        updateAxis(newMainRecord);
        setMainRecord(newMainRecord);
    }
    
    const removeItem = (ref_id) => {
        //remove from main record
        //remove from axis
        let refMainRecord = JSON.parse(localStorage.getItem('mainCustomRecord')) || [];
        let refLeftRecord = JSON.parse(localStorage.getItem('leftCustomRecord')) || [];
        let refRightRecord = JSON.parse(localStorage.getItem('rightCustomRecord')) || [];

        const leftIds = new Set(refLeftRecord.map(item => item.id));
        const rightIds = new Set(refRightRecord.map(item => item.id));

        if (leftIds.has(ref_id)) {
            refLeftRecord = refLeftRecord.filter(rec => rec.id !== ref_id);
        } else if (rightIds.has(ref_id)) {
            refRightRecord = refRightRecord.filter(rec => rec.id !== ref_id);
        }

        localStorage.setItem('leftCustomRecord', JSON.stringify(refLeftRecord));
        localStorage.setItem('rightCustomRecord', JSON.stringify(refRightRecord));

        refMainRecord = refMainRecord.filter(rec => rec.id !== ref_id);
        localStorage.setItem('mainCustomRecord', JSON.stringify(refMainRecord));

        setMainRecord(refMainRecord);
    };



    const toggleItemState = (ref_id) => {
        const refMainRecord = [...mainRecord];
        let indexOfRefId = -1;

        for(let i = 0; i < refMainRecord.length; i++){
            if(refMainRecord[i].id === ref_id){
                refMainRecord[i].itemState = true;
                indexOfRefId = i;
            }else{
                refMainRecord[i].itemState = false;
            }
        }
        if(indexOfRefId === -1)return;
        localStorage.setItem('mainCustomRecord', JSON.stringify(refMainRecord));
        updateAxis(refMainRecord);
        setMainRecord(refMainRecord);
        
    }

    const handleCustomNameInputChange = (e) => {
        const {value} = e.target;
        const ref_id = e.target.dataset.refId;
        const refMainRecord = [...mainRecord];
        for(let i = 0; i < refMainRecord.length; i++){
            if(refMainRecord[i].id === ref_id){
                refMainRecord[i].customName = value;
                break;
            }
        }
        localStorage.setItem('mainCustomRecord', JSON.stringify(refMainRecord));
        updateAxis(refMainRecord);
        setMainRecord(refMainRecord);
        
    }

    const submitCustomDetails = (ref_id) => {
        const refMainRecord = [...mainRecord];
        for(let i = 0; i < mainRecord.length; i++){
            if(refMainRecord[i].id === ref_id){
                refMainRecord[i].modified = true;
                refMainRecord[i].itemState = false;
                refMainRecord[i].cnEditState = false;
                break;
            }
        }
        localStorage.setItem('mainCustomRecord', JSON.stringify(refMainRecord));
        updateAxis(refMainRecord);
        setMainRecord(refMainRecord);
    }

    const setStateToFalse = (ref_id) => {
        const refMainRecord = [...mainRecord];
        for(let i = 0; i < refMainRecord.length; i++){
            if(refMainRecord[i].id === ref_id){
                refMainRecord[i].modified = true;
                refMainRecord[i].itemState = false;
                break;
            }
        }
        localStorage.setItem('mainCustomRecord', JSON.stringify(refMainRecord));
        updateAxis(refMainRecord);
        setMainRecord(refMainRecord);
    }

    const ToggleCustomNameEditState = (ref_id) => {
        const refMainRecord = [...mainRecord];
        for(let i = 0; i < refMainRecord.length; i++){
            if(refMainRecord[i].id === ref_id){
                refMainRecord[i].cnEditState = true;
                break;
            }
        }
        localStorage.setItem('mainCustomRecord', JSON.stringify(refMainRecord));
        updateAxis(refMainRecord);
        setMainRecord(refMainRecord);
    }

    

    const addNewValuesBlock = (ref_id) => {
        console.log(ref_id);
        const refMainRecord = [...mainRecord];
        const newBlock = {id: crypto.randomUUID(), text: '', state: true };
        for(let i = 0; i < refMainRecord.length; i++){
            if(refMainRecord[i].id === ref_id){
                console.log(refMainRecord[i].sectionValues);
                refMainRecord[i].sectionValues.push(newBlock);
                refMainRecord[i].modified = true;
                refMainRecord[i].itemState = true;
                break;
            }
        }
        localStorage.setItem('mainCustomRecord', JSON.stringify(refMainRecord));
        updateAxis(refMainRecord);
        setMainRecord(refMainRecord);
    }

    const textValueChange = (e) => {
        const {value} = e.target;
        const ref_id = e.target.dataset.refId;
        const value_id = e.target.dataset.valueId;
        const refMainRecord = [...mainRecord];
        for(let i = 0; i < refMainRecord.length; i++){
            if(refMainRecord[i].id === ref_id){
                let valueBlock = refMainRecord[i].sectionValues 
                for(let j = 0; j < valueBlock.length; j++){
                    if(valueBlock[j].id === value_id){
                        refMainRecord[i].sectionValues[j].text = value;
                        break;
                    }
                }
                break;
            }
        }
        localStorage.setItem('mainCustomRecord', JSON.stringify(refMainRecord));
        updateAxis(refMainRecord);
        setMainRecord(refMainRecord);

    }

    const miniStateToFalse = (refId, valueId) => {
        const refMainRecord = [...mainRecord];
        for(let i = 0; i < refMainRecord.length; i++){
            if(refMainRecord[i].id === refId){
                let valueBlock = refMainRecord[i].sectionValues 
                for(let j = 0; j < valueBlock.length; j++){
                    if(valueBlock[j].id === valueId){
                        refMainRecord[i].sectionValues[j].state = false;
                        break;
                    }
                }
                break;
            }
        }
        localStorage.setItem('mainCustomRecord', JSON.stringify(refMainRecord));
        updateAxis(refMainRecord);
        setMainRecord(refMainRecord);
    }

    
    const miniStateToTrue = (refId, valueId) => {
        const refMainRecord = [...mainRecord];
        for(let i = 0; i < refMainRecord.length; i++){
            if(refMainRecord[i].id === refId){
                let valueBlock = refMainRecord[i].sectionValues 
                for(let j = 0; j < valueBlock.length; j++){
                    if(valueBlock[j].id === valueId){
                        refMainRecord[i].sectionValues[j].state = true;
                        break;
                    }
                }
                break;
            }
        }
        localStorage.setItem('mainCustomRecord', JSON.stringify(refMainRecord));
        updateAxis(refMainRecord);
        setMainRecord(refMainRecord);
    }


    const removeMiniValue = (refId, valueId) => {
        let indexOfRefId;
        let indexOfValueId;
        const refMainRecord = [...mainRecord];
        for(let i = 0; i < refMainRecord.length; i++){
            if(refMainRecord[i].id === refId){
                indexOfRefId = i;
                break;
            }
        }
        const itemObject = refMainRecord[indexOfRefId];
        const valueArray = itemObject.sectionValues;
        for(let j = 0; j < valueArray.length; j++){
            if(valueArray[j].id === valueId){
                indexOfValueId = j;
            }
        }

        const newValueArray = [...valueArray.slice(0, indexOfValueId), ...valueArray.slice(indexOfValueId + 1)];
        refMainRecord[indexOfRefId].sectionValues = newValueArray;

        localStorage.setItem('mainCustomRecord', JSON.stringify(refMainRecord));
        updateAxis(refMainRecord);
        setMainRecord(refMainRecord);
    }


    return (
        <div>
            {mainRecord.length > 0 && (
                mainRecord.map(record => {
                    let sectionTitle;
                    if (record.customName === '' || !record.customName){
                        sectionTitle = record.id.slice(4, 10);
                    }else{
                        sectionTitle = record.customName;
                    }
                    return(
                        <BlankCustomUnit
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
            <div>
                <Button
                    button_class={'add-custom-section-button'}
                    children={<span className='add-custom-section-child'>Add Custom Section</span>}
                    onClick={addCustomSection}
                />
            </div>
        </div>
    )
}