import {Outlet } from 'react-router-dom';

import Tab from './Tab.jsx';
import Banner from "./Banner.jsx";
import './MainLayout.css';


// src/layouts/MainLayout.jsx
const MainLayout = () => {
    return (
        <div className="main-layout">
            {/* 좌측 탭 */}
            <Tab></Tab>

            {/* 좌측 탭 따라 바뀌는 중앙 컨텐츠 */}
            <div className="content">
                <Outlet /> 
            </div>

            {/* 우측 배너 */}
            <Banner/>
        </div>
    );
};

export default MainLayout;
