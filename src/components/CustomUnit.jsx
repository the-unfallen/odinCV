import Button from "./Button";
import Icon from "@mdi/react";
import { mdiMinusCircleOutline } from "@mdi/js";
import "../styles/CustomUnit.css";
import { mdiSquareEditOutline } from '@mdi/js';
import { mdiArrowLeft } from '@mdi/js';
import { mdiCheckOutline } from '@mdi/js';

export default function CustomUnit({
    submitCustomDetails,
    item_ref,
    MainEditStateToggle,
    item_state,
    removeSelf,
    modified,
    customName,
    customNameChange,
    customNameValue,
    setStateToFalse,
    customUnitName,
    customNameEditState,
    ToggleCustomNameEditState,
    // setValueStateToFalse, 
    addNewValuesBlock, 
    textValueChange,
    valuesBlock,
    miniStateToFalse,
    miniStateToTrue,
    removeMiniValue


}) {
    // Editing of Exisitng Entries
    if (item_state && modified) {
        return (
            <div className="customEditing">
                {!customNameEditState && (
                    <div className="customEditTitle">
                        <div className="customUnitName">{customUnitName}</div>
                        <div className="customUnitButtonDiv">
                            <Button children={<Icon path={mdiSquareEditOutline} size={1} />} onClick={() => ToggleCustomNameEditState(item_ref)}/>
                        </div>
                    </div>
                )}
                {customNameEditState && (
                    <div className="customEditTitle">
                        <div className="customUnitName">{customUnitName}</div>
                        <label>
                            Custom Section Title:
                            <input
                                type="text"
                                value={customNameValue}
                                name={customName}
                                onChange={customNameChange}
                                data-ref-id={item_ref}
                            ></input>
                        </label>
                        <div className="customEditTitleSubmit">
                            <Button
                                children={<Icon path={mdiCheckOutline} size={1} />}
                                onClick={() => submitCustomDetails(item_ref)}
                            />
                        </div>
                    </div>
                )}
                <EditValues
                    addNewValuesBlock={addNewValuesBlock}
                    textValueChange={textValueChange}
                    item_ref={item_ref}
                    valuesBlock={valuesBlock}
                    miniStateToFalse={miniStateToFalse}
                    miniStateToTrue={miniStateToTrue}
                    removeMiniValue={removeMiniValue}
                />

                <div className="backAndMinus">
                    <Button
                        children={
                            <Icon path={mdiMinusCircleOutline} size={1} />
                        }
                        onClick={() => removeSelf(item_ref)}
                    />
                    <Button
                        children={<Icon path={mdiArrowLeft} size={1} />}
                        onClick={() => setStateToFalse(item_ref)}
                    />
                </div>
            </div>
        );
    }
    if (item_state && !modified) {
        // New custom section
        // Editing of new entries
        return (
            <div className="customAddNewSection">
                <div className="new-section-header">New Section Details</div>
                <div className="customNewTitleBox">
                    <label>
                        Custom Section Title:
                        <input type="text" value={customNameValue} name={customName} onChange={customNameChange} data-ref-id={item_ref}></input>
                    </label>
                </div>
                <NewSectionValues
                    // setValueStateToFalse={setValueStateToFalse}
                    addNewValuesBlock={addNewValuesBlock}
                    textValueChange={textValueChange}
                    item_ref={item_ref}
                    valuesBlock={valuesBlock}
                />
                <div className="customUnitSubmitDiv">
                    <Button
                        children={"Submit"}
                        onClick={() => submitCustomDetails(item_ref)}
                    />
                </div>
            </div>
        );
    }
    if (!item_state) {
        // Non edit.
        return (
            <div className="customUnit">
                <div className='customUnitName'>{customUnitName}</div>
                <DisplayValues
                    valuesBlock={valuesBlock}
                />
                <Button
                    button_class={'customUnitEditSectionButton'}
                    children={"Edit Section"}
                    onClick={() => MainEditStateToggle(item_ref)}
                />
            </div>
        );
    }
}



function NewSectionValues({addNewValuesBlock, textValueChange, item_ref, valuesBlock}){
    return (
        <div className="newFieldGroup">
            {valuesBlock.length > 0  && (
                valuesBlock.map((this_value) => {
                return (
                    <div key={this_value.id} className="customUnitTextAreaDiv">
                        <label>
                            Values:
                            <textarea
                                value={this_value.text}
                                onChange={textValueChange}
                                rows={2}
                                id=""
                                data-value-id={this_value.id}
                                data-ref-id={item_ref}
                            ></textarea>
                        </label>
                    </div>
                );
            }))}
            <div className="customUnitAddMoreValues">
                <Button
                    children={"Add More Values"}
                    onClick={() => addNewValuesBlock(item_ref)}
                ></Button>
            </div>
        </div>
    );
}


function DisplayValues({valuesBlock}) {
    return(
        <div className="displayFields">
            {valuesBlock.length > 1 && (
                valuesBlock.map((this_value) => {
                    return(
                        <div key={this_value.id}><li>{this_value.text}</li></div>
                    )
                })
            )}
            {valuesBlock.length === 1 && (
                valuesBlock.map((this_value) => {
                    return(
                        <div key={this_value.id}>{this_value.text}</div>
                    )
                })
            )}
        </div>

    )

}

function EditValues({
    addNewValuesBlock,
    textValueChange,
    item_ref,
    valuesBlock,
    miniStateToFalse,
    miniStateToTrue,
    removeMiniValue
}) {
    return (
        <div className="editValuesContainer">
            {valuesBlock.length > 0 &&
                valuesBlock.map((this_value) => {
                    return this_value.state ? (
                        <div key={this_value.id} className="customUnitEditValues">
                            <div>
                                <label>
                                    <textarea
                                        value={this_value.text}
                                        onChange={textValueChange}
                                        rows={2}
                                        id=""
                                        data-value-id={this_value.id}
                                        data-ref-id={item_ref}
                                    ></textarea>
                                </label>
                            </div>
                            {/* <Button children={"Back"} onClick={() => miniStateToFalse(item_ref, this_value.id)} /> */}
                            <div>
                                <Button
                                    children={<Icon path={mdiCheckOutline} size={1} />}
                                    onClick={() =>
                                        miniStateToFalse(
                                            item_ref,
                                            this_value.id
                                        )
                                    }
                                />
                            </div>
                        </div>
                    ) : (
                        <div key={this_value.id} className="customUnitEditValues">
                            <div>{this_value.text}</div>
                            <div className="customUnitEditandRemoveButtons">
                                <span>
                                    <Button
                                        children={<Icon path={mdiSquareEditOutline} size={1} />}
                                        onClick={() =>
                                            miniStateToTrue(
                                                item_ref,
                                                this_value.id
                                            )
                                        }
                                    ></Button>
                                </span>
                                <span>
                                    <Button
                                        children={<Icon path={mdiMinusCircleOutline} size={1} />}
                                        onClick={() =>
                                            removeMiniValue(
                                                item_ref,
                                                this_value.id
                                            )
                                        }
                                    ></Button>
                                </span>
                            </div>
                        </div>
                    );
                })}
            <div className="customUnitAddNewValues">
                <Button
                    children={"Add New Values"}
                    onClick={() => addNewValuesBlock(item_ref)}
                ></Button>
            </div>
        </div>
    );
}