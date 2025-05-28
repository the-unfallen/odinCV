
import { useState } from 'react';
import Icon from '@mdi/react';
import { mdiMinusCircleOutline } from '@mdi/js';
import Button from '../Button';

import '../../styles/page2/Page2WorkExperience.css'

const Page2WorkExperience = () => {
    const jobHistory = [
        {title:'Site Surveyor', company: 'Dangote', location:'Lagos', duration:'2023 - Present', 
            'jobDescription':[
                {details: 'Conducted topographic, boundary, and construction layout surveys using GPS and total station equipment.', id:crypto.randomUUID()},  
                {details: 'Interpreted site plans and provided accurate measurements to support civil and structural engineering projects.', id:crypto.randomUUID()},
                {details: 'Coordinated with contractors and project managers to ensure alignment of on-site measurements with design specifications.', id:crypto.randomUUID()}, 
                {details: "Prepared detailed survey reports, CAD drawings, and documentation for project records and regulatory compliance.", id:crypto.randomUUID()}
            ], 
            id:crypto.randomUUID()
        },
        {title:'Assistant Surveyor', company: 'Shell', location:'Lokoja', duration:'2020 - 2022', 
            'jobDescription':[
                {details: 'Supported senior surveyors in collecting field data using GPS, total stations, and leveling instruments.', id:crypto.randomUUID()},  
                {details: 'Assisted in preparing survey drawings, maps, and reports using CAD and GIS software.', id:crypto.randomUUID()},
                {details: 'Helped in marking boundaries and reference points on construction sites under supervision.', id:crypto.randomUUID()}, 
                {details: "Performed data entry, quality checks, and organized field notes for project documentation.", id:crypto.randomUUID()}
            ], 
            id:crypto.randomUUID()
        },
        {title:'Intern Surveyor', company: 'Chevron', location:'Port Harcourt', duration:'2016 - 2018', 
            'jobDescription':[
                {details: 'Assisted in setting up and operating surveying instruments during fieldwork.', id:crypto.randomUUID()},  
                {details: 'Observed and learned standard surveying procedures under the guidance of licensed surveyors.', id:crypto.randomUUID()},
                {details: 'Helped in recording field measurements and organizing site data for analysis.', id:crypto.randomUUID()}, 
                {details: "Supported office tasks such as drafting maps and inputting data into CAD or GIS systems.", id:crypto.randomUUID()}
            ], 
            id:crypto.randomUUID()
        },
    ];

    const initialJobHistory = JSON.parse(localStorage.getItem('savedJobHistory')) || [...jobHistory];

    const [workRecord, setWorkRecord] = useState(initialJobHistory);
    const [workEdit, setWorkEdit] = useState(false);
    const [miniWorkEdit, setMiniWorkEdit] = useState(null);
    const initialWorkLog = {title:'', company: '', location:'', duration:'', 
        'jobDescription':[
            {details: '', id:crypto.randomUUID()},  
            {details: '', id:crypto.randomUUID()},
        ], 
        id:crypto.randomUUID()
    }
    const [newWorkLog, setNewWorkLog] = useState(initialWorkLog)

    const  toggleEditState = () => {
        setNewWorkLog(initialWorkLog);
        setWorkEdit(true);
    }

    const toggleMini = (uniqueId) => {
        setNewWorkLog(initialWorkLog);
        const alljobHistory = [...workRecord];
        for(let i = 0; i < alljobHistory.length; i++){
            if(alljobHistory[i].id === uniqueId){
                setMiniWorkEdit(alljobHistory[i]);
                break;
            }
        }

    }

    const addDescription = (e) => {
        e.preventDefault();
        const item = {details: '', id:crypto.randomUUID()};
        const refNewSkill = {...newWorkLog};
        refNewSkill.jobDescription.push(item);
        setNewWorkLog(refNewSkill);
        setWorkEdit(true);

    }

    const removeDescription = (uniqueId) => {
        const refSkill = {...newWorkLog};
        const refDescription = refSkill.jobDescription;
        let removeIndex;
        for(let i = 0; i < refDescription.length; i++){
            if(refDescription[i].id === uniqueId){
                removeIndex = i;
                break;
            }
        }

        const updatedRefDescription = [...refDescription.slice(0, removeIndex), ...refDescription.slice(removeIndex + 1)];
        refSkill.jobDescription = updatedRefDescription;
        setNewWorkLog(refSkill);

    }

    const handleNormalChange = (e) => {
        const {name, value} = e.target;
        setNewWorkLog(prev => ({...prev, [name]:value}))
    }

    const handleDescriptionChange = (e) => {
        const {value, dataset: { detailsEntry }} = e.target;
        const refSkill = {...newWorkLog};
        const refDescription = refSkill.jobDescription;
        for(let i = 0; i < refDescription.length; i++){
            if(refDescription[i].id === detailsEntry){
                refDescription[i].details = value;
                break;
            }
        }
        refSkill.jobDescription = refDescription;
        setNewWorkLog(refSkill);
    }

    const submitNewWork = (e) => {
        e.preventDefault();
        localStorage.setItem('savedJobHistory', JSON.stringify([...workRecord, newWorkLog]));
        setWorkRecord(prevData => [...prevData, newWorkLog]);
        setMiniWorkEdit(null);
        setNewWorkLog(initialWorkLog);
        setWorkEdit(false);
    }

    const removeWorkBlock = (uniqueId) => {
        let indexOfUniqueId;
        const refWorkHistory = [...workRecord];
        for(let i = 0; i < refWorkHistory.length; i++){
            if(refWorkHistory[i].id === uniqueId){
                indexOfUniqueId = i;
                break;
            }
        }
        const updatedRefWorkHistory = [...refWorkHistory.slice(0, indexOfUniqueId), ...refWorkHistory.slice(indexOfUniqueId + 1)];
        localStorage.setItem('savedJobHistory', JSON.stringify(updatedRefWorkHistory));
        setWorkRecord(updatedRefWorkHistory);
    }

    const setEditStateToFalse = () => {
        setWorkEdit(false);
    }

    const setMiniEditStateToNull = () => {
        setMiniWorkEdit(null);
    }

    const handleNormalEdit = (e) => {
        const {name, value} = e.target;
        setMiniWorkEdit(prev => ({...prev, [name]: value}));
    }

    const handleDescriptionEdit = (e) => {
        const {value, dataset: { detailsEntry }} = e.target;
        const refMini = {...miniWorkEdit};
        const miniDescription = refMini.jobDescription;
        for(let i = 0; i < miniDescription.length; i++){
            if(miniDescription[i].id === detailsEntry){
                miniDescription[i].details = value;
                break;
            }
        }
        // reassign minidescription (now with the updated value) back to refmini's attribute.
        refMini.jobDescription = miniDescription;
        // now update miniworkEdit with the new value of refmini
        setMiniWorkEdit(refMini);
    }

    const handleRemoveDescription = (uniqueId) => {
        const refMini = {...miniWorkEdit};
        const miniDescription = refMini.jobDescription;
        let indexOfUniqueId;
        for(let i = 0; i < miniDescription.length; i++){
            if(miniDescription[i].id === uniqueId){
                indexOfUniqueId = i;
                break;
            }
        }
        const updatedMiniDescription = [...miniDescription.slice(0, indexOfUniqueId), ...miniDescription.slice(indexOfUniqueId + 1)];
        refMini.jobDescription = updatedMiniDescription;
        setMiniWorkEdit(refMini);
    }

    const handleAddEditDescription = (e) => {
        e.preventDefault();
        const item = {details: '', id:crypto.randomUUID()};
        const refMini = {...miniWorkEdit};
        refMini.jobDescription.push(item);
        setMiniWorkEdit(refMini);
    }

    const handleSubmitEdited = (e) => {
        e.preventDefault();
        const refRecord = [...workRecord];
        for(let i = 0; i < refRecord.length; i++){
            if(refRecord[i].id === miniWorkEdit.id){
                refRecord[i] = miniWorkEdit;
                break;
            }
        }
        localStorage.setItem('savedJobHistory', JSON.stringify(refRecord));
        setWorkRecord(refRecord);
        setMiniWorkEdit(null);
        setWorkEdit(true);
    }
    if(!workEdit){
            return(
                <div className='sectionContainer'>
                    <div className='p2SectionTitle'>WORK EXPERIENCE</div>
                    <div>
                        {workRecord.map((history) => {
                            return (
                                <NormalWorkBlock
                                    jobTitle={history.title}
                                    companyName={history.company}
                                    companyLocation={history.location}
                                    jobDuration={history.duration}
                                    jobDescription={history.jobDescription}
                                    key={history.id}
                                />
                            );
                        })}
                        <div className='sectionEdit'>
                            <Button children='Edit Work Experience' onClick={toggleEditState}/>
                        </div>
                    
                    </div>
                </div>
            )
        }else{
            return(
                <>
                    <div className='sectionContainer'>
                        <div className='p2SectionTitle'> EDIT WORK EXPERIENCE</div>
                        {workRecord.map((history) => {
                            if(miniWorkEdit !== null && miniWorkEdit.id === history.id){
                                return(
                                    <MiniEditWorkBlock
                                        miniWorkLog={miniWorkEdit}
                                        key={miniWorkEdit.id}
                                        setMiniEditStateToNull={setMiniEditStateToNull}
                                        normalEdit={handleNormalEdit}
                                        descriptionEdit={handleDescriptionEdit}
                                        removeEditDescription={handleRemoveDescription}
                                        addExtraEditDescription={handleAddEditDescription}
                                        submitEdited={handleSubmitEdited}
                                    />
                                )
                            }else{
                                return (
                                    <EditWorkBlock
                                        jobTitle={history.title}
                                        companyName={history.company}
                                        companyLocation={history.location}
                                        jobDuration={history.duration}
                                        jobDescription={history.jobDescription}
                                        key={history.id}
                                        toggleMini={toggleMini}
                                        jobId={history.id}
                                        onRemove={removeWorkBlock}
                                    />
                                );
                            }
                                
                        })}
                        {miniWorkEdit === null && (
                            <AddNewWorkBlock 
                                newSkillLog={newWorkLog}
                                addExtraDescription={addDescription}
                                removeDescription={removeDescription}
                                normalChange={handleNormalChange}
                                descriptionChange={handleDescriptionChange}
                                submitNewWork={submitNewWork}
                                setEditStateToFalse={setEditStateToFalse}
                            />
                        )}
                    </div>
                </>
            )
        }
}



