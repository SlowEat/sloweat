import CollectionHeader from '../../components/bookmark/CollectionHeader';
import CollectionCard from '../../components/bookmark/CollectionCard';
import { useEffect, useState } from 'react';
import '../../layouts/user/MainLayout.css';
import api from '../../api/axiosInstance';
import CollectionEditModal from '../../components/bookmark/CollectionEditModal';
import CollectionCreateModal from '../../components/bookmark/CollectionCreateModal';
import NoMatch from "../../components/user/NoMatch";

export default function Bookmark() {
  // 컬렉션 목록 데이터
  const [collections, setCollections] = useState([]);

  // 컬렉션 추가
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // 컬렉션 수정
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editCollection, setEditCollection] = useState({});
  const openEditModal = (collection) => {
    setEditCollection(collection);
    setIsEditOpen(true);
  };
  const closeEditModal = () => setIsEditOpen(false);

  const fetchCollections = async () => {
    try {
      const response = await api.get('api/bookmark-collections');
      setCollections(response.data);
    } catch (error) {
      console.error('북마크 컬렉션 불러오기 실패:', error);
    }
  };

  useEffect(() => {
    fetchCollections();
  }, []);

  return (
    <div className="main-layout-content">
      {/* Header */}
      <div className="postDetail-header">
        <h1 className="tap-title">북마크</h1>
        <div style={{ width: '663px' }}></div>
        <CollectionHeader count={collections.length} onCreateOpen={openModal} />
      </div>

      {/* 본문 */}
      {collections.length === 0 ? (
        <div>
            <NoMatch title={'생성된 컬렉션이 없습니다 😥'} description={'컬렉션을 생성해 나만의 북마크를 모아보세요'}></NoMatch>
        </div>
      ) : (
        <div
          className="collection-list"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '20px',
            marginTop: '20px'
          }}
        >
          {collections.map((collection) => (
            <CollectionCard
              key={collection.collectionId}
              collection={collection}
              onEditOpen={openEditModal}
              onDeleteSuccess={fetchCollections}
            />
          ))}
        </div>
      )}

      {/* 컬렉션 추가 모달 */}
      <CollectionCreateModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onCreateSuccess={fetchCollections}
      />

      {/* 컬렉션 수정 모달 */}
      <CollectionEditModal
        isOpen={isEditOpen}
        onClose={closeEditModal}
        collection={editCollection}
        onUpdateSuccess={fetchCollections}
      />
    </div>
  );
}
