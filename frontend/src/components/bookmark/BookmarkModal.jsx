import React, {useEffect, useState} from "react";
import "../../styles/user/BookmarkCollectionModal.css";
import "./BookmarkModal.css";
import BookmarkNewCollectionModal from "./BookmarkNewCollectionModal";
import api from "../../api/axiosInstance";
import {formatDateTime} from "../../utils/dateTimeUtils";


const BookmarkModal = ({isOpen, onClose, recipeId}) => {
  const [isCollectionModalOpen, setIsCollectionModalOpen] = useState(false);
  const closeCollectionModal = () => setIsCollectionModalOpen(false);
  const openCollectionModal = () => setIsCollectionModalOpen(true);

  const [selectedCollectionId, setSelectedCollectionId] = useState(null);

  //컬렉션 목록 데이터
  const [collections, setCollections] = useState([]);

  //컬렉션 목록 조회
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

  if (!isOpen) return null;

  //북마크 저장
  const handleSave = async () => {
    if (!selectedCollectionId) {
      alert("컬렉션을 선택하세요");
      return;
    }

    try {
      await api.post("/api/bookmarks", {
        recipeId: 1,
        collectionId: selectedCollectionId,
      });
      alert("북마크 저장 완료!");
      onClose();
    } catch (e) {
      console.error("북마크 저장 실패:", e);
      alert("저장에 실패했습니다.");
    }
  };


  return (
    <div className="screen">
      <div className="div">
        <div className="view">
          <div className="overlap">
            <div className="overlap-group">
              <div className="text-wrapper">북마크 컬렉션에 저장</div>
              {/* 북마크 아이콘 이모지 */}
              <span className="frame" role="img" aria-label="북마크" style={{ fontSize: 28, marginLeft: 12 }}>🔖</span>
            </div>
            <div className="overlap-group-wrapper">

            {collections.map((collection) => (
              <div className="overlap-group-2">
                <div className="rectangle" />
                <div className="overlap-2">
                  <div className="text-wrapper-2">{collection.collectionName}</div>
                  <div className="text-wrapper-3">{collection.bookmarkCount}개 항목</div>
                  {/*<div className="text-wrapper-3">12개 항목</div>*/}
                </div>
                <div className="rectangle-2">
                  <input type="radio"
                         name="collection"
                         value={collection.collectionId}
                         checked={selectedCollectionId === collection.collectionId}
                         onChange={() => setSelectedCollectionId(collection.collectionId)}
                  />
                </div>
              </div>
            ))}

            </div>
            <div className="view-2" onClick={openCollectionModal}>
              <div className="overlap-3" style={{ display: "flex", alignItems: "center" }}>
                {/* 새 컬렉션 아이콘 이모지 */}
                <div className="text-wrapper-4" >새 컬렉션 만들기</div>
              </div>
            </div>
            <div className="overlap-4">
              <div className="view-3" onClick={onClose}>
                <div className="overlap-5">
                  <div className="text-wrapper-5">취소</div>
                </div>
              </div>
              <div className="view-4" onClick={handleSave}>
                <div className="overlap-6">
                  <div className="text-wrapper-6">저장하기</div>
                </div>
              </div>
            </div>
            <BookmarkNewCollectionModal isOpen={isCollectionModalOpen} onClose={closeCollectionModal} onCreateSuccess={fetchCollections}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookmarkModal;
