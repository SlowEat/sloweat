import React, { useEffect, useState } from "react";
import "./BookmarkModal.css";
import BookmarkNewCollectionModal from "./BookmarkNewCollectionModal";
import api from "../../api/axiosInstance";

const BookmarkModal = ({ isOpen, onClose, recipeId }) => {
  const [isCollectionModalOpen, setIsCollectionModalOpen] = useState(false);
  const openCollectionModal = () => setIsCollectionModalOpen(true);
  const closeCollectionModal = () => setIsCollectionModalOpen(false);

  const [selectedCollectionId, setSelectedCollectionId] = useState(null);
  const [collections, setCollections] = useState([]);

  const fetchCollections = async () => {
    try {
      const response = await api.get("api/bookmark-collections");
      setCollections(response.data);
    } catch (error) {
      console.error("북마크 컬렉션 불러오기 실패:", error);
    }
  };

  const handleSave = async () => {
    if (!selectedCollectionId) {
      alert("컬렉션을 선택하세요");
      return;
    }

    try {
      await api.post("/api/bookmarks", {
        recipeId: recipeId,
        collectionId: selectedCollectionId,
      });
      alert("북마크가 저장되었습니다."); //저장은 userId로 잘 됨
      onClose();
      window.location.reload();
    } catch (e) {
      console.error("북마크 저장 실패:", e);
      alert("저장에 실패했습니다.");
    }
  };

  useEffect(() => {
    fetchCollections();
  }, []);

  if (!isOpen) return null;

  return (
    <main className="bookmark-collection-modal-overlay">
      <section className="bookmark-collection-modal-view">
        <div className="bookmark-collection-modal-inner">
          <h1 className="bookmark-collection-modal-title">북마크 컬렉션에 저장</h1>

          <button
            className="bookmark-collection-modal-close-button"
            aria-label="닫기"
            onClick={onClose}
          >
            <img
              src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXgtaWNvbiBsdWNpZGUteCI+PHBhdGggZD0iTTE4IDYgNiAxOCIvPjxwYXRoIGQ9Im02IDYgMTIgMTIiLz48L3N2Zz4="
              alt="닫기버튼"
            />
          </button>

          <div className="bookmark-collection-modal-list">
            {collections.map((collection) => (
              <label
                key={collection.collectionId}
                className="bookmark-collection-modal-item"
              >
                <input
                  type="radio"
                  name="collection"
                  value={collection.collectionId}
                  checked={selectedCollectionId === collection.collectionId}
                  onChange={() => setSelectedCollectionId(collection.collectionId)}
                />
                <div className="bookmark-collection-modal-info">
                  <div className="bookmark-collection-modal-name">{collection.collectionName}</div>
                  <div className="bookmark-collection-modal-count">{collection.bookmarkCount}개 항목</div>
                </div>
              </label>
            ))}
          </div>

          <button
            className="bookmark-collection-modal-add-btn"
            onClick={openCollectionModal}
          >
            + 새 컬렉션 만들기
          </button>

          <div className="bookmark-collection-modal-btn-group">
            <button
              className="bookmark-collection-modal-cancel-btn"
              onClick={onClose}
            >
              취소
            </button>
            <button
              className="bookmark-collection-modal-save-btn"
              onClick={handleSave}
              disabled={!selectedCollectionId}
            >
              저장하기
            </button>
          </div>

          <BookmarkNewCollectionModal
            isOpen={isCollectionModalOpen}
            onClose={closeCollectionModal}
            onCreateSuccess={fetchCollections}
          />
        </div>
      </section>
    </main>
  );
};

export default BookmarkModal;
