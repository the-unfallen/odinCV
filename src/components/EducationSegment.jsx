import Icon from '@mdi/react';
import { useState } from 'react';
import '../styles/EducationSegment.css'
import Button from './Button.jsx';
import { useRef } from 'react';
import { mdiMinusCircleOutline } from '@mdi/js';




export default function EducationSegment() {
    const [editState, setEditState] = useState(false);
    const [miniState, setMiniState] = useState(null);
    const inputRef1 = useRef();
    const inputRef2 = useRef();
    const inputRef3 = useRef();
    const inputRef4 = useRef();
    const inputRef5 = useRef();
    const [miniLog, setMiniLog] = useState('');

    const educationRecord = [
        {degreeType: 'BSC', course: 'Surveying and Geoinformatics', school: 'Unilag', location: 'Lagos, Nigeria', duration:'2018-2022', id: crypto.randomUUID()},
        {degreeType: 'MSC', course: 'Surveying and Geoinformatics', school: 'Unilag', location: 'Lagos, Nigeria', duration:'2023-2025', id: crypto.randomUUID()},
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
            <div>
                <div id="educationTitle">EDUCATION</div>
                <div id="educationDiv">
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
                    <div className='button-parent' id='editEducationDiv'>
                        <Button button_id='editEducation' children='Edit Education' onClick={handleEditState}/>
                    </div>
                </div>
            </div>
        )
    }else{
        return(
            <div>
                <div id="educationTitle">EDUCATION</div>
                <div className='editEducationSegment'>
                    {educationLog.map((record) => {
                        console.log({miniState});
                        console.log('record.id', record.id);
                        if(miniState === record.id){
                            return(
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
                            )
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
                    { miniState === null && (
                        <>
                        <div id="addEducationDiv">
                            <div>
                                <label htmlFor="">Degree or Diploma</label>
                                <input type="text" name='degreeType' id="" ref={inputRef1} onChange={handleInputChange}/>
                            </div>
                            <div>
                                <label htmlFor="">Course of Study</label>
                                <input type="text" name='course' id="" ref={inputRef5} onChange={handleInputChange}/>
                            </div>
                            <div>
                                <label htmlFor="">School or Institution</label>
                                <input type="text" name='school' id=""  ref={inputRef2} onChange={handleInputChange}/>
                            </div>
                            <div>
                                <label htmlFor="">City, State, Country</label>
                                <input type="text" name='location' id=""  ref={inputRef3} onChange={handleInputChange}/>
                            </div>
                            <div>
                                <label htmlFor="">Year to Year</label>
                                <input type="text" name='duration' id=""  ref={inputRef4} onChange={handleInputChange}/>
                            </div>
                        </div>
                        <div className='buttonGroupsForNewEducationRecord'>
                            <Button button_id='submitEducation' button_class={''} children='Submit New' onClick={handleSubmission}/>
                            <Button button_id='backFromNew' button_class={''} children='Back' onClick={handleBackFromNew}/>

                        </div>
                        </>
                    )}
                </div>
            </div>
        )
    }


}

function EducationBlock({degreeOrDiplomaType, courseOfStudy, SchoolName, SchoolLocation, YeartoYear, entryId, onRemove, handleMini}) {
    return(
        <div>
            <div className="degreeType"><b>{degreeOrDiplomaType}</b></div>
            <div><b>{courseOfStudy}</b></div>
            <div className="schoolName"><b>{SchoolName}</b></div>
            <div className="schoolLocation">{SchoolLocation}</div>
            <div className="duration">{YeartoYear}</div>
            <div className='educationButtonsBlock'>
                <Button button_id={'minus_svg'} children={<Icon path={mdiMinusCircleOutline} size={1.25} />} onClick={() => onRemove(entryId)}/>
                <Button children={'Edit'} onClick={() => handleMini(entryId)}/>
            </div>
        </div>
    )
}
function EducationBox({degreeOrDiplomaType, SchoolName, courseOfStudy, SchoolLocation, YeartoYear}) {
    return(
        <div className='educationBox'>
            <div className="degreeType"><b>{degreeOrDiplomaType}</b></div>
            <div><b>{courseOfStudy}</b></div>
            <div className="schoolName"><b>{SchoolName}</b></div>
            <div className="schoolLocation">{SchoolLocation}</div>
            <div className="duration">{YeartoYear}</div>
        </div>
    )
}


function EducationLog({handleChange, degree, school, location, course, duration, resetMini, submitMini, entryId}){
    return(
        <div id="educationLogDiv">
            <div>
                <label htmlFor="">Degree or Diploma</label>
                <input type="text" name='degreeType' id="" value={degree} onChange={handleChange}/>
            </div>
            <div>
                <label htmlFor="">Course of Study</label>
                <input type="text" name='course'  value={course} onChange={handleChange}/>
            </div>
            <div>
                <label htmlFor="">School or Institution</label>
                <input type="text" name='school' id="" value={school} onChange={handleChange}/>
            </div>
            <div>
                <label htmlFor="">City, State, Country</label>
                <input type="text" name='location' id="" value={location}  onChange={handleChange}/>
            </div>
            <div>
                <label htmlFor="">Year to Year</label>
                <input type="text" name='duration' id="" value={duration}  onChange={handleChange}/>
            </div>
            <div>
                <Button children={'Done'} onClick={() => submitMini(entryId)}/>
                <Button children={'Back'} onClick={resetMini}/>
            </div>
            
        </div>
    )
}
