import { useState } from 'react'

import Button from '../Button';




const BlankHeader = () => {
    const [sectionState, setSectionState] = useState(false);

    const savedHeaderData = JSON.parse(localStorage.getItem('personData')) || { firstName: "firstName", lastName: "lastName", jobTitle: "Job Title"};
    const [person, setPerson] = useState(savedHeaderData);
    const defaultPersonContact = JSON.parse(localStorage.getItem('personContactData')) || {phone:'+2348123456789', email:'myemail@gmail.com', location:'city, State, Country', linkedin:'myself'};
    const [personContact, setPersonContact] = useState(defaultPersonContact);
    const SampleText = "The summary section of a resume should provide a concise and compelling overview of who you are as a professional, highlighting your most relevant skills, experiences, and accomplishments in 3–4 impactful sentences. It should begin with your job title or professional identity (e.g., 'Full-Stack Web Developer' or 'Data Analyst') and immediately establish your years of experience or key industry exposure. Next, it should briefly mention your strongest technical or soft skills, your area of expertise, and any notable achievements or certifications. The goal is to quickly communicate your value to potential employers and entice them to keep reading your resume. Avoid vague statements and focus on what makes you unique, keeping the tone confident, professional, and tailored to the job you’re applying for."
    const initialText = JSON.parse(localStorage.getItem('summaryText')) || SampleText;
    const [summaryText, setSummaryText] = useState(initialText);


    const ToggleSectionState = () => {
        setSectionState(prev => !prev);
    }

    const handleChangePerson = (e) => {
        const {name, value} = e.target;
        localStorage.setItem('personData', JSON.stringify({...person, [name]: value}));
        setPerson(prev => ({...prev, [name]: value}));
    }

    const handleContactChange = (e) => {
        const {name, value} = e.target;
        localStorage.setItem('personContactData', JSON.stringify({...person, [name]:value}));
        setPersonContact(prev => ({...prev, [name]: value}));
    }

    const handleSummaryChange = (e) => {
        localStorage.setItem('summaryText', JSON.stringify(summaryText));
        setSummaryText(e.target.value);
    }

    if(sectionState){
        return(
            <div id='page2Header'>
                section state is true(Edit Mode)
                <div>
                    <label>
                        First Name:
                        <input
                            name='firstName'
                            value={person.firstName}
                            onChange={handleChangePerson}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Last Name:
                        <input
                            name='lastName'
                            value={person.lastName}
                            onChange={handleChangePerson}
                        />
                    </label>
                </div>
                <div>
                    Edit Home Address
                    <label>
                        City, State, Country:
                        <input
                            name='location'
                            value={personContact.location}
                            onChange={handleContactChange}
                        />
                    </label>
                </div>
                <div>
                    Email Address
                    <label>
                        Email:
                        <input
                            name='email'
                            value={personContact.email}
                            onChange={handleContactChange}
                        />
                    </label>
                </div>
                <div>
                    Phone Number
                    <label>
                        Phone Number:
                        <input
                            name='phone'
                            value={personContact.phone}
                            onChange={handleContactChange}
                        />
                    </label>

                </div>
                <div>
                    <label>
                        Job Title:
                        <input
                            name='jobTitle'
                            value={person.jobTitle}
                            onChange={handleChangePerson}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Professional Summary:
                        <textarea
                            rows={10}
                            value={summaryText}
                            onChange={handleSummaryChange}
                        />
                    </label>
                </div>
                <Button
                    children={'Done'}
                    onClick={ToggleSectionState}
                />
            </div>
        )
    }else{
        return(
            <div id='page2Header'>
                section state is false(Display Mode)
                <div>{person.firstName} {person.lastName}</div>
                <div><span>{personContact.location}</span>|<span>{personContact.email}</span>|<span>{personContact.phone}</span></div>
                <div>{person.jobTitle}</div>
                <div>{summaryText}</div>
                <Button
                    children={'Edit Section'}
                    onClick={ToggleSectionState}
                />
            </div>
        )
    }

    
}

export default BlankHeader

