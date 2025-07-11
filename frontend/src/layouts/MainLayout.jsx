// src/layouts/MainLayout.jsx
const MainLayout = ({ children }) => {
    return (
        <div style={{ display: 'flex', height: '100vh' }}>
            <aside style={{ width: '200px', backgroundColor: '#f4f4f4', padding: '1rem' }}>
                <h3>Sidebar</h3>
            </aside>
            <main style={{ flex: 1, padding: '1rem' }}>{children}</main>
        </div>
    );
};

export default MainLayout;