const MiniEditWorkBlock = ({
    miniWorkLog,
    normalEdit,
    descriptionEdit,
    removeEditDescription,
    addExtraEditDescription,
    submitEdited,
    setMiniEditStateToNull,
}) => {
    return (
        <form onSubmit={submitEdited} className='p2NewWorkForm'>
            <div className='headerEntry'>
                <label>
                    Job Title
                    <input
                        type="text"
                        name="title"
                        value={miniWorkLog.title}
                        onChange={normalEdit}
                    />
                </label>
            </div>
            <div className='headerEntry'>
                <label>
                    Company Name
                    <input
                        type="text"
                        name="company"
                        value={miniWorkLog.company}
                        onChange={normalEdit}
                    />
                </label>
            </div>
            <div className='headerEntry'>
                <label>
                    Location
                    <input
                        type="text"
                        name="location"
                        value={miniWorkLog.location}
                        onChange={normalEdit}
                    />
                </label>
            </div>
            <div className='headerEntry'>
                <label>
                    Duration
                    <input
                        type="text"
                        name="duration"
                        value={miniWorkLog.duration}
                        onChange={normalEdit}
                    />
                </label>
            </div>
            <div>
                <label className='p2JobDescLabel'>Job Description</label>
                {miniWorkLog.jobDescription.map((description) => {
                    return (
                        <div key={description.id} className='headerTextArea'>
                            <textarea
                                name="details"
                                rows={2}
                                value={description.details}
                                onChange={descriptionEdit}
                                data-details-entry={description.id}
                            ></textarea>
                            <div className='p2RemoveDescription'>
                                <Button
                                    children={
                                        <Icon
                                            path={mdiMinusCircleOutline}
                                            size={1.25}
                                        />
                                    }
                                    onClick={() =>
                                        removeEditDescription(description.id)
                                    }
                                />
                            </div>
                        </div>
                    );
                })}

                <div className="p2AddNewDesc">
                    <Button
                        children={"Add Description"}
                        onClick={addExtraEditDescription}
                    />
                </div>
            </div>
            <div className='p2SubmitandBack'>
                {/* // submit button */}
                <Button
                    children={"Submit"}
                    type={"submit"}
                />
                {/* // back button */}
                <Button
                    children={"Back"}
                    onClick={setMiniEditStateToNull}
                />
            </div>
        </form>
    );
};

