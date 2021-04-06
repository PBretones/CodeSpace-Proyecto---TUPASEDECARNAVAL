import { Sidebar } from '../../components/Sidebar/Sidebar';
import { CategoriesElements } from '../../components/Categories/CategoriesElements';
import { BrowserRouter, Route, Switch, Link, Router } from 'react-router-dom';
import { CreatorCuarteto } from '../../components/Categories/CreatorCuarteto';

export const Cuarteto = () => {



    return (
        <>
            <div className="creator">
                <Sidebar />
                <CreatorCuarteto />
            </div>
        </>
    );
}