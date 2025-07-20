import React, {useState} from "react";
import "../../styles/bookmark/CollectionCreateModal.css";
import api from '../../api/axiosInstance';

const CollectionCreateModal = ({ isOpen, onClose, onCreateSuccess }) => {

    const [collectionName, setCollectionName] = useState("");

    // modal이 이미 열려 있으면 return
    if (!isOpen) return null;

    const handleCreate = async () => {
        if (!collectionName.trim()) {
            alert("컬렉션 이름을 입력하세요.");
            return;
        }

        try {
            const response = await api.post("api/bookmark-collections", {
                collectionName: collectionName.trim(),
            });
            onClose();
            setCollectionName("");
            onCreateSuccess();
        } catch (error) {
            alert("컬렉션 생성에 실패했습니다.");
        }
    };

    return (
        <div className="screen follow-modal-overlay">
            <div className="div">
                <div className="view-wrapper">
                    <div className="view-6">
                        <div className="overlap-8">
                            <button className="modal-close-x" onClick={onClose} aria-label="닫기">×</button>
                            <div className="text-wrapper-9">컬렉션 이름</div>
                            <div className="view-7">
                                <div className="overlap-group-5">
                                    <div className="text-wrapper-10" onClick={handleCreate}>만들기</div>
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

export default CollectionCreateModal;
