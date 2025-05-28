

import '../../styles/page2/Page2Main.css'
import Page2WorkExperience from './Page2WorkExperience'
import Page2ProfessionalSkills from './Page2ProfSkills'
import Page2ComputerSkills from './Page2CompSkills'
import Page2Education from './Page2Education'
import CustomSectionMain from './CustomSectionMain'

const Page2Main = () => {
    return (
        <div id='page2Main'>
            <Page2WorkExperience/>
            <Page2ProfessionalSkills/>
            <Page2ComputerSkills/>
            <Page2Education/>
            <CustomSectionMain/>
        </div>
    )
}


export default Page2Main