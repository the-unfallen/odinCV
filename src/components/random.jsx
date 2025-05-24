    const leftCustomSectionRecord = JSON.parse(localStorage.getItem('leftCustomRecord')) || [];
    const [leftRecord, setLeftRecord] = useState(leftCustomSectionRecord);
    const NewCustomSectionLeft = () => {
        const newLeftRecord = [...leftRecord, {id: crypto.randomUUID()}];
        localStorage.setItem('leftCustomRecord', JSON.stringify(newLeftRecord));
        setLeftRecord(newLeftRecord);

    }

    const rightCustomSectionRecord = JSON.parse(localStorage.getItem('rightCustomRecord')) || [];
    const [rightRecord, setRightRecord] = useState(rightCustomSectionRecord);
    const NewCustomSectionRight = () => {
        const newRightRecord = [...rightRecord, {id: crypto.randomUUID()}];
        localStorage.setItem('rightCustomRecord', JSON.stringify(newRightRecord));
        setRightRecord(newRightRecord);
    }

    const removeItemLeft = (ref_id) => {
        const indexOfRefId = leftRecord.indexOf(ref_id);

        if (indexOfRefId === -1)return;

        const newLeftRecord = [...leftRecord.slice(0, indexOfRefId), ...leftRecord.slice(indexOfRefId + 1)];
        localStorage.setItem('leftCustomRecord', JSON.stringify(newLeftRecord));
        setLeftRecord(newLeftRecord);

    };

    const removeItemRight = (item_id) => {
        const indexOfItemId = rightRecord.indexOf(item_id);

        if (indexOfItemId === -1) return; // Item not found

        const newRightRecord = [...rightRecord.slice(0, indexOfItemId), ...rightRecord.slice(indexOfItemId + 1)];
        localStorage.setItem('rightCustomRecord', JSON.stringify(newRightRecord));
        setRightRecord(newRightRecord);
    };



    <NewSectionRight 
                    sectionClass={'new-section-right'}
                    displayNewCustomSection={NewCustomSectionRight}
                />




                {rightRecord.length > 0 && (
                    rightRecord.map(unique_record => {
                        return (
                            <CustomSection
                                key={unique_record.id}
                                item_ref={unique_record.id}
                                these_children={unique_record.id}
                                removeSelf={removeItemRight}
                            />
                        )
                    }

                    )

                )}



                {leftRecord.length > 0 && (
                    leftRecord.map(this_record => {
                            return(
                                <CustomSection
                                key={this_record.id}
                                item_ref={this_record.id}
                                these_children={this_record.id}
                                removeSelf={removeItemLeft}
                                />
                            )
                        })
                    
                )}
                <NewSectionLeft 
                    sectionClass={'new-section-left'}
                    displayNewCustomSection={NewCustomSectionLeft}
                />