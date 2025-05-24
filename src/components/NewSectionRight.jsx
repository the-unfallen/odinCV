import '../styles/NewSectionRight.css'
import Icon from '@mdi/react';
import Button  from './Button.jsx'; 

export default function NewSectionRight({sectionClass, displayNewCustomSection}){
    return(
        <div className={sectionClass}>
            <Button 
                button_class={'add-custom-section-button'}
                children={<span className='add-custom-section-child'>Add Custom Section</span>}
                onClick={displayNewCustomSection}
            /> 
        </div>
    )
}