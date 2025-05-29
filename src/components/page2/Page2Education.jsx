import { useState } from 'react'
import { useRef } from 'react'

import Icon from '@mdi/react';
import { mdiMinusCircleOutline } from '@mdi/js';
// import { mdiPlusCircleOutline } from '@mdi/js';
import Button from '../Button';

import '../../styles/page2/Page2Education.css'



const Page2Education = () => {
    const [editState, setEditState] = useState(false);
        const [miniState, setMiniState] = useState(null);
        const inputRef1 = useRef();
        const inputRef2 = useRef();
        const inputRef3 = useRef();
        const inputRef4 = useRef();
        const inputRef5 = useRef();
        const [miniLog, setMiniLog] = useState('');
    
        const educationRecord = [
            {
                degreeType: 'Degree Type',
                course: 'Field of Study',
                school: 'University Name',
                location: 'City, Country',
                duration: 'Start Year - End Year',
                id: crypto.randomUUID(),
            },
            {
                degreeType: 'Degree Type',
                course: 'Field of Study',
                school: 'University Name',
                location: 'City, Country',
                duration: 'Start Year - End Year',
                id: crypto.randomUUID(),
            },
        ];
    
        const initialEducationRecord = JSON.parse(localStorage.getItem('savedEducationRecord')) || [...educationRecord];
    
        const [educationLog, setEducationLog] = useState(initialEducationRecord);
        const initialLog = {degreeType: '', course:'', school: '', location: '', duration:'', id: null}
        const [currentLog, setCurrentLog] = useState(initialLog);
    
        function handleEditState() {
            setEditState(prev => !prev);
        }
    
        function removeObject(uniqueId) {
            let indexofUniqueId;
            for(let i = 0; i < educationLog.length; i++){
                if(educationLog[i].id === uniqueId){
                    indexofUniqueId = i;
                    break;
                }
            }
            const newEducationRecord = [...educationLog.slice(0, indexofUniqueId), ...educationLog.slice(indexofUniqueId + 1)];
            localStorage.setItem('savedEducationRecord', JSON.stringify(newEducationRecord));
            setEducationLog(newEducationRecord);
        }
    
        function handleInputChange(e){
            const {name, value }= e.target;
            setCurrentLog(prevData => ({
                ...prevData, 
                [name]: value,
            }));
        }
    
        function handleMiniChange(e){
            const {name, value }= e.target;
            setMiniLog(prevData => ({
                ...prevData, 
                [name]: value,
            }));
        }
    
        function handleMiniState(uniqueId){
            console.log('Ministate is updated with: ', uniqueId);
            let miniLogEntry
            for(let i = 0; i < educationLog.length; i++){
                if(educationLog[i].id === uniqueId){
                    miniLogEntry = educationLog[i];
                    break;
                }
            }
            setMiniLog(miniLogEntry);
            setMiniState(uniqueId);
            setEditState(true);
        }
    
        function handleSubmission(){
            const newLog = {...currentLog, ['id']: crypto.randomUUID()}
            setCurrentLog(newLog);
            localStorage.setItem('savedEducationRecord', JSON.stringify([...educationLog, newLog]));
            setEducationLog(prevLog => [...prevLog, newLog]);
            inputRef1.current.value = '';
            inputRef2.current.value = '';
            inputRef3.current.value = '';
            inputRef4.current.value = '';
            setEditState(false);
    
        }
    
        function handleSubmitMini(uniqueId) {
            const allEduLog = [...educationLog];
            for(let i = 0; i < allEduLog.length; i++) {
                if(allEduLog[i].id === uniqueId){
                    allEduLog[i] = miniLog;
                    break;
                }
            }
            localStorage.setItem('savedEducationRecord', JSON.stringify(allEduLog));
            setEducationLog(allEduLog);
            setMiniToNull();
            setEditState(true);
        }
    
        function setMiniToNull() {
            setMiniState(null);
            setMiniLog('');
        }
    
        function handleBackFromNew() {
            setEditState(false);
        }
    
        if(!editState){
            return(
                <div className='sectionContainer'>
                    <div className='p2SectionTitle'>EDUCATION</div>
                    <div>
                        {educationLog.map((record) => {
                            return (
                                <EducationBox
                                    key={record.id}
                                    degreeOrDiplomaType={record.degreeType}
                                    courseOfStudy={record.course}
                                    SchoolName={record.school}
                                    SchoolLocation={record.location}
                                    YeartoYear={record.duration}
                                />
                            );
                        })}
                        <div className='sectionEdit'>
                            <Button children='Edit Education' onClick={handleEditState}/>
                        </div>
                    </div>
                </div>
            )
        }else{
            return (
                <div className="sectionContainer">
                    <div className="p2SectionTitle">EDIT EDUCATION</div>
                    <div>
                        {educationLog.map((record) => {
                            console.log({ miniState });
                            console.log("record.id", record.id);
                            if (miniState === record.id) {
                                return (
                                    <EducationLog
                                        entryId={miniLog.id}
                                        key={miniLog.id}
                                        course={miniLog.course}
                                        degree={miniLog.degreeType}
                                        school={miniLog.school}
                                        location={miniLog.location}
                                        duration={miniLog.duration}
                                        handleChange={handleMiniChange}
                                        resetMini={setMiniToNull}
                                        submitMini={handleSubmitMini}
                                    />
                                );
                            } else {
                                return (
                                    <EducationBlock
                                        key={record.id}
                                        degreeOrDiplomaType={record.degreeType}
                                        SchoolName={record.school}
                                        SchoolLocation={record.location}
                                        YeartoYear={record.duration}
                                        entryId={record.id}
                                        courseOfStudy={record.course}
                                        onRemove={removeObject}
                                        handleMini={handleMiniState}
                                    />
                                );
                            }
                        })}
                        {miniState === null && (
                            <>
                                <div className='p2NewEducation'>
                                    <div className="p2SectionTitle">
                                        Add New Education History:
                                    </div>
                                    <div className='headerEntry'>
                                        <label>
                                            Degree or Diploma:
                                            <input
                                                type="text"
                                                name="degreeType"
                                                ref={inputRef1}
                                                onChange={handleInputChange}
                                            />
                                        </label>
                                    </div>
                                    <div className='headerEntry'>
                                        <label>
                                            Course of Study:
                                            <input
                                                type="text"
                                                name="course"
                                                ref={inputRef5}
                                                onChange={handleInputChange}
                                            />
                                        </label>
                                    </div>
                                    <div className='headerEntry'>
                                        <label>
                                            School or Institution:
                                            <input
                                                type="text"
                                                name="school"
                                                ref={inputRef2}
                                                onChange={handleInputChange}
                                            />
                                        </label>
                                    </div>
                                    <div className='headerEntry'>
                                        <label>
                                            City, State, Country:
                                            <input
                                                type="text"
                                                name="location"
                                                ref={inputRef3}
                                                onChange={handleInputChange}
                                            />
                                        </label>
                                    </div>
                                    <div className='headerEntry'>
                                        <label>
                                            Year to Year:
                                            <input
                                                type="text"
                                                name="duration"
                                                ref={inputRef4}
                                                onChange={handleInputChange}
                                            />
                                        </label>
                                    </div>
                                </div>
                                <div className='p2EducationButtons'>
                                    <Button
                                        children="Submit"
                                        onClick={handleSubmission}
                                    />
                                    <Button
                                        children="Back"
                                        onClick={handleBackFromNew}
                                    />
                                </div>
                            </>
                        )}
                    </div>
                </div>
            );
        }
    
}




