import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { MainPage, CategoriesPage, AddPage, AuthPage, Page404 } from '../pages';
import {
    MAIN_ROUTE,
    ADD_ROUTE,
    AUTH_ROUTE,
    CATEGORIES_ROUTE,
    ERROR_ROUTE,
} from '../consts';

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path={CATEGORIES_ROUTE} element={<CategoriesPage />} />
                <Route path={ADD_ROUTE} element={<AddPage />} />
                <Route path={AUTH_ROUTE} element={<AuthPage />} />
                <Route path={MAIN_ROUTE} element={<MainPage />} />
                <Route path={ERROR_ROUTE} element={<Page404 />} />
            </Routes>
        </Router>
    );
};

export default App;
