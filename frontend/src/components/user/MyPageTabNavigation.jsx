import '../../styles/user/MyPageTabNavigation.css'

const MyPageTabNavigation = ({ activeTab, setActiveTab }) => {

  const handleTabClick = (tabKey) => {
    setActiveTab(tabKey)
  }

  return (
    <nav className="mypage-tab-navigation">
      <ul className="mypage-tab-list">
        <li
          className={`mypage-tab-item ${activeTab === 'posts' ? 'active' : ''}`}
          onClick={() => handleTabClick('posts')}
        >
          <span className="mypage-tab-link">게시물</span>
        </li>
        <li
          className={`mypage-tab-item ${activeTab === 'comments' ? 'active' : ''}`}
          onClick={() => handleTabClick('comments')}
        >
          <span className="mypage-tab-link">댓글</span>
        </li>
      </ul>
    </nav>
  )
}

export default MyPageTabNavigation