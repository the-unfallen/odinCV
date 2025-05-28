import { StrictMode, useRef, useState } from "react";

import CvNav from "./CvNav.jsx";
import Page from "./Page.jsx";
import Button from "./Button.jsx";
import Page2 from "./page2/Page2.jsx";

// sometime in the future, we will use state to switch between templates.
// we wont display all the templates at once, the state will help to decide which template to display.

export default function NewApp() {
    const cvRef = useRef();

    const [template, setTemplate] = useState("Template 1");

    const switchToTemplate1 = () => {
        setTemplate("Template 1");
    };

    const switchToTemplate2 = () => {
        setTemplate("Template 2");
    };

    const handleDownload = () => {
        window.print();
    };

    if (template === "Template 1") {
        return (
            <StrictMode>
                <CvNav />
                <Page ref={cvRef} />
                <Button
                    button_class="downloadButton no-print"
                    onClick={handleDownload}
                    children={"Print / Save CV"}
                ></Button>
                <div className="templateButtons">
                  <Button children={"Template 1"} onClick={switchToTemplate1} />
                  <Button children={"Template 2"} onClick={switchToTemplate2} />
                </div>
            </StrictMode>
        );
    }

    if (template === "Template 2") {
        return (
            <StrictMode>
                <CvNav />
                <Page2 ref={cvRef} />
                <Button
                    button_class="downloadButton no-print"
                    onClick={handleDownload}
                    children={"Print / Save CV"}
                ></Button>
                <div className="templateButtons">
                  <Button children={"Template 1"} onClick={switchToTemplate1} />
                  <Button children={"Template 2"} onClick={switchToTemplate2} />
                </div>
            </StrictMode>
        );
    }
}
