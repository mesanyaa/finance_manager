import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MainPage, CategoriesPage, AddPage, AuthPage, Page404 } from '../pages';

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/categories" element={<CategoriesPage />} />
                <Route path="/add" element={<AddPage />} />
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/*" element={<Page404 />} />
            </Routes>
        </Router>
    );
};

export default App;
