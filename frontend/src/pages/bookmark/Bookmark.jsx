import CollectionHeader from '../../components/bookmark/CollectionHeader';
import CollectionCard from '../../components/bookmark/CollectionCard';
import {useEffect, useState} from "react";
import '../../layouts/user/MainLayout.css';
import api from '../../api/axiosInstance';
import CollectionEditModal from "../../components/bookmark/CollectionEditModal";
import CollectionCreateModal from "../../components/bookmark/CollectionCreateModal";
import BookmarkModal from "../../components/bookmark/BookmarkModal";

export default function Bookmark() {
    //컬렉션 목록 데이터
    const [collections, setCollections] = useState([]);

    //컬렉션 추가
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    //컬렉션 수정
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
        } finally {
        }
    };

    useEffect(() => {
        fetchCollections();
    }, []);


    //북마크 추가
    const [isBookmarkModalOpen, setIsBookmarkModalOpen] = useState(false);
    const openBookmarkModal = () => setIsBookmarkModalOpen(true);
    const closeBookmarkModal = () => setIsBookmarkModalOpen(false);


    return (
    <div className="main-layout-content">
      {/* Header */}
      <div className="postDetail-header">
        <h1 className="tap-title">북마크</h1>
        <div style={{ width: '663px' }}></div>
        <CollectionHeader count={collections.length} onCreateOpen={openModal} openBookmarkModal={openBookmarkModal}/>
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
             <CollectionCard key={collection.collectionId} collection={collection} onEditOpen={openEditModal} onDeleteSuccess={fetchCollections}/>
         ))}
    </div>

        {/* 컬렉션 추가 모달 */}
        <CollectionCreateModal isOpen={isModalOpen} onClose={closeModal} onCreateSuccess={fetchCollections} />
        {/* 컬렉션 수정 모달 */}
        <CollectionEditModal isOpen={isEditOpen} onClose={closeEditModal} collection={editCollection} onUpdateSuccess={fetchCollections}/>

        {/* 북마크 설정 모달 */}
        { isBookmarkModalOpen &&
        <BookmarkModal isOpen={isBookmarkModalOpen} onClose={closeBookmarkModal} />
        }
    </div>
  );
}
