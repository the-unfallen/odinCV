import Icon from '@mdi/react';
import { mdiMinusCircleOutline } from '@mdi/js';
import { mdiPlusCircleOutline } from '@mdi/js';
import '../styles/ProfessionalSkills.css'
import Button from './Button.jsx'
import { useState } from 'react';
import { useRef } from 'react';


export default function ProfessionalSkills() {
    const [editState, setEditState] = useState(false);
    const inputRef = useRef();

    const profSkills =[
        {title:'Conflict Resolution', id:crypto.randomUUID()},
        {title:'Project Planning', id:crypto.randomUUID()},
        {title:'Public Speaking', id:crypto.randomUUID()},
        {title:'Competitive Strategies', id:crypto.randomUUID()},
        {title:'Client Development', id:crypto.randomUUID()},
        {title:'Risk Assessment', id:crypto.randomUUID()},
        {title:'Increasing Productivity', id:crypto.randomUUID()},
        {title:'Cost Reduction', id:crypto.randomUUID()},
    ]

    const initialData = JSON.parse(localStorage.getItem('professionalSkillsData')) || [...profSkills];



    const [skillsSet, setSkills] = useState(initialData);
    const [newSkill, setNewSkill] = useState('');
    const [miniEditState, setMiniEditState] = useState(null);
    const [skillLog, setSkillLog] = useState('')

    function handleEditState(){
        setEditState(prev => !prev);
    }



    const removeObjectFromArray = uniqueId => {
        let indexofUniqueId = null;
        for(let i = 0; i < skillsSet.length; i++){
            if(skillsSet[i].id === uniqueId){
                indexofUniqueId = i;
                break;
            }
        }
        const newSkillsSet = [...skillsSet.slice(0, indexofUniqueId), ...skillsSet.slice(indexofUniqueId + 1)];
        localStorage.setItem('professionalSkillsData', JSON.stringify(newSkillsSet));
        setSkills(newSkillsSet);
        
    }

    const handleChange = (e) => {
        setNewSkill(e.target.value);
    }

    const addNewSkill = () => {
        const newSkillItem = {title: newSkill, id:crypto.randomUUID()};
        localStorage.setItem('professionalSkillsData', JSON.stringify([...skillsSet, newSkillItem]));
        setSkills(prev => [...prev, newSkillItem]);
        
        inputRef.current.value = '';
    }

    function toggleMiniEditState(uniqueId){
        let currentSkillLog = null;
        for(let i = 0; i < skillsSet.length; i++){
            if(skillsSet[i].id === uniqueId){
                currentSkillLog = skillsSet[i];
            }
        }
        setSkillLog(currentSkillLog);
        setMiniEditState(uniqueId);
        setEditState(true);

    }

    function submitSkill(uniqueId) {
        let allSkillsSet = [...skillsSet];
        for(let i = 0; i < allSkillsSet.length; i++) {
            if(allSkillsSet[i].id === uniqueId){
                allSkillsSet[i] = skillLog;
                break;
            }
        }
        localStorage.setItem('professionalSkillsData', JSON.stringify(allSkillsSet));
        setSkills(allSkillsSet);

        setMiniEditState(null);
        setSkillLog('');
        setEditState(true);

    }

    function updateSkillLog(e) {
        const {name, value} = e.target;
        setSkillLog(prev => ({...prev, [name]: value}));
    }







    if(!editState){
        return(
            <div className='profprof'>
                <div id="profSkillsTitle">Professional Skills</div>
                <div id="profSkillsDiv">
                    <ul className='custom-indent'>
                        {skillsSet.map((skill)=>{
                            return <li key={skill.id}>{skill.title}</li>
                        })}
                    </ul>
                    <div className='button-parent' id='editProfessionalSkillsDiv'>
                        <Button button_id='editProfessionalSkills' children='Edit Skills' onClick={handleEditState}/>
                    </div>
                </div>
            </div>
        )
    }else{
        return(
            <div>
                <div id="profSkillsTitle2">Professional Skills</div>
                <div >
                    <Skills
                        skills={skillsSet}
                        onRemove={removeObjectFromArray}
                        editMe={toggleMiniEditState}
                        skillLog={skillLog}
                        miniEditState={miniEditState}
                        submitSkill={submitSkill}
                        updateSkillLog={updateSkillLog}
                    />
                    { miniEditState === null && (
                        <>
                            <div className="addSkills"><input type="text" onChange={handleChange} ref={inputRef}/><Button button_id={'addAskillButton'} children={<Icon path={mdiPlusCircleOutline} size={1.2} />} onClick={addNewSkill}/></div>
                            <div className="doneSkills"><Button children={'Done'} button_id={'doneButtonProf'} onClick={handleEditState}/></div>
                        </>
                    )}
                
                </div>
            </div>
        )
    }


}


const Skills = ({ skills, onRemove, editMe, skillLog, miniEditState, submitSkill, updateSkillLog}) => (
    <div className='profSkillItem'>
        {
            skills.map((skill) => {
                if(miniEditState === skill.id){
                    return(
                        <div key ={skill.id} className='miniEditClass'>
                            <input type="text" value={skillLog.title} onChange={updateSkillLog} name='title' />
                            <Button children={'Done'} button_id={'doneButtonProf2'} onClick={() => submitSkill(skill.id)}/>
                        </div>
                    )
                }else{
                    return(
                        <div key ={skill.id}>
                            <div>{skill.title}</div>
                            <div className='profSkillsButtonGroup'>
                                <button id="removeButton" onClick={() => onRemove(skill.id)}><Icon path={mdiMinusCircleOutline} size={1.2} /></button>
                                <Button button_id={'editbuttonProf'}children={'Edit'} onClick={() => editMe(skill.id)}/>
                            </div>
                        </div>
                    )
                }

                
            })
        }
    </div>
)


