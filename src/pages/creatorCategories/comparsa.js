import { Sidebar } from '../../components/Sidebar/Sidebar';
import { BrowserRouter, Route, Switch, Link, Router } from 'react-router-dom';
import { CreatorComparsa } from '../../components/Categories/CreatorComparsa';
import React from 'react';


export const Comparsa = () => {
    return (
        <>
            <div className="creator">
                <Sidebar />
                <CreatorComparsa />
            </div>
        </>
    );
}




