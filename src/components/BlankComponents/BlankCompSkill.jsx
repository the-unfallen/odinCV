import { useState } from 'react';
import { useRef } from 'react';

import Icon from '@mdi/react';
import { mdiMinusCircleOutline } from '@mdi/js';
import { mdiPlusCircleOutline } from '@mdi/js';
import Button from '../Button';




const BlankComputerSkills = () => {
    const [editState, setEditState] = useState(false);
    const inputRef = useRef();

    const compSkills = [
        { title: 'JavaScript (ES6+)', id: crypto.randomUUID() },
        { title: 'React.js', id: crypto.randomUUID() },
        { title: 'Node.js & Express', id: crypto.randomUUID() },
        { title: 'RESTful API Design', id: crypto.randomUUID() },
        { title: 'Version Control (Git)', id: crypto.randomUUID() },
        { title: 'Database Management (SQL/MongoDB)', id: crypto.randomUUID() },
        { title: 'Responsive Web Design', id: crypto.randomUUID() },
        { title: 'Linux & Command Line Tools', id: crypto.randomUUID() },
    ];

    const initialData = JSON.parse(localStorage.getItem('computerSkillsData')) || [...compSkills];

    const [skillsSet, setSkills] = useState(initialData);
    const [newSkill, setNewSkill] = useState('');
    const [miniState, setMiniState] = useState(null);

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
        localStorage.setItem('computerSkillsData', JSON.stringify(newSkillsSet));
        setSkills(newSkillsSet);
    }

    const handleChange = (e) => {
        setNewSkill(e.target.value);
    }

    const addNewSkill = () => {
        const newSkillItem = {title: newSkill, id:crypto.randomUUID()};
        localStorage.setItem('computerSkillsData', JSON.stringify([...skillsSet, newSkillItem]));
        setSkills(prev => [...prev, newSkillItem]);
        inputRef.current.value = '';
    }

    const handleMiniState = (uniqueId) => {
        for(let i = 0; i < skillsSet.length; i++){
            if(skillsSet[i].id === uniqueId){
                setMiniState(skillsSet[i]);
                break;
            }
        }
    }

    const handleMiniChange = (e) => {
        const {name, value} = e.target;
        setMiniState(prev => ({...prev, [name]:value}));
    }

    const submitMini = () => {
        const skillsSetContainer = [...skillsSet];
        for(let i = 0; i < skillsSetContainer.length; i++){
            if(skillsSetContainer[i].id === miniState.id){
                skillsSetContainer[i] = miniState;
                break;
            }
        }
        localStorage.setItem('computerSkillsData', JSON.stringify(skillsSetContainer));
        setSkills(skillsSetContainer);
        setMiniState(null);
    }
    if(!editState){
        return(
            <div>
                <div>Computer Skills</div>
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
                <div>Computer Skills</div>
                <div>
                    <Skills
                        skills={skillsSet}
                        onRemove={removeObjectFromArray}
                        handleMiniState={handleMiniState}
                        miniState={miniState}
                        handleMiniChange={handleMiniChange}
                        submitMini={submitMini}
                    />
                    {miniState === null && (
                        <>
                            <div>
                                <input type="text" onChange={handleChange} ref={inputRef}/>
                                <Button children={<Icon path={mdiPlusCircleOutline} size={1.2} />} onClick={addNewSkill} />
                            </div>
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
    handleMiniState,
    miniState,
    handleMiniChange,
    submitMini,
}) => (
    <div>
        {skills.map((skill) => {
            if (miniState && miniState.id === skill.id) {
                return (
                    <div key={skill.id}>
                        <input
                            type="text"
                            value={miniState.title}
                            name="title"
                            onChange={handleMiniChange}
                        />
                        <Button
                            children={"Done"}
                            onClick={submitMini}
                        />
                    </div>
                );
            } else {
                return (
                    <div key={skill.id}>
                        <div>{skill.title}</div>
                        <div>
                            <Button
                                children={
                                    <Icon
                                        path={mdiMinusCircleOutline}
                                        size={1.2}
                                    />
                                }
                                onClick={() => onRemove(skill.id)}
                            />
                            <Button
                                children={"Edit"}
                                onClick={() => handleMiniState(skill.id)}
                            />
                        </div>
                    </div>
                );
            }
        })}
    </div>
);



export default BlankComputerSkills
