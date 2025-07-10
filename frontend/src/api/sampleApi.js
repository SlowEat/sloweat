// src/api/sampleApi.js
export const postSampleData = async () => {
    const response = await fetch('http://localhost:8080/api/sample', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({ name: "tester" }),
    });

    if (!response.ok) {
        throw new Error('API 요청 실패');
    }

    return response.json();
};