import CollectionHeader from '../../components/bookmark/CollectionHeader';
import CollectionCard from '../../components/bookmark/CollectionCard';
import {useEffect, useState} from "react";
import '../../layouts/user/MainLayout.css';
import api from '../../api/axiosInstance';

export default function Bookmark() {
    const [collections, setCollections] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCollections = async () => {
            try {
                const response = await api.get('/api/bookmark-collections');
                setCollections(response.data);
            } catch (error) {
                console.error('북마크 컬렉션 불러오기 실패:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchCollections();
    }, []);

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
         {collections.map((collection) => (
             <CollectionCard key={collection.collectionId} collection={collection} />
         ))}
    </div>
    
    </div>
  );
}
