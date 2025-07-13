import React from 'react';
import '../../styles/user/SearchBar.css';

function SearchBar() {
  return (
    <main className="search-container" data-model-id="173:227-frame">
      <form className="search-form" role="search">
        <label htmlFor="search-input" className="visually-hidden">검색..</label>
        <input
          type="search"
          id="search-input"
          className="search-input"
          placeholder="검색 할 내용을 입력하세요"
          aria-label="검색 할 내용을 입력하세요"
        />
        <button type="submit" className="search-button" aria-label="검색">
          <img className="search-icon" src="https://c.animaapp.com/2V7rIzZS/img/--.svg" alt="검색 아이콘" />
        </button>
      </form>
    </main>
  );
}

export default SearchBar;