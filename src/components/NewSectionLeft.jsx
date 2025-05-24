import '../styles/NewSectionLeft.css'
import Button from './Button';

export default function NewSectionLeft({sectionClass, displayNewCustomSection}){
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