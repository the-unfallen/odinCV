import Button from "../Button";
import Icon from "@mdi/react";
import { mdiMinusCircleOutline } from "@mdi/js";
import { mdiSquareEditOutline } from '@mdi/js';
import { mdiArrowLeft } from '@mdi/js';
import { mdiCheckOutline } from '@mdi/js';






 const BlankCustomUnit = ({
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
    addNewValuesBlock, 
    textValueChange,
    valuesBlock,
    miniStateToFalse,
    miniStateToTrue,
    removeMiniValue


}) => {
    // Editing of Exisitng Entries
    if (item_state && modified) {
        return (
            <div>
                {!customNameEditState && (
                    <div>
                        <div>{customUnitName}</div>
                        <div>
                            <Button children={<Icon path={mdiSquareEditOutline} size={1} />} onClick={() => ToggleCustomNameEditState(item_ref)}/>
                        </div>
                    </div>
                )}
                {customNameEditState && (
                    <div>
                        <div>{customUnitName}</div>
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
                        <div>
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

                <div>
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
            <div>
                <div>New Section Details</div>
                <div>
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
                <div>
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
            <div>
                <div>{customUnitName}</div>
                <DisplayValues
                    valuesBlock={valuesBlock}
                />
                <Button
                    children={"Edit Section"}
                    onClick={() => MainEditStateToggle(item_ref)}
                />
            </div>
        );
    }
}



const NewSectionValues = ({addNewValuesBlock, textValueChange, item_ref, valuesBlock}) => {
    return (
        <div>
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
            <div>
                <Button
                    children={"Add More Values"}
                    onClick={() => addNewValuesBlock(item_ref)}
                ></Button>
            </div>
        </div>
    );
}


const DisplayValues = ({valuesBlock}) => {
    return(
        <div>
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

const EditValues = ({
    addNewValuesBlock,
    textValueChange,
    item_ref,
    valuesBlock,
    miniStateToFalse,
    miniStateToTrue,
    removeMiniValue
}) => {
    return (
        <div>
            {valuesBlock.length > 0 &&
                valuesBlock.map((this_value) => {
                    return this_value.state ? (
                        <div key={this_value.id}>
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
                        <div key={this_value.id}>
                            <div>{this_value.text}</div>
                            <div>
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
            <div>
                <Button
                    children={"Add New Values"}
                    onClick={() => addNewValuesBlock(item_ref)}
                ></Button>
            </div>
        </div>
    );
}

export default BlankCustomUnit