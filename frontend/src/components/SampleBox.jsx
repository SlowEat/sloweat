// src/components/SampleBox.jsx
const SampleBox = ({ data }) => {
    return (
        <div style={{ padding: '10px', border: '1px solid #ccc' }}>
            <h4>📦 Sample Data</h4>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
};

export default SampleBox;
