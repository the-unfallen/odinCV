import React, { Component } from 'react';
import { useState } from 'react';

import Icon from '@mdi/react';
import { mdiCellphone } from '@mdi/js';
import { mdiEmail } from '@mdi/js';
import { mdiHome } from '@mdi/js';
import { mdiLinkedin } from '@mdi/js';
import Button from './Button.jsx'; 


import '../styles/ContactSegment.css';

export default function Contact() {
    const defaultPersonContact = JSON.parse(localStorage.getItem('personContactData')) || {phone:'+2348123456789', email:'myemail@gmail.com', location:'city, State, Country', linkedin:'myself'};
    
    const [editState, setEditState] = useState(false);
    const [personContact, setPersonContact] = useState(defaultPersonContact)

    function handleEdit(){
        setEditState(prev => !prev);
    }

    function submitForm(e){
        e.preventDefault();
        localStorage.setItem('personContactData', JSON.stringify(personContact));
        setEditState(false);

    }

    function handleChange(e) {
        const { name, value } = e.target;
        console.log('Editing.....................');
        setPersonContact(prevData => ({
            ...prevData,
            [name]: value,
        })
    );
    }

    if(!editState){
        return(
            <div>
                <div id="contactHeader">CONTACT</div>
                <div id="contactSegment">
                    <div id="contactTelephone">
                        <span><Icon path={mdiCellphone} size={1}/></span>
                        <span>{personContact.phone}</span>
                    </div>
                    <div id="contactEmail">
                        <span><Icon path={mdiEmail} size={1} /></span>
                        <span>{personContact.email}</span>
                    </div>
                    <div id="contactLocation">
                        <span><Icon path={mdiHome} size={1} /></span>
                        <span>{personContact.location}</span>
                    </div>
                    <div id="contactLinkedIn">
                        <span><Icon path={mdiLinkedin} size={1} /></span>
                        <span>{personContact.linkedin}</span>
                    </div>
                    <div id='editContactDiv' className='button-parent'>
                        <Button button_id='editContact' onClick={handleEdit} children='Edit Contact'/>
                    </div>
                </div>
            </div>
        )
    }else{
        return (
            <div>
                <div id="contactHeader">CONTACT</div>
                <div id="editContactDetails">
                    <form action="" onSubmit={submitForm} id="contactEditForm">
                        <div>
                            <label htmlFor="">Telephone</label>
                            <input type="telephone" name="phone" value={personContact.phone} onChange={handleChange}/>
                        </div>
                        <div>
                            <label htmlFor="">Email</label>
                            <input type="email" name="email" value={personContact.email} onChange={handleChange}/>
                        </div>
                        <div>
                            <label htmlFor="">City, state, Country</label>
                            <input type="text" name="location"  value={personContact.location} onChange={handleChange}/>
                        </div>
                        <div>
                            <label htmlFor="">Linkedin @username</label>
                            <input type="text" name="linkedin" value={personContact.linkedin} onChange={handleChange}/>
                        </div>
                        <div id="submitContactDiv"><Button type="submit">Submit</Button></div>
                    </form>
                </div>
            </div>
        )
    }

    
}