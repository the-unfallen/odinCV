
import { StrictMode, useRef } from 'react'


import CvNav from './CvNav.jsx'
import Page from './Page.jsx'
import Button from './Button.jsx'

export default function NewApp() {
    const cvRef = useRef();

    const handleDownload = () => {
        window.print();
    };

    return (
    <StrictMode>
      <CvNav />
      <Page ref={cvRef} />
      <Button 
        button_class="downloadButton no-print" 
        onClick={handleDownload}
        children={'Print / Save CV'}
        >
        
      </Button>
    </StrictMode>
  );
}