const AddNewWorkBlock = ({
    newSkillLog,
    addExtraDescription,
    removeDescription,
    normalChange,
    descriptionChange,
    submitNewWork,
    setEditStateToFalse,
}) => {
    return (
        <form onSubmit={submitNewWork} className='p2NewWorkForm'>
            <div className='p2SectionTitle'>Add New Work Experience</div>
            <div className='headerEntry'>
                <label>Job Title:
                <input
                    type="text"
                    name="title"
                    value={newSkillLog.title}
                    onChange={normalChange}
                />
                </label>
            </div>
            <div className='headerEntry'>
                <label>
                    Company Name:
                    <input
                        type="text"
                        name="company"
                        value={newSkillLog.company}
                        onChange={normalChange}
                    />
                </label>
            </div>
            <div className='headerEntry'>
                <label>
                    Location:
                    <input
                        type="text"
                        name="location"
                        value={newSkillLog.location}
                        onChange={normalChange}
                    />
                </label>
            </div>
            <div className='headerEntry'>
                <label>
                    Duration:
                    <input
                        type="text"
                        name="duration"
                        value={newSkillLog.duration}
                        onChange={normalChange}
                    />
                </label>
            </div>
            <div>
                <label className='p2JobDescLabel'>Job Description:</label>
                {newSkillLog.jobDescription.map((description) => {
                    return (
                        <div key={description.id} className='headerTextArea'>
                            <textarea
                                name="details"
                                rows={2}
                                onChange={descriptionChange}
                                data-details-entry={description.id}
                            ></textarea>
                            <div className='p2RemoveDescription'>
                                <Button
                                    children={
                                        <Icon
                                            path={mdiMinusCircleOutline}
                                            size={1.25}
                                        />
                                    }
                                    onClick={() =>
                                        removeDescription(description.id)
                                    }
                                />
                            </div>
                        </div>
                    );
                })}

                <div className="p2AddNewDesc">
                    <Button
                        children={"Add New Description"}
                    
                        onClick={addExtraDescription}
                    />
                </div>
            </div>
            <div className='p2SubmitandBack'>
                {/* // submit button */}
                <Button
                    children={"Submit"}
                    
                    type={"submit"}
                />
                {/* // back button */}
                <Button
                    children={"Back"}
                    
                    onClick={setEditStateToFalse}
                />
            </div>
        </form>
    );
};