const EducationLog = ({
    handleChange,
    degree,
    school,
    location,
    course,
    duration,
    resetMini,
    submitMini,
    entryId,
}) => {
    return (
        <div className='p2EducationLog'>
            <div className='headerEntry'>
                <label>
                    Degree or Diploma
                    <input
                        type="text"
                        name="degreeType"
                        value={degree}
                        onChange={handleChange}
                    />
                </label>
            </div>
            <div className='headerEntry'>
                <label>
                    Course of Study
                    <input
                        type="text"
                        name="course"
                        value={course}
                        onChange={handleChange}
                    />
                </label>
            </div>
            <div className='headerEntry'>
                <label>
                    School or Institution
                    <input
                        type="text"
                        name="school"
                        value={school}
                        onChange={handleChange}
                    />
                </label>
            </div>
            <div className='headerEntry'>
                <label>
                    City, State, Country
                    <input
                        type="text"
                        name="location"
                        value={location}
                        onChange={handleChange}
                    />
                </label>
            </div>
            <div className='headerEntry'>
                <label>
                    Year to Year
                    <input
                        type="text"
                        name="duration"
                        value={duration}
                        onChange={handleChange}
                    />
                </label>
            </div>
            <div className='p2EducationButtons'>
                <Button children={"Done"} onClick={() => submitMini(entryId)} />
                <Button children={"Back"} onClick={resetMini} />
            </div>
        </div>
    );
};


const EducationBox = ({
    degreeOrDiplomaType,
    SchoolName,
    courseOfStudy,
    SchoolLocation,
    YeartoYear,
}) => {
    return (
        <div className='p2EducationBox'>
            <div className="p2DegreeDetails">
                <div>
                    <b>{degreeOrDiplomaType}</b> {" | "}<b>{courseOfStudy}</b>
                </div>
                <div>{YeartoYear}</div>
            </div>
            <div>
                {SchoolName}{" , "}{SchoolLocation}
            </div>
            
        </div>
    );
}


const EducationBlock = ({
    degreeOrDiplomaType,
    courseOfStudy,
    SchoolName,
    SchoolLocation,
    YeartoYear,
    entryId,
    onRemove,
    handleMini,
}) => {
    return (
        <div className='p2EducationBlock'>
            <div>
                <b>{degreeOrDiplomaType}</b>
            </div>
            <div>
                <b>{courseOfStudy}</b>
            </div>
            <div>
                <b>{SchoolName}</b>
            </div>
            <div>{SchoolLocation}</div>
            <div>{YeartoYear}</div>
            <div className='p2EditandRemove'>
                <Button
                    children={<Icon path={mdiMinusCircleOutline} size={1} />}
                    onClick={() => onRemove(entryId)}
                />
                <Button children={"Edit"} onClick={() => handleMini(entryId)} />
            </div>
        </div>
    );
}

export default Page2Education