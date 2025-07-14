import '../../styles/user/CollectionCard.css';

const CollectionCard = () => {
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
        <h2 className="collection-card-title">맛있는 파스타 레시피</h2>
        <time className="collection-card-date" dateTime="2024-01-15">2024-01-15</time>
        <div className="collection-card-actions">
          <button className="collection-card-button edit-button" aria-label="Edit recipe">
            <img 
              src="https://c.animaapp.com/QU1MRUCT/img/frame.svg" 
              alt="Edit icon" 
              className="button-icon" 
            />
          </button>
          <button className="collection-card-button delete-button" aria-label="Delete recipe">
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
