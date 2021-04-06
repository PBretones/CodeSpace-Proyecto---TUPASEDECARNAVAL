import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic } from "@fortawesome/free-solid-svg-icons";

export const Nav = ({ setLibraryStatus, libraryStatus }) => {
    return (
        <nav className="myNav">
            <button onClick={() => setLibraryStatus(!libraryStatus)}>
                <FontAwesomeIcon icon={faMusic} />
            </button>
        </nav>)
}