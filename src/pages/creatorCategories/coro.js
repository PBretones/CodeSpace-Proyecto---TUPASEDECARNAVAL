import { Sidebar } from '../../components/Sidebar/Sidebar';
import { CategoriesElements } from '../../components/Categories/CategoriesElements';
import { BrowserRouter, Route, Switch, Link, Router } from 'react-router-dom';
import { CreatorCoro } from '../../components/Categories/CreatorCoro';

export const Coro = () => {



    return (
        <>
            <div className="creator">
                <Sidebar />
                <CreatorCoro />

            </div>
        </>
    );
}