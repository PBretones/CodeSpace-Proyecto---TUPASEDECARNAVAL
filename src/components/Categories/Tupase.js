import React from "react";
import { useLocation, useHistory } from 'react-router-dom';

export const Tupase = ({ children, crumb }) => {
    const history = useHistory();
    const path = useLocation().pathname;
    const breadcrumb = path.split(crumb)[0];

    const myBreadcrumb = () => {
        history.push(`${breadcrumb}`)
    }

    return (<>
        <div className="myBreadcrumb">
            <div className="myTitle"><span className="paseSide">TUPASE<span className="carnavalSide" onClick={myBreadcrumb}>DE{children}</span></span></div>
        </div>
    </>
    );
}