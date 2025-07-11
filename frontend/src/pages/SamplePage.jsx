// src/pages/SamplePage.jsx
import { useEffect, useState } from 'react';
import {postSampleData} from '../api/sampleApi';
import MainLayout from '../layouts/MainLayout';
import SampleBox from '../components/SampleBox';

const SamplePage = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        postSampleData()
            .then((res) => setData(res)).then(() => console.log(data))
            .catch((err) => setError(err.message));
    }, []);

    return (
        <MainLayout>
            <h2>Sample Page</h2>
            {error && <p style={{ color: 'red' }}>에러: {error}</p>}
            {data ? <SampleBox data={data} /> : <p>로딩 중...</p>}
        </MainLayout>
    );
};

export default SamplePage;
