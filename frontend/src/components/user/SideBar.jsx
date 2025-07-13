import { Link, useLocation } from 'react-router-dom';
import '../../styles/user/SideBar.css';

const SideBar = () => {
  const location = useLocation();

  const menuItems = [
    { 
      id: 'home', 
      label: '홈', 
      path: '/', 
      activeIcon: 'https://c.animaapp.com/aL9hxRy0/img/frame.svg',
      inactiveIcon: 'https://c.animaapp.com/aL9hxRy0/img/frame.svg'
    },
    { 
      id: 'search', 
      label: '검색', 
      path: '/search', 
      activeIcon: 'https://c.animaapp.com/aL9hxRy0/img/frame-1.svg',
      inactiveIcon: 'https://c.animaapp.com/aL9hxRy0/img/frame-1.svg'
    },
    { 
      id: 'notifications', 
      label: '알림', 
      path: '/notifications',  //구현 X
      activeIcon: 'https://c.animaapp.com/aL9hxRy0/img/frame-2.svg',
      inactiveIcon: 'https://c.animaapp.com/aL9hxRy0/img/frame-2.svg'
    },
    { 
      id: 'bookmark', 
      label: '북마크', 
      path: '/bookmark', 
      activeIcon: 'https://c.animaapp.com/aL9hxRy0/img/frame-3.svg',
      inactiveIcon: 'https://c.animaapp.com/aL9hxRy0/img/frame-3.svg'
    },
    { 
      id: 'membership', 
      label: '멤버십', 
      path: '/membership', 
      activeIcon: 'https://c.animaapp.com/aL9hxRy0/img/frame-4.svg',
      inactiveIcon: 'https://c.animaapp.com/aL9hxRy0/img/frame-4.svg'
    },
    { 
      id: 'settings', 
      label: '설정', 
      path: '/settings', 
      activeIcon: 'https://c.animaapp.com/aL9hxRy0/img/frame-5.svg',
      inactiveIcon: 'https://c.animaapp.com/aL9hxRy0/img/frame-5.svg'
    },
  ];

const getActiveTab = () => {
  const path = location.pathname;
  const exactMatch = menuItems.find((item) => item.path === path);
  return exactMatch ? exactMatch.id : '';
};

  const activeTab = getActiveTab();

  return (
    <div className="sidebar-container">
      <nav className="sidebar-nav">
        <div className="menu-container">
          <ul className="menu-list">
            {menuItems.map((item) => (
              <li
                key={item.id}
                className={`menu-item ${activeTab === item.id ? 'active' : ''}`}
              >
                <Link to={item.path} className="menu-link">
                  <img
                    className="menu-icon"
                    src={activeTab === item.id ? item.activeIcon : item.inactiveIcon}
                    alt=""
                    style={{
                      filter: activeTab === item.id
                        ? 'invert(59%) sepia(75%) saturate(385%) hue-rotate(116deg) brightness(91%) contrast(91%)'
                        : 'none',
                    }}
                  />
                  <span className="menu-text">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="button-container">
          <Link to="/postform" className="create-post-button">
            <span className="button-text">게시글 작성</span>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default SideBar;