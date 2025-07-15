import '../../styles/user/CollectionHeader.css';

export default function CollectionHeader({ count = 0 }) {
  return (
    <div className="collection-header">
      <section className="collection-stats">
        <img
          src="https://c.animaapp.com/uCLj7VDt/img/frame-1.svg"
          alt="Bookmark icon"
          className="bookmark-icon"
        />
        <p className="bookmark-count">
          <span className="count">{count}</span>
          <span>개의 북마크</span>
        </p>
      </section>

      <button type="button" className="add-collection-btn">
        <img
          src="https://c.animaapp.com/uCLj7VDt/img/frame.svg"
          alt="Add icon"
          className="add-icon"
        />
        <span className="btn-text">컬렉션 추가</span>
      </button>
    </div>
  );
}
