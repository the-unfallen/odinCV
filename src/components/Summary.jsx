
import '../styles/Summary.css'
import Button from './Button.jsx'
import { useState } from 'react'

export default function Summary() {
    const SampleText = "The summary section of a resume should provide a concise and compelling overview of who you are as a professional, highlighting your most relevant skills, experiences, and accomplishments in 3–4 impactful sentences. It should begin with your job title or professional identity (e.g., 'Full-Stack Web Developer' or 'Data Analyst') and immediately establish your years of experience or key industry exposure. Next, it should briefly mention your strongest technical or soft skills, your area of expertise, and any notable achievements or certifications. The goal is to quickly communicate your value to potential employers and entice them to keep reading your resume. Avoid vague statements and focus on what makes you unique, keeping the tone confident, professional, and tailored to the job you’re applying for."
    const initialText = JSON.parse(localStorage.getItem('summaryText')) || SampleText;
    const [editState, setEditState] = useState(false);
    const [summaryText, setSummaryText] = useState(initialText);

    const toggleEditState = () => {
        setEditState(prev => !prev);
    }

    const submitSummary = () => {
        localStorage.setItem('summaryText', JSON.stringify(summaryText));
        setEditState(false);
    }

    const handleChange = (e) => {
        setSummaryText(e.target.value);
    }

    const backFromSummary = () => {
        setEditState(false);
    }



    if(!editState){
        return(
            <div id='summaryDiv'>
                <div id="summaryTitle">Summary</div>
                <div id="summaryBody">
                    {summaryText}
                </div>
                <div className='button-parent' id='editSummaryDiv'>
                    <Button button_id='editSummary' children='Edit Summary' onClick={toggleEditState}/>
                </div>
            </div>
        )
    }else{
        return (
            <div className="summaryDivBox">
                <div id="summaryTitle">Summary</div>
                <textarea
                    name="summaryTextArea"
                    className="summaryTextBox"
                    value={summaryText}
                    onChange={handleChange}
                ></textarea>
                <div className='button-parent-submit'>
                    <Button button_class="summarySubmit" children="Submit" onClick={submitSummary} />
                    <Button button_class="summarySubmit" children="Back" onClick={backFromSummary} />
                </div>
            </div>
        );
    }

}