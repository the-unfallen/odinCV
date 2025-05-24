import React, { useState } from "react";
import Button from './Button'
import '../styles/PageHeader.css'



export default function PageHeader() {
    const savedHeaderData = JSON.parse(localStorage.getItem('personData')) || { firstName: "firstName", lastName: "lastName", jobTitle: "Job Title"};
    const [person, setPerson] = useState(savedHeaderData);
    const [editState, setEditState] = useState(false);

    const fullName = `${person.firstName} ${person.lastName}`.trim();

    function editTitleHandler(){
        setEditState(prev => !prev);
    }
    function submitForm(e){
        e.preventDefault();
        localStorage.setItem('personData', JSON.stringify(person));
        setEditState(false);
    }
    function handleChange(e){
        setPerson(prevData => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }));

    }
    if(editState){
        console.log('Editing is in progress....');
        return(
            <div id='pageHeader2'>
                <form action="" id="headerForm" onSubmit={submitForm}>
                    <div id="firstNameDiv">
                        <label > First Name: </label>
                        <input type="text" name="firstName"  onChange={handleChange} value={person.firstName}/>
                    </div>
                    
                    <div id="lastNameDiv">
                        <label> Last Name: </label>
                        <input type="text" name="lastName"  onChange={handleChange} value={person.lastName}/>
                    </div>
                    
                    <div id="jobTitleDiv">
                        <label> Job Title: </label>
                        <input type="text" name="jobTitle" onChange={handleChange} value={person.jobTitle}/>
                    </div>
                    
                    <div id="submitHeaderDiv"><Button type="submit">Submit</Button></div>
                </form>
            </div>
        )
    }else{
        return(
            <div id='pageHeader'>
                <div id="fullName">{ fullName }</div>
                <div id="jobTitle">{person.jobTitle}</div>
                <Button button_id={'editTitle'} onClick={editTitleHandler}>Edit Title</Button>
            </div>
        )
    }

}