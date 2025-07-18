import '../../styles/user/CollectionCard.css';
import api from '../../api/axiosInstance';
import { formatDateTime } from "../../utils/dateTimeUtils";

const CollectionCard = ({collection, onEditOpen, onDeleteSuccess}) => {

  const handleDelete = async () => {

    try {
      const response = await api.delete(`api/bookmark-collections/${collection.collectionId}`);
      onDeleteSuccess(); // 목록 화면 갱신
    } catch (error) {
      alert("컬렉션 삭제에 실패했습니다.");
    }
  };

  const onDelete = () => {
    const confirmed = window.confirm("삭제하시겠습니까?");
    if(confirmed){
      handleDelete(); //삭제
    }
  };

  return (
    <article className="collection-card">
      <div className="collection-card-image">
        <img 
          src="https://wimg.heraldcorp.com/news/cms/2025/01/23/news-p.v1.20250123.b3c0f983bcad430e8f458ecfd8daed55_P1.jpg" 
          alt="음식 이미지"
          className="collection-card-thumbnail" 
        />
      </div>
      <div className="collection-card-details">
        <h2 className="collection-card-title">{collection.collectionName}</h2>
        <time className="collection-card-date">{formatDateTime(collection.createdAt)}</time>
        <div className="collection-card-actions">
          <button className="collection-card-button edit-button" aria-label="Edit recipe" onClick={() => onEditOpen(collection)}>
            <img 
              src="https://c.animaapp.com/QU1MRUCT/img/frame.svg" 
              alt="Edit icon" 
              className="button-icon" 
            />
          </button>
          <button className="collection-card-button delete-button" aria-label="Delete recipe" onClick={onDelete}>
            <img 
              src="https://c.animaapp.com/QU1MRUCT/img/frame-1.svg" 
              alt="Delete icon" 
              className="button-icon" 
            />
          </button>
        </div>
      </div>
    </article>
  );
};

export default CollectionCard;
