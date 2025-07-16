import React, {useEffect, useState} from "react";
import "../../styles/bookmark/CollectionEditModal.css";
import api from '../../api/axiosInstance';

const CollectionEditModal = ({ isOpen, onClose, collection, onUpdateSuccess }) => {

  const [collectionName, setCollectionName] = useState(collection?collection.collectionName:'');

  useEffect(() => {
    setCollectionName(collection?.collectionName || '');
  }, [collection]);

  // modal이 이미 열려 있으면 return
  if (!isOpen) return null;

  const handleUpdate = async () => {
    if (!collectionName.trim()) {
      alert("컬렉션 이름을 입력하세요.");
      return;
    }

    try {
      const response = await api.put(`/api/bookmark-collections/${collection.collectionId}`, {
        collectionName: collectionName.trim(),
      });
      onClose();
      setCollectionName("");
      onUpdateSuccess(); // 목록 화면 갱신
    } catch (error) {
      alert("컬렉션 수정에 실패했습니다.");
    }
  };

  return (
      <div className="screen">
        <div className="div">
          <div className="view-wrapper">
            <div className="view-6">
              <div className="overlap-8">
                <button className="modal-close-x" onClick={onClose} aria-label="닫기">×</button>
                <div className="text-wrapper-9">컬렉션 이름</div>
                <div className="view-7">
                  <div className="overlap-group-5">
                    <div className="text-wrapper-10" onClick={handleUpdate}>수정하기</div>
                  </div>
                </div>
                <div className="view-9">
                  <div className="overlap-10">
                    <input
                        className="input-collection-name"
                        type="text"
                        maxLength={10}
                        placeholder="새 컬렉션 이름을 입력하세요"
                        value={collectionName}
                        onChange={(e) => setCollectionName(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default CollectionEditModal;
