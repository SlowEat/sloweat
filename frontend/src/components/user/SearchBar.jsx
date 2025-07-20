import React, { useState } from 'react';
import axiosInstance from '../../api/axiosInstance';
import '../../styles/user/SearchBar.css';

function SearchBar({ onSearch }) {
  const [keyword, setKeyword] = useState('');
  const [sortOption, setSortOption] = useState('최신순');

  const handleSearch = async () => {
    if (!keyword.trim()) {
      alert('검색어를 입력해주세요!');
      return;
    }

    try {
      const sortParam = sortOption === '인기순' ? 'popular' : 'latest';

      const response = await axiosInstance.get('/api/recipes/search-keyword', {
        params: { keyword, sort: sortParam }
      });

      onSearch(response.data.data);
    } catch (error) {
      console.error('검색 실패:', error);
      alert('검색 중 오류가 발생했습니다.');
      onSearch([]);
    }
  };

  return (
    <div className="searchbar-container">
      <input
        type="text"
        className="search-input"
        placeholder="레시피 키워드를 입력하세요"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />

      <button className="search-button" onClick={handleSearch}>
        🔍 검색
      </button>

      <select
        className="select-box sort-select"
        value={sortOption}
        onChange={(e) => setSortOption(e.target.value)}
      >
        <option value="최신순">최신순</option>
        <option value="인기순">인기순</option>
      </select>
    </div>
  );
}

export default SearchBar;
