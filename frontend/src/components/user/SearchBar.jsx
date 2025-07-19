import React, { useState } from 'react';
import axiosInstance from '../../api/axiosInstance';
import '../../styles/user/SearchBar.css';

function SearchBar({ onSearch }) {
  const [keyword, setKeyword] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!keyword.trim()) {
      alert('검색어를 입력해주세요!');
      return;
    }

    try {
      const response = await axiosInstance.get('/api/recipes/search-keyword', {
        params: { keyword }
      });
      onSearch(response.data.data); // ApiResponse에서 data 꺼내기
    } catch (error) {
      console.error('검색 실패:', error);
      alert('검색 중 오류가 발생했습니다.');
      onSearch([]);
    }
  };

  return (
    <main className="search-container">
      <form className="search-form" role="search" onSubmit={handleSearch}>
        <label htmlFor="search-input" className="visually-hidden">검색</label>
        <input
          type="search"
          id="search-input"
          className="search-input"
          placeholder="검색 할 내용을 입력하세요"
          aria-label="검색 할 내용을 입력하세요"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button type="submit" className="search-button" aria-label="검색">
          <img className="search-icon" src="https://c.animaapp.com/2V7rIzZS/img/--.svg" alt="검색 아이콘" />
        </button>
      </form>
    </main>
  );
}

export default SearchBar;
