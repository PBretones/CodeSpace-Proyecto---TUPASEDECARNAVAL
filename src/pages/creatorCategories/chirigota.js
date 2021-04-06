import { Sidebar } from '../../components/Sidebar/Sidebar';
import { CategoriesElements } from '../../components/Categories/CategoriesElements';
import { BrowserRouter, Route, Switch, Link, Router } from 'react-router-dom';
import { CreatorChirigota } from '../../components/Categories/CreatorChirigota';

export const Chirigota = () => {



    return (
        <>
            <div className="creator">
                <Sidebar />
                <CreatorChirigota />
            </div>
        </>
    );
}