const EditWorkBlock = ({
    jobTitle,
    companyName,
    companyLocation,
    jobDuration,
    jobDescription,
    toggleMini,
    jobId,
    onRemove,
}) => {
    return (
        <div className='p2WorkEntryGroup'>
            <div>
                <b>{jobTitle}</b>
            </div>
            <div>
                <span>
                    <b>{companyName}</b> -{" "}
                </span>
                <span>{companyLocation} - </span>
                <span>{jobDuration}</span>
            </div>
            <div>
                <ul>
                    {jobDescription.map((description) => {
                        return (
                            <li key={description.id}>{description.details}</li>
                        );
                    })}
                </ul>
                <div className='p2WorkButtons'>
                    <Button
                        children={
                            <Icon path={mdiMinusCircleOutline} size={1.25} />
                        }
                        onClick={() => onRemove(jobId)}
                    />
                    <Button
                        children={"Edit"}
                        onClick={() => toggleMini(jobId)}
                    />
                </div>
            </div>
        </div>
    );
};

const NormalWorkBlock = ({
    jobTitle,
    companyName,
    companyLocation,
    jobDuration,
    jobDescription,
}) => {
    return (
        <div className='p2NormalWorkBlock'>
            <div className='p2JobDetails'>
                <div>
                    <b>{jobTitle}</b>{" | "}
                    <b>{companyName}</b> {" | "}
                    {companyLocation}
                </div>
                <div>
                    {jobDuration}
                </div>
            </div>
            <div>
                <ul>
                    {jobDescription.map((description) => {
                        return (
                            <li key={description.id}>{description.details}</li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};

export default Page2WorkExperience