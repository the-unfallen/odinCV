
import '../styles/PageMain.css'
import Contact from './ContactSegment.jsx'
import EducationSegment from './EducationSegment.jsx'
import ProfessionalSkills from './ProfessionalSkills.jsx'
import ComputerSkills from './ComputerSkills.jsx'
import Summary from './Summary.jsx'
import WorkExperience from './WorkExperience.jsx'
import CustomSectionLeft from './CustomSectionLeft.jsx'
import CustomSectionRight from './CustomSectionRight.jsx'


// import '../styles/NewSectionLeft.css'

export default function PageMain() {
    
    
    return (
        <div id="pageMain">
            <div id="leftSection">
                <Contact/>
                <EducationSegment/>
                <ProfessionalSkills/>
                <ComputerSkills/>
                <CustomSectionLeft/>
            </div>
            <div id="rightSection">
                <Summary/>
                <WorkExperience/>
                <CustomSectionRight/>
            </div>
        </div>
    )
}