// src/routes/AppRouter.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SamplePage from '../pages/SamplePage';

const AppRouter = () => (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<SamplePage />} />
        </Routes>
    </BrowserRouter>
);

export default AppRouter;
