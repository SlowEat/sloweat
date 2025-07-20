import React, { useState } from "react";
import "../../styles/bookmark/CollectionCreateModal.css";
import api from '../../api/axiosInstance';

const CollectionCreateModal = ({ isOpen, onClose, onCreateSuccess }) => {
  const [collectionName, setCollectionName] = useState("");

  if (!isOpen) return null;

  const handleCreate = async () => {
    if (!collectionName.trim()) {
      alert("컬렉션 이름을 입력하세요.");
      return;
    }

    try {
      await api.post("api/bookmark-collections", {
        collectionName: collectionName.trim(),
      });
      setCollectionName("");
      onClose();
      onCreateSuccess();
    } catch (error) {
      alert("컬렉션 생성에 실패했습니다.");
    }
  };

  return (
    <main className="collection-modal-overlay">
      <section className="collection-modal-view">
        <div className="collection-modal-inner">
          <h1 className="collection-modal-title">컬렉션 생성</h1>

          <button
            className="collection-modal-close-button"
            aria-label="닫기"
            onClick={onClose}
          >
            <img
              src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXgtaWNvbiBsdWNpZGUteCI+PHBhdGggZD0iTTE4IDYgNiAxOCIvPjxwYXRoIGQ9Im02IDYgMTIgMTIiLz48L3N2Zz4="
              alt="닫기버튼"
            />
          </button>

          <form onSubmit={(e) => { e.preventDefault(); handleCreate(); }}>
            <div className="collection-modal-section">
              <label htmlFor="collection-name" className="collection-modal-label">
                컬렉션 이름
              </label>
              <div className="collection-modal-input-wrapper">
                <input
                  type="text"
                  id="collection-name"
                  maxLength={10}
                  placeholder="새 컬렉션 이름을 입력하세요"
                  value={collectionName}
                  onChange={(e) => setCollectionName(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="collection-modal-button-group">
              <button
                type="button"
                className="collection-modal-cancel-button"
                onClick={onClose}
              >
                <span>취소</span>
              </button>
              <button
                type="submit"
                className="collection-modal-submit-button"
                disabled={!collectionName.trim()}
              >
                <span>만들기</span>
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
};

export default CollectionCreateModal;
