import CollectionHeader from '../../components/user/CollectionHeader';
import CollectionCard from '../../components/user/CollectionCard';
import '../../layouts/user/MainLayout.css';

export default function Bookmark() {
  return (
    <div className="main-layout-content">
      {/* Header */}
      <div className="postDetail-header">
        <h1 className="tap-title">북마크</h1>
        <div style={{ width: '663px' }}></div>
        <CollectionHeader count={3} />
      </div>

     <div
      className="collection-list"
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '20px',
        marginTop: '20px',
      }}
     >
      <CollectionCard />
      <CollectionCard />
      <CollectionCard />
      <CollectionCard />
      <CollectionCard />
    </div>
    
    </div>
  );
}
