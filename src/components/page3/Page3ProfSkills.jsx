import { useState } from 'react';
import { useRef } from 'react';

import Icon from '@mdi/react';
import { mdiMinusCircleOutline } from '@mdi/js';
import { mdiPlusCircleOutline } from '@mdi/js';
import Button from '../Button';

import '../../styles/page2/Page2ProfSkills.css'

const Page3ProfessionalSkills = () => {
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
            <div>
                <div>Professional Skills</div>
                <div>
                    <ul>
                        {skillsSet.map((skill)=>{
                            return <li key={skill.id}>{skill.title}</li>
                        })}
                    </ul>
                    <div>
                        <Button children='Edit Skills' onClick={handleEditState}/>
                    </div>
                </div>
            </div>
        )
    }else{
        return(
            <div>
                <div>Professional Skills</div>
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
                            <div><input type="text" onChange={handleChange} ref={inputRef}/><Button  children={<Icon path={mdiPlusCircleOutline} size={1.2} />} onClick={addNewSkill}/></div>
                            <div><Button children={'Done'} onClick={handleEditState}/></div>
                        </>
                    )}
                
                </div>
            </div>
        )
    }
}



const Skills = ({
    skills,
    onRemove,
    editMe,
    skillLog,
    miniEditState,
    submitSkill,
    updateSkillLog,
}) => (
    <div>
        {skills.map((skill) => {
            if (miniEditState === skill.id) {
                return (
                    <div key={skill.id}>
                        <input
                            type="text"
                            value={skillLog.title}
                            onChange={updateSkillLog}
                            name="title"
                        />
                        <Button
                            children={"Done"}
                            onClick={() => submitSkill(skill.id)}
                        />
                    </div>
                );
            } else {
                return (
                    <div key={skill.id}>
                        <div>{skill.title}</div>
                        <div>
                            <button
                                onClick={() => onRemove(skill.id)}
                            >
                                <Icon path={mdiMinusCircleOutline} size={1.2} />
                            </button>
                            <Button
                                children={"Edit"}
                                onClick={() => editMe(skill.id)}
                            />
                        </div>
                    </div>
                );
            }
        })}
    </div>
);


export default Page3ProfessionalSkills