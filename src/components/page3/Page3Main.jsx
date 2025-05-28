

import '../../styles/page2/Page2Main.css'
import Page3WorkExperience from './Page3WorkExperience'
import Page3ProfessionalSkills from './Page3ProfSkills'
import Page3ComputerSkills from './Page3CompSkills'
import Page3Education from './Page3Education'
import CustomSectionMain from './CustomSectionMain'

const Page3Main = () => {
    return (
        <div id='page3Main'>
            <Page3WorkExperience/>
            <Page3ProfessionalSkills/>
            <Page3ComputerSkills/>
            <Page3Education/>
            <CustomSectionMain/>
        </div>
    )
}


export default Page3Main