import "../../styles/user/TabNavigation.css";

const TabNavigation = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 0, label: "전체 피드" },
    { id: 1, label: "팔로잉" }
  ];

  return (
    <nav className="tab-navigation">
      <ul className="tab-list">
        {tabs.map((tab) => (
          <li
            key={tab.id}
            className={`tab-item ${activeTab === tab.id ? "active" : ""}`}
          >
            <button
              className="tab-button"
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default TabNavigation;
