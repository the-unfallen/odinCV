import React, { forwardRef } from 'react';

import PageHeader from "./PageHeader"
import PageMain from "./PageMain"
import '../styles/Page.css'



const Page = forwardRef((props, ref) => {
  return (
    <div id="pageDiv" ref={ref}>
      <PageHeader />
      <PageMain />
    </div>
  );
});

export default Page;