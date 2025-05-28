import React, { forwardRef } from 'react';

import '../../styles/page2/Page2.css'
import Page2Header from './Page2Header'
import Page2Main from './Page2Main'

const Page2 = forwardRef((props, ref) => {
    return(
        <div id='page2Div' ref={ref}>
            <Page2Header/>
            <Page2Main/>
        </div>
        
    )
})

export default Page2